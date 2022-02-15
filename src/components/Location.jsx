import React, { useState } from 'react'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

const Location = ({
  placeSelect
}) => {

  return <div>
    <GeoapifyContext apiKey="333a59e70c194914af823f45328e4a49">
      <GeoapifyGeocoderAutocomplete placeholder="Enter address here"
        placeSelect={placeSelect}
        skipIcons={true}
        skipDetails={false}
      />
    </GeoapifyContext>
  </div>
}

export default Location