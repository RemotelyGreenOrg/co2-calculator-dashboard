import { NavLink } from "react-router-dom";
import JoinEventForm from "../components/JoinEventForm";
import CreateEventForm from "../components/CreateEventForm";

import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

function LandingPage(){
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
          <JoinEventForm/>
        </Paper>
      </Container>
    </>
  );
}


export default LandingPage;
