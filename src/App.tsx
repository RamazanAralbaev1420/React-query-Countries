import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Header from './components/Header';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, Input } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ICountries } from './types/types';
import { Link } from 'react-router-dom';


const App = () => {
  const [searchText, setSearchHandle] = React.useState('');
  const [val, setVal] = React.useState('All');
  const handleChange = (event: SelectChangeEvent) => {
    setVal(event.target.value as string);
  };




  
  const { data, isError, isLoading } = useQuery({
    queryKey: ['countries', val],
    queryFn: () => {
      return axios
        .get(
          `https://restcountries.com/v3.1/${
            val === 'All' ? 'all' : `region/${val}`
          }`
        )
        .then((res) => res.data);
    },
  });


  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Error date</h1>;
  }

  return (
    <div>
      <Header />
      <div className="container">
        <div className="navbar">
          <Input
            type="text"
            value={searchText}
            placeholder="Search"
            onChange={(e) => setSearchHandle(e.target.value)}
          />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">reg</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={val}
                label="All"
                onChange={(e) => setVal(e.target.value)}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="America">America</MenuItem>
                <MenuItem value="Asia">Asia</MenuItem>
                <MenuItem value="Africa">Africa</MenuItem>
                <MenuItem value="Asia">Asia</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div className="countries">
          {data &&
            data
              .filter((country: string) =>
                country.name.common
                  .toLowerCase()
                  .includes(searchText.toLowerCase())
              )
              .map((country: ICountries) => {
                return (
                  <Card sx={{ width: 280 }} key={country.cca3}>
                    <Link to={country.cca3}>
                      <CardActionArea>
                        <div className="cardImage">
                          <img src={country.flags.png} alt="" />
                        </div>
                        <CardContent>
                          <Typography>
                            <h3>{country.name.common}</h3>
                          </Typography>

                          <Typography>
                            <div className="countryInfo">
                              <p>
                                Capital:<span>{country.capital}</span>
                              </p>
                              <p>
                                Population: <span>{country.population}</span>
                              </p>
                              <p>
                                Region: <span>{country.region}</span>
                              </p>
                            </div>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                  </Card>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default App;
