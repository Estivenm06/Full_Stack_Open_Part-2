/* eslint-disable react/prop-types */
import {useState} from "react";
import OneCountry from "./OneCountry";

const Results = ({ country }) => {
    const [show, setShow] = useState(false)

    const handleShowClick = () => setShow(prev => !prev);

    return (
        <li>
            {country.name.common} <button onClick={handleShowClick}>show</button>
            {show && <OneCountry key={country.name.common} country={country}/>}
        </li>
    );
};

export default Results;