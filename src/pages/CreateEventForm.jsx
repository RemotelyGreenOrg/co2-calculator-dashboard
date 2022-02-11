import axios from 'axios'
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom' -> uncomment for navigation between pages
import Location from "../components/Location";

const CreateEventForm = () => {

const [eventName, setEventName] = useState('')

// const [errorInfo, setErrorInfo] = useState({}) -> not sure if necessary at the moment.
const [isError, setIsError] = useState(false)

// const navigate = useNavigate() -> uncomment for navigation between pages

const handleError = (error) => {
  if(error.response) {
    // setErrorInfo(err.response.data) -> not sure if necessary at the moment.
    setIsError(true)
  }
}

const handleSubmit = async (event) => {
  event.preventDefault()
  const config = {
    method: 'get',
    url: (window.location.protocol === "https:" ? "https:" : "http:") + (window.location.hostname === "localhost" ? "//localhost:8000" : "//co2-calculator-api.herokuapp.com"),
    data: {
      name: eventName,
      lon: '52',
      lat: '0' // this needs to be JSON ? 
    }
  }

  try {
    const response = await axios(config).catch(handleError)
    console.log(response.data)
    setIsError(false)
    // navigate('/path/next-page-to-show') -> here we can navigate to the next page, upon successful creation of event. 
  } catch(err) {
    console.log(err)
  }
} 

const handleFormChange = (event) => {
  const textInput = event.target.value
  setEventName(textInput)
}
console.log(eventName)

  return (
    <section>
      <div className='create-event_form-container'>
        <h2>Create an Event</h2>
        <form onSubmit={handleSubmit} className='create-event_form'>
          <label>
            Event Name:
            <input
            name='event-name'
            type='text'
            placeholder='Your Event Name'
            onChange={handleFormChange}
          /> <br/>
          </label>
          <label>
            Event address:
            <Location />
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