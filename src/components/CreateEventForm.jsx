import { useNavigate } from "react-router-dom";
import axios from 'axios'
import React, { useState } from 'react'
import { buildBackendURL } from '../helpers/api';
import Location from "../components/Location";
import GeoapifyAutocomplete from "./GeoapifyAutocomplete";

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
      const response = await axios(config).catch(handleError);
      console.log(response)
      const event_id = response.data.id;
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
    const locationLon = value.lon;
    const locationLat = value.lat;
    setData({
      ...data,
      lon: locationLon,
      lat: locationLat
    })
  }

  return (
    <form onSubmit={handleSubmit} className='create-event_form'>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            id="eventname"
            name="eventname"
            label="Event Name"
            fullWidth
            variant="filled"
            onChange={handleNameChange}
          />
        </Grid>
        <Grid item xs={12}>
           <GeoapifyAutocomplete
            onSelect={onPlaceSelect}
            label="Event location"
            required />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type='submit' id='create-event_submit' >Create </Button>
        </Grid>
        <Grid item xs={12}>
          {isError ? (
            <div className="error">
              <p>Error. Please try again</p>
            </div>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </form>
  )
}

export default CreateEventForm
