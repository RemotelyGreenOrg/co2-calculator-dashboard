import axios from 'axios'
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { buildBackendURL } from '../helpers/api';
import JoinEventForm from "../components/JoinEventForm";
import RawLiveFeed from "../components/results/RawLiveFeed";

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

async function get_event_details(event_id){
    const url = buildBackendURL(`/events/${event_id}`);
    const config = { method: 'get', url };
    try {
      const response = await axios(config).catch(()=>console.log(err));
      const data = response.data;
      console.log(response)
      return data;
    } catch(err) {
      console.log(err)
    }
}

function EventPage(){
  const { event_id } = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [hasJoined, setHasJoined] = useState();
  const [participant, setParticipant] = useState();
  const location = useLocation();

  function onJoin(participant){
    setParticipant(participant);
    setHasJoined(true);
  }

  useEffect(() => {
    get_event_details(event_id).then(details => setEventDetails(details));
  }, [event_id]);

  useEffect(() => {
    if (location?.state?.participant){
      onJoin(location.state.participant);
    }
  }, []);


  return (<>
          <Container component="main" sx={{ mb: 4 }}>
          {eventDetails && <>
            <Typography py={3} variant="h5">
            Realtime calculator for:
            <b> {eventDetails.name} </b>
            </Typography>
          </>}
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              {hasJoined ||
                <Box display="flex" justifyContent="center" >
                  <JoinEventForm
                    event_id={event_id}
                    hide_event_id={true}
                    on_join={onJoin}/>
                </Box>
              }
              {participant && <RawLiveFeed
                event_id={event_id}
                participant_id={participant.id}
              />}
            </Paper>
          </Container>
    </>)
}

export default EventPage;
