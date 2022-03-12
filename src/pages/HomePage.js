import React from "react";
import '../styles/HomePage.css';
import pokemon_logo from '../img/pokemon.png';
import moves_logo from '../img/moves.png';
import abilities_logo from '../img/abilities.png';
import favorites_logo from '../img/favorites.png'; 
import { useNavigate } from "react-router-dom";

const HomePage = () => {

const navigate = useNavigate();

return (
    
    <main>
      <article>
        <h2>Pokemon 150</h2>
        <p>Welcome to the best pokemon encyclopedia!</p>
        <div className="buttons_container">
            <div className="button_container" onClick={() => navigate("/pokedex/pokemon/")}>
                 <div className="box">
                   <div className="img_container">
                      <img src={pokemon_logo}  width={50} alt="logo"/>
                    </div>
                    <p>Pokemon</p>
                </div>
            </div>
        <div className="button_container" onClick={() => navigate("/pokedex/moves/")}>
          <div className="box">
              <div className="img_container">
                  <img src={moves_logo}  width={50} alt="logo"/>
              </div>
              <p>Moves</p>
          </div>
        </div>
        <div className="button_container" onClick={() => navigate("/pokedex/abilities/")}>
            <div className="box">
                <div className="img_container">
                    <img src={abilities_logo}  width={50} alt="logo"/>
                </div>
                <p>Abilities</p>
            </div>
        </div>
        <div className="button_container" onClick={() => navigate("/favorites/")}>
            <div className="box">
                <div className="img_container">
                    <img src={favorites_logo}  width={50} alt="logo"/>
                </div>
                <p>Favorites</p>
            </div>
        </div>
        </div>
      </article>
    </main>
    )
}

export {HomePage}