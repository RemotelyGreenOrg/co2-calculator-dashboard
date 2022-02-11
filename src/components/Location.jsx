import React, { useState } from 'react'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

const Location = () => {

  const [position, setPosition] = useState();
  const [value, setValue] = useState('');

  // move this function into createEventForm & pass it as props to this component
  // use it to set position (lat lon) then you can use post request to create event. 
  function onPlaceSelect(value) {
    console.log(value);
      // setPosition -> lat lon 
      // setValue -> address (textInput)
  }

  return <div>
    <GeoapifyContext apiKey="00a9862ac01f454887fc285e220d8460">
      <GeoapifyGeocoderAutocomplete placeholder="Enter address here"
        value={value}
        position={position}
        placeSelect={onPlaceSelect}
        skipIcons={true}
        skipDetails={false}
      />
    </GeoapifyContext>
  </div>
}

export default Location