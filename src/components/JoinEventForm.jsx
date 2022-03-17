import axios from 'axios'
import React, { useState } from 'react'
import { buildBackendURL } from '../helpers/api';
import Location from "../components/Location";

const JoinEventForm = ({event_id, hide_event_id}) => {
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState({
    join_mode: '',
    lon: '',
    lat: '',
    active: false,
    event_id: event_id
  })

  const onFormChange = (event) => {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
  }

  const handleError = (error) => {
    if(error.response) {
      setIsError(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const url = buildBackendURL("/participants/");
    const config = { method: 'post', url, data };
    try {
      const response = await axios(config).catch(handleError)
      console.log(response)
      setIsError(false)
      // navigate('/path/next-page-to-show') -> here we can navigate to the next page, upon successful creation of event. 
    } catch(err) {
      console.log(err)
    }
  }

  // pass to autoComplete component (Location) - grabs lon & lat when location selected
  const onPlaceSelect = (value) => {
    const locationLon = value.properties.lon
    const locationLat = value.properties.lat
    console.log(value)
    setData({
      ...data,
      lon: locationLon,
      lat: locationLat
    })
  }
  console.log(data)

  return (
    <div> 
      <form onSubmit={handleSubmit}>
        <label>
          Join mode:
          <select name='join_mode' onChange={onFormChange}>
            <option selected value="in_person">In Person</option>
            <option value="online">Online</option>
          </select>
        </label><br/>
    {hide_event_id || <>
        <label>
          Event id:
          <input
          name='event_id'
          type='text'
          placeholder='0'
          onChange={onFormChange}
          />
        </label>
      <br/>
      </>
    }
        <label>
            Your current location:
            <Location placeSelect={onPlaceSelect}/>
        </label>
        <input type='submit' value='submit' id='create-event_submit' />
          {isError ? (
            <div className="error">
              <p>Error. Please try again</p>
            </div>
          ) : (
            <></>
          )}
      </form>
    </div>
  )
}

export default JoinEventForm
