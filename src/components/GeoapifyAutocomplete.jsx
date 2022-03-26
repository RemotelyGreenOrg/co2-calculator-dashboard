import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash.throttle';

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
const GEOAPIFY_API_KEY = "333a59e70c194914af823f45328e4a49";


function addFeatureIcon(element, type, countryCode) {
  const iconMap = {
      'unknown': 'map-marker',
      'amenity': 'map-marker',
      'building': 'map-marker',
      'street': 'road',
      'suburb': 'city',
      'district': 'city',
      'postcode': 'city',
      'city': 'city',
      'county': 'city',
      'state': 'city'
  };
  const countryData = countries_json_1.default.find(county => countryCode && county.code.toLowerCase() === countryCode.toLowerCase());
  if ((type === 'country') && countryData) {
      element.classList.add("emoji");
      ;
      const emojiElement = document.createElement('span');
      emojiElement.innerText = countryData.emoji;
      element.appendChild(emojiElement);
  }
  else if (iconMap[type]) {
      this.addIcon(element, iconMap[type]);
  }
  else {
      this.addIcon(element, 'map-marker');
  }
}

export default function GeoapifyAutocomplete({label, required}) {
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState([]);

  const query = React.useMemo(
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

  React.useEffect(() => {
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

  return (
    <Autocomplete
      id="geoapify-autocomplete"
      //sx={{ width: 300 }}
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
                   fullWidth />
      )}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <Grid container alignItems="center">
              <Grid item>
                <Box
                  component={LocationOnIcon}
                  sx={{ color: 'text.secondary', mr: 2 }}
                />
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
