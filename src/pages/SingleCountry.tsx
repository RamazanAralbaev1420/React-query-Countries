import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const SingleCountry = () => {
  const { cca3 } = useParams();
  // const [data, setData] = useState('');
  const navigate = useNavigate();

  const backPageHandler = () => {
    navigate('/');
  };

  const borderCountries = (border: string) => {
    navigate(`/${border}`);
  };

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['data', cca3],
    queryFn: () => {
      return axios
        .get(`https://restcountries.com/v3.1/alpha?codes=${cca3}`)
        .then((res) => res.data[0]);
    },
  });


  if(isLoading) {
    <h1>Loading...</h1>
  }

  if (data && isSuccess) {
    return (
      <div>
        <div className="container">
          <div className="btnBack">
            <Button onClick={backPageHandler}>back</Button>
          </div>

          <div className="singleCard">
            <div className="countryImage">
              <img src={data.flags.png} alt="" />
            </div>
            <div className="countryInfo">
              <div className="card_title">
                <h2>{data.name.common}</h2>
              </div>
              <div className="card-main-info">
                <div className="card-right-info">
                  <p>
                    <span>Название: </span>
                    {data.name.common}
                  </p>
                  <p>
                    <span>Население: </span>
                    {data.population}
                  </p>
                  <p>
                    <span>Регион: </span>
                    {data.region}
                  </p>
                  <p>
                    <span>Субрегиог: </span>
                    {data.subregion}
                  </p>
                  <p>
                    <span>Столица: </span>
                    {data.capital}
                  </p>
                </div>
                <div className="card-left-info">
                  <p>
                    <span>Домен вернего уровня: </span>
                    {}
                  </p>
                  <p>
                    <span>Валюты: </span>
                    {data.subregion}
                  </p>
                  <p>
                    <span>Языки: </span>
                  </p>
                </div>
              </div>
              <div className="border-countries">
                <h4>Пограничные страны: </h4>{' '}
                {data.borders ? (
                  data.borders.map((border: string) => (
                    <Button
                      variant="outlined"
                      sx={{ width: 50, height: 25 }}
                      key={Date.now() + Math.random()}
                      onClick={() => borderCountries(border)}
                    >
                      {border}
                    </Button>
                  ))
                ) : (
                  <h3>Нету пограничных стран</h3>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SingleCountry;
