import React from "react";
import { useNavigate } from "react-router-dom";
import { usePokemon } from "../context/pokemon";
import '../styles/PokemonResult.css'

const PokemonResult = ({id}) => {
    const [pokemon, setPokemon] = React.useState({
        name: '',
        sprite: '',
        types: []
    });

    const{ getPokemonData, isPending } = usePokemon();
    const navigate = useNavigate();

    React.useEffect( () => {
        if(!isPending){
            setPokemon(getPokemonData(id));
        };
    },[isPending, id]);
    
    return (
        <div className='result' onClick={() => {
            window.scrollTo(0,0);
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