import React from 'react';
// useNavigate Hook can be used to move from 'page' to 'page' -- uncomment the line 3 / 8
// import { useNavigate } from 'react-router-dom'

const Location = () => {

  // const navigate = useNavigate()

  return (
    <div>
      <form id="user-details">
        <div id="autocomplete-container">
          Where you're joining from:
        </div>
        <br/>
        <label htmlFor="participation-method">How you're joining:</label>
        <select name="participation-method" id="participation-method" form="user-details">
          <option value="online">Online</option>
          <option value="in-person">In-person</option>
        </select><br/>
        <label htmlFor="username">What's your name (optional):</label> 
        <input type="text" id="username" name="username" /><br/>
        <input type="button" value="Submit" name="submit" /> 
        {/* onClick="submitForm()" */}
          <br/>
          Set to hidden later on:
          Latitude: <input type="text" disabled autoComplete="off" id="latitude" name="latitude" value="NaN" /> <br/>
          Longitude: <input type="text" disabled autoComplete="off" id="longitude" name="longitude" value="NaN" /> <br/>
            Source: <input type="text" disabled autoComplete="off" id="lat-lon-source" name="lat-lon-source" value="address" /> 
      </form>
      <p id = "status"></p>
      <a id = "map-link" target="_blank"></a>
    </div>
  );
};

export default Location;
