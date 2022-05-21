import React from 'react';
import { 
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from 'use-places-autocomplete';

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from '@reach/combobox';

import mapStyles from "./maptest/mapStyles"

const libraries: any = ["places"];
const mapContainerStyle = {
    width: '100vw',
    height: '50vh',
};


const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};

var center = {
    lat: 56.1304,
    lng: -106.3468
};

const Maptest = () => {

    // initialize the map from the google maps api
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        libraries,
    });

    //save the map instance to a variable
    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    // panning based on search
    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(10);

    }, []);

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";



    return (
        <div>
            <LocateBtn panTo={panTo}/>
            <GoogleMap 
                mapContainerStyle={mapContainerStyle} 
                zoom={3}
                center={center}
                options={options}
                onLoad={onMapLoad}
            ></GoogleMap>
            <Search panTo={panTo}/>
        </div>
    )
}

export default Maptest;

function LocateBtn ({panTo}) {
    return <button onClick={() => {
        navigator.geolocation.getCurrentPosition((position) => {
            panTo({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
            center = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            console.log(center);
        }, () => null);
    }}>Center</button>
}


function Search({ panTo }) {
    //returns variables in an object
    //value is the value of the input
    navigator.geolocation.getCurrentPosition((position) => {
        center.lat= position.coords.latitude,
        center.lng= position.coords.longitude});
    const {ready, 
        value, 
        suggestions: {status, data}, 
        setValue, 
        clearSuggestions } = usePlacesAutocomplete({
        requestOptions: {
            location: center,
            radius: 100 * 1000,
            types: ["pharmacy"],
        },
    });

    return (
    <Combobox onSelect={async (address) => { 
        //clear out the search suggestions
        setValue(address, false);
        clearSuggestions();

        //parse the results and
        try {
            const results = await getGeocode({ address });
            console.log(results[0].place_id);
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });

        } catch (error) {
            console.log("Error", error);
        }
    }}>
        <ComboboxInput value={value} onChange={(e) => {
            setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="enter an address"
        />
        <ComboboxPopover>
            <ComboboxList>
            {status === "OK" && data.map(({id, description}) => (
                <ComboboxOption key={id} value={description} />
            ))}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>);


}