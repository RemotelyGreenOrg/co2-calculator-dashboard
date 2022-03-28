import {useState, useMemo, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash.throttle';
import {flag} from "country-emoji";

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GEOAPIFY_API_KEY = "333a59e70c194914af823f45328e4a49";


const get_address = throttle((lat, lon, callback) => {
        const promise = new Promise((resolve, reject) => {
          var url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&type=street&lang=en&limit=1&format=json&apiKey=${GEOAPIFY_API_KEY}`;

          fetch(url)
            .then(response => {
              // check if the call was successful
              if (response.ok) {
                response.json().then(data => resolve(data));
              } else {
                response.json().then(data => reject(data));
              }
            });
        });

        promise.then((data) => {
          callback(data.results[0]);
        }, (err) => {
          if (!err.canceled) {
            console.log(err);
          }
        });
     }, 200);


export default function GeoapifyAutocomplete({label, required, onSelect, noOptionsText, disableFindLocationButton}) {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  const query = useMemo(
   () =>
     throttle((request, callback) => {
        const promise = new Promise((resolve, reject) => {
          var url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(request)}&format=json&limit=5&apiKey=${GEOAPIFY_API_KEY}`;

          fetch(url)
            .then(response => {
              // check if the call was successful
              if (response.ok) {
                response.json().then(data => resolve(data));
              } else {
                response.json().then(data => reject(data));
              }
            });
        });

        promise.then((data) => {
          callback(data.results);
        }, (err) => {
          if (!err.canceled) {
            console.log(err);
          }
        });
     }, 200),
    [],
  );

  useEffect(() => {
    if (onSelect && value){
      onSelect(value);
    }
  }, [value]);

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    query(inputValue, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, query]);

  function grabBrowserLocation(){
      function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        get_address(latitude, longitude, (address) => {
          setValue(address);
          setInputValue(address.formatted);
        });
      }
      function error() {
        console.log('Unable to retrieve your location');
      }
      if(!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
      } else {
        console.log('Locating…');
        navigator.geolocation.getCurrentPosition(success, error);
      }
  }

  return (
    <Autocomplete
      id="geoapify-autocomplete"
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.formatted
      }
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params}
                   required={required}
                   label={label ?? "Add a location"}
                   variant="filled"
                   fullWidth />
      )}
     noOptionsText={
       <>
       {noOptionsText || "Enter something"}
       {disableFindLocationButton ||
           <>
           {" or  "}
         <Button
           onClick={grabBrowserLocation}
           variant="outlined"
           >
           Find my location
         </Button>
           </>
       }
       </>
     }
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                {option.country_code
                  ? <Typography variant="body1" pr={2}>{flag(option.country_code)}</Typography>
                  : <Box component={LocationOnIcon}
                      sx={{ color: 'text.secondary', mr: 2 }}
                      />
                }
              </Grid>
              <Grid item xs>
                <Typography variant="body1" color="text.secondary">
                  {option.formatted}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
