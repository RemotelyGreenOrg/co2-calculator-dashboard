import axios from 'axios'
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom' -> uncomment for navigation between pages
import { buildBackendURL } from '../helpers/api';
import Location from "../components/Location";

const CreateEventForm = () => {

const [data, setData] = useState({
  name: '',
  lon: '',
  lat: ''
})

const [isError, setIsError] = useState(false)

// const navigate = useNavigate() -> uncomment for navigation between pages

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
    console.log(response)
    setIsError(false)
    // navigate('/path/next-page-to-show') -> here we can navigate to the next page, upon successful creation of event. 
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
    </section>
  )
}

export default CreateEventForm