import React from 'react';

const Calculator = () => {
  return (
    <div>
       <section id="create-event">
       {/* style="display: none" */}
        <h1>Create Event</h1>
        <form>
          <div>
            <label htmlFor="event_name">Your event's name:</label>
            <input type="text" id="event_name" name="event_name" autoComplete="off" required />
          </div>
          <div>
            <label htmlFor="event_location">Your event's location:</label>
            <input type="text" id="event_location" name="event_location" autoComplete="off" required />
          </div>
          <p>
            <small>If there's a physical centre where people can travel to, enter this. If the event is fully online, enter your best guess at where you would have been if you'd have met physically.</small>
          </p>
          <button>Create event</button>
        </form>
      </section>

      <section id="create-event-confirmation">
      {/* style="display: none" */}
        <h1>Event created</h1>
        <input id="url" type="text" readOnly />
        <p>Copy this URL to share with others.</p>
        <button>Go to event</button>
      </section>

      <section id="join-event" >
      {/* style="display: none" */}
        <h1>Join event</h1>
          <button id="find-me">Find my location</button><br/>
        <form>
          <div>
            <label htmlFor="event_name">Your event's name:</label>
            <input type="text" id="event_name" name="event_name" autoComplete="off" required />
          </div>
          <div id="autocomplete-container">
            <label htmlFor="participant_location">Your location:</label>
          </div>
          <input type="hidden" autoComplete="off" id="latitude" name="latitude" value="NaN" />
          <input type="hidden" autoComplete="off" id="longitude" name="longitude" value="NaN" />
          <input type="hidden" autoComplete="off" id="lat-lon-source" name="lat-lon-source" value="address" /> 
          <button id="submit-join">Join event</button>
        </form>
      </section>

      <section id="dashboard">
      {/* style="display: none" */}
        <h1>Dashboard</h1>
        <dl>
          <dt>CO2 Emissions</dt>
          <dd id="co2"></dd>
          <dt>Number of participants</dt>
          <dd id="n-participants"></dd>
          <dt>Participant locations</dt>
          <dd id="participant-locations"></dd>
        </dl>
      </section>
    </div>
  )
};

export default Calculator;
