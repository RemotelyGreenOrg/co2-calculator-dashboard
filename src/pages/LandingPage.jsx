import { NavLink } from "react-router-dom";
import JoinEventForm from "../components/JoinEventForm";
import CreateEventForm from "../components/CreateEventForm";

function LandingPage(){
  return (
    <>
    <CreateEventForm/>
    <br/>
    <h3> Or join an existing event </h3>
    <JoinEventForm/>
    </>
  );
}


export default LandingPage;
