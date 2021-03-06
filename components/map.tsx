import React from 'react';
import { 
    GoogleMap,
    useLoadScript,
    Marker,
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

import {
    addDoc,
    collection,
} from 'firebase/firestore';
import { db } from "../firebase-config";

import mapStyles from "../public/maptest/mapStyles"

const libraries: any = ["places"];
const mapContainerStyle = {
    width: '100vw',
    height: '50vh',
};


const options = {
    styles: mapStyles,
    disableDefaultUI: true,
};

var center = {
    lat: 56.1304,
    lng: -106.3468
};

const Map = ({handleSel}) => {

    //maps stuff=====================================================
    const [marker, setMarker] = React.useState({lat: null, lng: null});
    const [qRes, setQRes] = React.useState(null);
    // initialize the map from the google maps api
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        libraries,
    });

    //save the map instance to a variable
    const mapRef = React.useRef<any>();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    // panning coordinate input
    const panTo = React.useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(12);

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
            >
                <Marker position={{lat: marker.lat, lng: marker.lng}}/>
            </GoogleMap>
            <Search panTo={panTo} setMarker={setMarker} setQRes={setQRes} handleSel={handleSel}/>
        </div>
    )
}

export default Map;

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
            //place down a marker at the position
            

        }, () => null);
    }}>Center</button>
}


function Search({ panTo, setMarker, setQRes, handleSel }) {
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
            location: {lat: () => center.lat, lng: () => center.lng},
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
            setQRes(results[0]);
            const { lat, lng } = await getLatLng(results[0]);
            setMarker({lat: lat, lng: lng});
            panTo({ lat, lng });
            handleSel(results[0]);

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
                {/* @ts-ignore */}
            {status === "OK" && data.map(({id, description}) => (
                <ComboboxOption key={id} value={description} />
            ))}
            </ComboboxList>
        </ComboboxPopover>
    </Combobox>);


}