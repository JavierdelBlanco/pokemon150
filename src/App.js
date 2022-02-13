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
import { SearchPage } from './pages/SearchPage';
import { PokemonProvider } from "./context/pokemon";
import { ScrollToTop } from './components/ScrollToTop';
import './App.css'

const App = () => {

    return (
      <PokemonProvider>
      <BrowserRouter>
        <div className="App">
          <ScrollToTop/>
          <NavBar/>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/pokedex/pokemon' element={<PokemonPage/>}/>
            <Route path='/pokedex/pokemon/:id' element={<PokemonNPage/>}/>
            <Route path='/pokedex/moves' element={<MovesPage/>}/>
            <Route path='/pokedex/abilities' element={<AbilitiesPage/>}/>
            <Route path='/favorites' element={<FavoritesPage/>}/>
            <Route path='/search=:word' element={<SearchPage/>}/>
            <Route path='/*' element={<NotFoundPage/>}/>
          </Routes>
        </div>
      </BrowserRouter>
      </PokemonProvider>
  );
}
export default App;