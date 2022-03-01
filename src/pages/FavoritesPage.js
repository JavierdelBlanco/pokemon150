import React from "react";
import { PokemonCard } from "../components/PokemonCard";
import { Loading } from "../components/Loading";
import '../styles/FavoritesPage.css';


const FavoritesPage  = () => {

const [pokemonCards,setPokemonCards] = React.useState([]);
const [load,setLoad] = React.useState(null);
const [isPending, setIsPending] = React.useState(true);

const loadPokemon = () => {
    let x = [];
    let favorites = localStorage.getItem("Favorites");
    favorites = favorites !== null ? JSON.parse(favorites) : []; 
    for (let i = 0; i < favorites.length; i++){
        x[i] = <PokemonCard key={favorites[i]} id={favorites[i]}/>
    }
    setPokemonCards(x);
    setIsPending(false);
}

React.useEffect(() => {
  setLoad(false);
  loadPokemon();
}, [load]);


return  <main>
            <article className="text">
                <h2>Favorites</h2>
                <p>Your favorites pokemon are shown below.</p>    
            </article>     

            {isPending ? <Loading/>
                       : <div className='favorites_container' onClick={()=> setLoad(true)}>
                            {pokemonCards.length !== 0 ? pokemonCards : <p className="not_found_text">No pokemon found. To add pokemon to favorites press the heart button on the cards.</p>}
                         </div> } 
        </main>   
}

export {FavoritesPage}