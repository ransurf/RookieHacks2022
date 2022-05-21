import React from 'react';
import { 
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';

import mapStyles from "./maptest/mapStyles"

const libraries = ["places"];
const mapContainerStyle = {
    width: '100vw',
    height: '50vh',
};

const center = {
    lat: 49.282730,
    lng: -123.120735,
};
const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
};


const Maptest = () => {
    // initialize the map from the google maps api
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        libraries,
    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";


    return (
        <div>
            maptest
            <GoogleMap 
                mapContainerStyle={mapContainerStyle} 
                zoom={8}
                center={center}
                options={options}
            ></GoogleMap>
        </div>
    )
}

export default Maptest;