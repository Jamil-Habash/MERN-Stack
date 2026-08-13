import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import PersonCard from './components/component'
import Counter from './components/component'
import PersonAgeCard from './components/component'
import UserForm from './components/form'
import MessageForm from './components/messageForm'
import MessageDisplay from './components/messageDisplay'
import BoxForm from './components/box'
import BoxDisplay from './components/box_generator'
import Tabs from './components/Tabs'
import axios from 'axios'

function App() {
  const [pokemonList, setPokemonList] = useState([]);

  const handleFetch = () => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=807')
      .then(response => {
        const names = response.data.results.map(pokemon => pokemon.name);
        setPokemonList(names);
        console.log(names);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <>
      <button onClick={handleFetch}>Fetch Pokemon</button>
      <ul>
        {pokemonList.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
