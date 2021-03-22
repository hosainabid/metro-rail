import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: "100%",
  height: '500px'
};

const position = {
  lat: 23.810331,
  lng: 90.412521
};

const onLoad = marker => {
  console.log('marker: ', marker)
}

function Map() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAukDOZt2GElPafIjLMdMJ5f_id5AfUwx8"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        zoom={10}
      >
        <Marker
          onLoad={onLoad}
          position={position}
        />
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)