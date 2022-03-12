import React from "react";
import { useParams } from "react-router-dom";
import { getPokemonNames } from "../api/pokemon";
import { Loading } from "../components/Loading";
import { PokemonResult } from "../components/PokemonResult";
import '../styles/SearchPage.css'

const SearchPage = () => {
    const {word} = useParams();
    const [pokemon,setPokemon] = React.useState([]);
    const [results,setResults] = React.useState(0);
    const [isPending,setIsPending] =  React.useState(true);

    const fixName = (x) => {
        let name = x.charAt(0).toUpperCase() + x.slice(1);
        let hyphen = name.indexOf('-');
        if(hyphen !== -1){
            name = name.slice(0, hyphen + 1) + name.charAt(hyphen + 1).toUpperCase() + name.slice(hyphen + 2)
        }
        name = name.replace('-',' ');
        return name;
    }

    const fetchPokemon = async() => {
        const data = await getPokemonNames();
        const list = data.map((x) => {
           return ({
               id:x.url.slice(34, x.url.length-1),
               name: fixName(x.name)
           })
        })
        setPokemon(list);
        setIsPending(false);
        return 0;  
    }

    const searchPokemon = (word) => {
        let names = [];
        names = pokemon.filter((x) => x.name.includes(word) ||  x.name.toUpperCase().includes(word) || x.name.toLowerCase().includes(word));
        return names.length !== 0 ? names : 0;
        }

    React.useEffect( () => {
            if(!isPending){
                setResults(searchPokemon(word));
            }
    },[isPending,word]);

    React.useEffect( () => {
            fetchPokemon();
    },[]);

    
    return isPending ? <Loading/> 
                     : <div className="search_container">
                            <h2 className="results_title">Results of "{word}"</h2>
                            <div className="result_container">
                                 {results !== 0 ? <ul>{results.map((x)=> <li> <PokemonResult id={x.id}/> </li>)}</ul>
                                                : <p>No results were found matching the search word</p>}
                            </div>
                           
                       </div>
                     
    
}

    

export {SearchPage}