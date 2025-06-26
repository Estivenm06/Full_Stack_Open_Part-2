/* EXERCISES 2.18 - 2.20 */
import { useState, useEffect } from 'react';
import axios from "axios"

import Choice from "./Components/Choice"

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
      axios
        .get(process.env.apiHelsinki)
        .then(({data}) => setCountries(data) )
  }, [])
  if(countries.length < 0){
    return <div>Loading...</div>
  }
  const handleFilterChange = e => setFilter(e.target.value);

  return (
    <div>
      <form>
        find countries: <input value={filter} onChange={handleFilterChange} />
      </form>
      <Choice key={countries.id} result={countries} country={filter} />
    </div>
  );
};

export default App;