import axios from 'axios'
import React, { useState } from 'react'
import { buildBackendURL } from '../helpers/api';
import GeoapifyAutocomplete from "./GeoapifyAutocomplete";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';


const JoinEventForm = ({event_id, hide_event_id, on_join}) => {
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState({
    join_mode: 'in_person',
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
    console.log(`data = ${JSON.stringify(data)}`);
    const config = { method: 'post', url, data };
    try {
      const response = await axios(config).catch(handleError)
      setIsError(false)
      if (response.data){
        on_join(response.data);
      }else{
        console.log(`Participant created: ${response.data}`)
      }
    } catch(err) {
      console.log(err)
    }
  }

  // pass to autoComplete component (Location) - grabs lon & lat when location selected
  const onPlaceSelect = (value) => {
    const locationLon = value.lon;
    const locationLat = value.lat;
    console.log("Selected location:", value);
    setData({
      ...data,
      lon: locationLon,
      lat: locationLat
    })
  }
  console.log(data)

  return (
    <form onSubmit={handleSubmit}>
      <Grid container maxWidth="md" spacing={2} alignItems="center">
        <Grid item xs={3}>
          <Typography variant="body1">
            Join method*
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <ToggleButtonGroup
            color="primary"
            value={data.join_mode}
            fullWidth
            exclusive
            onChange={onFormChange}
          >
            <ToggleButton name="join_mode" value="in_person">In person</ToggleButton>
            <ToggleButton name="join_mode" value="online">Online</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        {hide_event_id || <Grid item xs={12}>
              <TextField required
                    id="event_id"
                    name="event_id"
                    label="Event ID"
                    variant="filled"
                    fullWidth
                    onChange={onFormChange}
              />
            </Grid>
        }
        <Grid item xs={12}>
        <label>
            <GeoapifyAutocomplete required label="Where are you joining from?" onSelect={onPlaceSelect}/>
        </label>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type='submit' id='create-event_submit' >Join </Button>
        </Grid>
          {isError ? (
            <div className="error">
              <p>Error. Please try again</p>
            </div>
          ) : (
            <></>
          )}
      </Grid>
    </form>
  )
}

export default JoinEventForm
