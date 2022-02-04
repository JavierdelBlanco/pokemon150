import React from "react";
import { getPokemon } from '../api/pokemon';


const fetchPokemon = async(id) => {
    const data = await getPokemon(id);
    const pokemon = {
      id: data.id,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      card_sprite: data.sprites.versions["generation-v"]["black-white"].front_default, 
      sprites: data.sprites.versions["generation-v"]["black-white"], 
      height: data.height,
      weight: data.weight,
      types: data.types,
      abilities: data.abilities,
      moves: data.moves,
      stats: data.stats 
    };
    return pokemon;
        
}

const PokemonContext = React.createContext();

const PokemonProvider = (props) => {
    const [pokemonList,setPokemon] = React.useState([]);
    const [isPending, setIsPending] = React.useState(true);
    
    const loadPokemon = async() => {
      let list = [];
      for (let i=0;i < 151; i++){;
          let pokemon = await fetchPokemon(i + 1); 
          list.push(pokemon);
          setPokemon(list);
      }
      setIsPending(false);
    }
    
    React.useEffect(() => {
      loadPokemon();
    },[])

    function getPokemonData(id){

        return ({
          name: pokemonList[id - 1].name,
          sprite: pokemonList[id - 1].card_sprite,
          types: pokemonList[id - 1].types
        });
    }

    function getFullPokemon(id){
  
        return pokemonList[id - 1];
    }

    const value = { 
        isPending, 
        getPokemonData, 
        getFullPokemon,
       }
    

  return <PokemonContext.Provider value={value} {...props}/>
}

const usePokemon = () =>{
    return React.useContext(PokemonContext);
}


export {PokemonProvider , usePokemon}