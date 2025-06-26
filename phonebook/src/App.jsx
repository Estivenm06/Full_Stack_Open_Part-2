/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import PersonsShow from "./components/Persons";
import personService from "./services/personService";

const Persons = ({ person, deletePersonOf }) => {
  return (
    <>
      {person.map((element) => (
        <PersonsShow
          key={element.id}
          person={element}
          deletePerson={deletePersonOf}
        />
      ))}
    </>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const nameHandler = (e) => setName(e.target.value);
  const numberHandler = (e) => setNumber(e.target.value);
  const filterHandler = (e) => setFilter(e.target.value);
  const [alertState, setAlertState] = useState(null);

  const setAlert = (alert) => {
    setAlertState(alert);
    setTimeout(() => {
      setAlertState(null);
    }, 2500);
  };

  //GET
  useEffect(() => {
    personService
      .getAll()
      .then((reponse) => {
        setPersons(reponse);
      })
      .catch((error) => {
        console.log("rejected", error);
      });
  }, []);

  //POST AND PUT
  const addperson = (e) => {
    e.preventDefault();
    if (name.trim() === "" || number.trim() === "") {
      setAlert({ message: "Name or Number cannot be empty", type: "error" });
      return;
    }
    if (number.length <= 5) {
      setAlert({ message: "Number has to be greater than 5", type: "error" });
      return;
    }

    const newObject = {
      name,
      number,
      id: `${persons.length + 1}`,
    };

    const alreadyExists = persons.find((person) => person.name === name);

    const msg = `${name} is already added to phonebook, replace the old number with a new one?`;
    //PUT
    if (alreadyExists) {
      if (window.confirm(msg) === true) {
        personService
          .update(alreadyExists.id, { name, number })
          .then((response) => {
            setAlert({ message: `Updated ${response.name}`, type: "success" });

            // Update the state with the new person data
            setPersons((persons) =>
              // Replace the old person with the updated one
              persons.map((person) =>
                person.id === alreadyExists.id ? response : person
              )
            );

            setName("");
            setNumber("");
          });
      } else {
        //POST
        personService.create(newObject).then((response) => {
          setAlert({ message: `Added ${response.name}`, type: "success" });
          setPersons((persons) => persons.concat(response));
          setName("");
          setNumber("");
        });
      }
    } else {
      //POST
      //POST
      personService.create(newObject).then((response) => {
        setAlert({ message: `Added ${response.name}`, type: "success" });
        setPersons((persons) => persons.concat(response));
        setName("");
        setNumber("");
      });
    }
  };

  //DELETE
  const deletePersonOf = (id) => {
    const person = persons.find((e) => e.id === id);
    if (person) {
      setAlert({ message: `Deleting ${person.name}`, type: "success" });
      personService
        .httpDelete(id)
        .then(() => {
          setPersons((persons) => persons.filter((e) => e.id !== id));
        })
        .catch(() => {
          setAlert({
            message: `Information of ${person.name} has already been removed from server`,
            type: "error",
          });
        });
    } else {
      setAlert({ message: `Person not found`, type: "error" });
    }
  };

  const filterUpperCase = filter.toUpperCase();
  const personToShow =
    filter.length === 0
      ? persons
      : persons.filter((element) =>
          element.name.toUpperCase().includes(filterUpperCase)
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification alert={alertState} />
      <Filter filter={filter} filterHandler={filterHandler} />
      <PersonForm
        addperson={addperson}
        name={name}
        number={number}
        handlenameChange={nameHandler}
        handlenumberChange={numberHandler}
      />
      <h3>Numbers</h3>
      <Persons person={personToShow} deletePersonOf={deletePersonOf} />
    </div>
  );
};

export default App;
