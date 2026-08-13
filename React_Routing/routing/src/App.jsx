import {useParams} from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Link, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'


function App() {
  const [filmsList, setFilmsList] = useState([]);
  const [peopleList, setPeopleList] = useState([]);
  const [planetsList, setPlanetsList] = useState([]);
  const [speciesList, setSpeciesList] = useState([]);
  const [vehiclesList, setVehiclesList] = useState([]);
  const [starshipsList, setStarshipsList] = useState([]);
  const [currentID, setCurrentID] = useState('');
  const [currentChoice, setCurrentChoice] = useState('');

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    try {
      const response = await axios.get('https://swapi.info/api/');
      const { films, people, planets, species, vehicles, starships } = response.data;

      const [filmsRes, peopleRes, planetsRes, speciesRes, vehiclesRes, starshipsRes] = 
        await Promise.all([
          axios.get(films),
          axios.get(people),
          axios.get(planets),
          axios.get(species),
          axios.get(vehicles),
          axios.get(starships)
        ]);

      setFilmsList(filmsRes.data);
      setPeopleList(peopleRes.data);
      setPlanetsList(planetsRes.data);
      setSpeciesList(speciesRes.data);
      setVehiclesList(vehiclesRes.data);
      setStarshipsList(starshipsRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const handleID = (e) => {
    setCurrentID(e.target.value);
  };

  const handleOption = (e) => {
    setCurrentChoice(e.target.value);
  };

  const getDataByID = () => {
    const id = parseInt(currentID);
    switch(currentChoice) {
      case "films":
        return filmsList.results?.find(item => item.id === id);
      case "people":
        return peopleList.results?.find(item => item.id === id);
      case "species":
        return speciesList.results?.find(item => item.id === id);
      case "planets":
        return planetsList.results?.find(item => item.id === id);
      case "vehicles":
        return vehiclesList.results?.find(item => item.id === id);
      case "starships":
        return starshipsList.results?.find(item => item.id === id);
      default:
        return null;
    }
  };

  const FetchData = () => {
    const item = getDataByID();
    
    if (!item) {
      return <p style={{color: 'red'}}>No data found for ID: {currentID}</p>;
    }

    if(currentChoice === "films"){
      return(
        <div style={{border: '1px solid #ccc', padding: '10px', marginTop: '20px'}}>
          <h1>{item.title}</h1>
          <p><strong>Episode:</strong> {item.episode_id}</p>
          <p><strong>Release Date:</strong> {item.release_date}</p>
          <p><strong>Director:</strong> {item.director}</p>
          <p><strong>Opening Crawl:</strong> {item.opening_crawl}</p>
        </div>
      )
    }
    if(currentChoice === "people"){
      return(
        <div style={{border: '1px solid #ccc', padding: '10px', marginTop: '20px'}}>
          <h1>{item.name}</h1>
          <p><strong>Height:</strong> {item.height} cm</p>
          <p><strong>Mass:</strong> {item.mass} kg</p>
          <p><strong>Hair Color:</strong> {item.hair_color}</p>
          <p><strong>Skin Color:</strong> {item.skin_color}</p>
        </div>
      )
    }
    if(currentChoice === "species"){
      return(
        <div style={{border: '1px solid #ccc', padding: '10px', marginTop: '20px'}}>
          <h1>{item.name}</h1>
          <p><strong>Classification:</strong> {item.classification}</p>
          <p><strong>Language:</strong> {item.language}</p>
          <p><strong>Average Height:</strong> {item.average_height} cm</p>
          <p><strong>Average Lifespan:</strong> {item.average_lifespan} years</p>
        </div>
      )
    }
    if(currentChoice === "planets"){
      return(
        <div style={{border: '1px solid #ccc', padding: '10px', marginTop: '20px'}}>
          <h1>{item.name}</h1>
          <p><strong>Climate:</strong> {item.climate}</p>
          <p><strong>Terrain:</strong> {item.terrain}</p>
          <p><strong>Population:</strong> {item.population}</p>
          <p><strong>Gravity:</strong> {item.gravity}</p>
        </div>
      )
    }
    if(currentChoice === "vehicles"){
      return(
        <div style={{border: '1px solid #ccc', padding: '10px', marginTop: '20px'}}>
          <h1>{item.name}</h1>
          <p><strong>Model:</strong> {item.model}</p>
          <p><strong>Manufacturer:</strong> {item.manufacturer}</p>
          <p><strong>Vehicle Class:</strong> {item.vehicle_class}</p>
          <p><strong>Max Atmosphering Speed:</strong> {item.max_atmosphering_speed}</p>
        </div>
      )
    }
    if(currentChoice === "starships"){
      return(
        <div style={{border: '1px solid #ccc', padding: '10px', marginTop: '20px'}}>
          <h1>{item.name}</h1>
          <p><strong>Model:</strong> {item.model}</p>
          <p><strong>Manufacturer:</strong> {item.manufacturer}</p>
          <p><strong>Starship Class:</strong> {item.starship_class}</p>
          <p><strong>Max Speed:</strong> {item.max_atmosphering_speed} km/h</p>
        </div>
      )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // The FetchData component will render based on currentID and currentChoice
  };

  return (
    <>
    <div id="starwars">
      <h2>Search Star Wars Database</h2>
      <label>Category: </label>
      <select onChange={handleOption} value={currentChoice}>
        <option value="">-- Select --</option>
        <option value="films">Films</option>
        <option value="people">People</option>
        <option value="species">Species</option>
        <option value="planets">Planets</option>
        <option value="vehicles">Vehicles</option>
        <option value="starships">Starships</option>
      </select>
      
      <label style={{marginLeft: '20px'}}>ID: </label>
      <form onSubmit={handleSubmit} style={{display: 'inline'}}>
        <input
          type="number"
          value={currentID}
          required
          onChange={handleID}
          min="1"
          placeholder="Enter ID"/>
        <input type="submit" value="Search" style={{marginLeft: '10px'}}/>
      </form>
    </div>
    {currentChoice && currentID && <FetchData />}
    </>
  );
}

export default App
