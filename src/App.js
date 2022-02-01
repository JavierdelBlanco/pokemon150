import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from './components/NavBar';
import { AbilitiesPage } from './pages/AbilitiesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { HomePage } from './pages/HomePage';
import { MovesPage } from './pages/MovesPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PokemonPage } from './pages/PokemonPage';
import { PokemonNPage } from './pages/PokemonNPage';
import './App.css'
import { getPokemon } from './api/pokemon';

const reducer  = (pokemon, action) => {
    if (action.type === 'load') {
          const fetchPokemon = async() => {
            const data = await getPokemon(action.paidload);
            pokemon.push({
                id: data.id,
                name: data.name.charAt(0).toUpperCase() + data.name.slice(1), 
                sprites: data.sprites.versions["generation-v"]["black-white"], 
                height: data.height,
                weight: data.weight,
                types: data.types,
                abilities: data.abilities,
                moves: data.moves,
                stats: data.stats
            });
          }
          fetchPokemon();
    }
  return pokemon;
}

const App = () => {
    
    const [pokemon,setPokemon] = React.useReducer(reducer,[]);

    React.useEffect( () => {

      const loadPokemon = () => {
        for (let i=0;i < 151; i++){
          setPokemon({type: 'load', paidload: i + 1});
        }
        console.log(pokemon);
      }

      loadPokemon();

    },[])

    return (
      <BrowserRouter>
        <div className="App">
          <NavBar/>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/pokedex/pokemon' element={<PokemonPage/>}/>
            <Route path='/pokedex/pokemon/:id' element={<PokemonNPage/>}/>
            <Route path='/pokedex/moves' element={<MovesPage/>}/>
            <Route path='/pokedex/abilities' element={<AbilitiesPage/>}/>
            <Route path='/favorites' element={<FavoritesPage/>}/>
            <Route path='/*' element={<NotFoundPage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
  );
}
export default App;