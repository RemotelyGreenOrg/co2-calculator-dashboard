import { useParams } from "react-router-dom";
import JoinEventForm from "../components/JoinEventForm";

// 1. Connect to event websocket
// 2. Show "Join event" form

function EventPage(params){
  const { event_id } = useParams();
  return (<>
    Event is {event_id}
    <JoinEventForm event_id={event_id} hide_event_id={true}/>
    </>)
}

export default EventPage;
