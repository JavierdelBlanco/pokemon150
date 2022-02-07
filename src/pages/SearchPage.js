import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import { PokemonResult } from "../components/PokemonResult";
import { usePokemon } from "../context/pokemon";
import '../styles/SearchPage.css'

const SearchPage = () => {
    const {getPokemonForSearch, isPending} = usePokemon();
    const {word} = useParams();
    const [results,setResults] = useState(0);
    const searchPokemon = (word) => {
        let names = [];
        const list = getPokemonForSearch();
        names = list.filter((x) => x.name.includes(word) ||  x.name.toUpperCase().includes(word) || x.name.toLowerCase().includes(word));
        return names.length !== 0 ? names : 0;
        }

    React.useEffect( () => {
        if(!isPending){
            setResults(searchPokemon(word));
            console.log(results !== 0 ? results : 'No results were found matching the search word');
        }

    },[isPending, word]);

    
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