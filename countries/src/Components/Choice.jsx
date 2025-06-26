import OneCountry from "./OneCountry";
import Results from "./Results.jsx";

const Choice = ({ country, result }) => {
  let filtered = [];
  if (country.length > 0) {
    filtered = result.filter(({ name }) =>
      name.common.toLowerCase().includes(country.toLowerCase())
    );
  } else {
    filtered = result;
  }

  if (filtered.length > 10) {
    return "Too many matches, specify the name of the country.";
  } else if (filtered.length === 1) {
    return filtered.map((country) => <OneCountry key={country.name.common} country={country} />);
  } else {
    return filtered.map((country) => <Results key={country.name.common} country={country} />);
  }
};

export default Choice;
