/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

const OneCountry = ({ country }) => {
  const keys = Object.keys(country.languages);
  const [weatherCountry, setWeatherCountry] = useState(null);

  useEffect(() => {
    const keyAPI = process.env.keyAPI;
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${keyAPI}&q=${country.name.common}&aqi=no`
      )
      .then(({ data }) => {
        setWeatherCountry(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [country.name.common]);

  if (weatherCountry === null) {
    return <>Loading...</>;
  }

  return (
    <div>
      <h1>{country.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <div>
        <h2>Languages:</h2>
        <ul>
          {keys.map((keys, id) => (
            <li key={id}>{country.languages[keys]}</li>
          ))}
        </ul>
      </div>
      <img src={country.flags.png} alt="flag" width="300px" height="200px" />
      <div>
        <h3>Weather in {country.capital[0]}</h3>
        <p>temperature: {weatherCountry.current.temp_c} Celcius</p>
        <img src={weatherCountry.current.condition.icon} alt="weather" />
        <p>wind: {weatherCountry.current.gust_mph} mph</p>
      </div>
    </div>
  );
};

export default OneCountry;
