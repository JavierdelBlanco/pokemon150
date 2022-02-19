import React from "react";
import { getPokemon } from '../api/pokemon';


const fixName = (x) => {
        let name = x.charAt(0).toUpperCase() + x.slice(1);
        let hyphen = name.indexOf('-');
        if(hyphen !== -1){
            name = name.slice(0, hyphen + 1) + name.charAt(hyphen + 1).toUpperCase() + name.slice(hyphen + 2)
        }
        name = name.replace('-',' ');
        return name;
}

const fetchPokemon = async(id) => {
    const data = await getPokemon(id);
    const pokemon = {
      id: data.id,
      name: fixName(data.name),
      card_sprite: data.sprites.front_default, 
      sprites: data.sprites, 
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

    function getPokemonForSearch(){
      const pokemonNames = pokemonList.map( (x) => ({id: x.id, name: x.name}))
      return pokemonNames;
    }

    const value = { 
        isPending, 
        getPokemonData, 
        getFullPokemon,
        getPokemonForSearch,
       }
    

  return <PokemonContext.Provider value={value} {...props}/>
}

const usePokemon = () =>{
    return React.useContext(PokemonContext);
}


export {PokemonProvider , usePokemon}