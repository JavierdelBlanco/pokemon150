import React from "react";
import { useNavigate } from "react-router-dom";
import { getPokemon } from "../api/pokemon";
import { Loading } from "./Loading";
import '../styles/PokemonResult.css'

const PokemonResult = ({id}) => {

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
        setPokemon({
            id: data.id,
            name: fixName(data.name),
            sprite: data.sprites.front_default, 
            types: data.types
        })
        setIsPending(false);
        return 0;  
    }

    const [pokemon, setPokemon] = React.useState({
        id: 0,
        name: '',
        sprite: '',
        types: []
    });
    const [isPending,setIsPending] = React.useState(true);
    const navigate = useNavigate();

    React.useEffect( () => {
        
    },[isPending,id]);

    React.useEffect( () => {
        fetchPokemon(id);
    },[id]);
    
    return (
        isPending ? <Loading/> 
                     :<div className='result' onClick={() => {
            navigate(`/pokedex/pokemon/${id}`)
        }}>
            <div  className='resultImageContainer'>
                <img  className='resultImage' src={pokemon.sprite}/>
            </div>
            <div className='resultBody'>
                <p>{pokemon.name} {'#' + id}</p>
            </div>
        </div>
    )
}

export {PokemonResult}