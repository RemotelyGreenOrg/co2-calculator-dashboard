import axios from 'axios'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { buildBackendURL } from '../helpers/api';
import JoinEventForm from "../components/JoinEventForm";
import RawLiveFeed from "../components/results/RawLiveFeed";

// 1. Connect to event websocket
// 2. Show "Join event" form

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

function EventPage(params){
  const { event_id } = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [hasJoined, setHasJoined] = useState(false);
  const [participant, setParticipant] = useState();

  function onJoin(participant){
    setParticipant(participant);
    setHasJoined(true);
  }

  useEffect(() => {
    get_event_details(event_id).then(details => setEventDetails(details));
  }, [event_id]);

  return (<>
          {eventDetails && <>
            Event name is {eventDetails.name} taking place at lat: {eventDetails.lat}, lon: {eventDetails.lon}<br/>
          </>}
          {hasJoined ||
            <JoinEventForm 
              event_id={event_id} 
              hide_event_id={true}
              on_join={onJoin}/>
          }
          {participant && <RawLiveFeed
            event_id={event_id}
            participant_id={participant.id}
          />}
    </>)
}

export default EventPage;
