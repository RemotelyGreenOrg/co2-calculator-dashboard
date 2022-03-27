import { useNavigate } from "react-router-dom";
import JoinEventForm from "../components/JoinEventForm";
import CreateEventForm from "../components/CreateEventForm";
import { buildBackendURL } from '../helpers/api';

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function LandingPage(){
  const navigate = useNavigate();

  function onJoin(participant){
      const event_id = participant.event_id;
      navigate(`/event/${event_id}`, {state: {participant: participant}})
  }

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Typography component="h1" variant="h3" align="center">
            Realtime event calculator
          </Typography>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography pb={2} variant="h5">Create an Event</Typography>
          <CreateEventForm/>
          <Typography pb={2} variant="h5">Join an Existing Event</Typography>
          <JoinEventForm on_join={onJoin}/>
        </Paper>
      </Container>
    </>
  );
}


export default LandingPage;
