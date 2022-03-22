import { useNavigate } from "react-router-dom";
import axios from 'axios'
import React, { useState } from 'react'
import { buildBackendURL } from '../helpers/api';
import Location from "../components/Location";

const CreateEventForm = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: '',
    lon: '',
    lat: ''
  })

  const [isError, setIsError] = useState(false)

  const handleError = (error) => {
    if(error.response) {
      setIsError(true)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const url = buildBackendURL("/events/");
    const config = { method: 'post', url, data };
    try {
      const response = await axios(config).catch(handleError)
      const event_id = response.data.id;
      console.log(response)
      setIsError(false)
      navigate(`/event/${event_id}`)
    } catch(err) {
      console.log(err)
    }
  } 

  // stores name of event in stateful object
  const handleNameChange = (event) => {
    const textInput = event.target.value
      setData({
        ...data,
        name: textInput
      })
    }

  // pass to autoComplete component (Location) - grabs lon & lat when location selected
  const onPlaceSelect = (value) => {
    const locationLon = value.properties.lon
    const locationLat = value.properties.lat
    setData({
      ...data,
      lon: locationLon,
      lat: locationLat
    })
  }

  return (
    <section>
      <div className='create-event_form-container'>
        <h2>Create an Event</h2>
        <form onSubmit={handleSubmit} className='create-event_form'>
          <label>
            Event Name:
            <input
            name='name'
            type='text'
            placeholder='Your Event Name'
            onChange={handleNameChange}
          /> <br/>
          </label>
          <label>
            Event address:
            <Location placeSelect={onPlaceSelect}/>
          </label>
          <input type='submit' value='Create' id='create-event_submit' />
          {isError ? (
            <div className="error">
              <p>Error. Please try again</p>
            </div>
          ) : (
            <></>
          )}
        </form>
      </div>
    </section>
  )
}

export default CreateEventForm
