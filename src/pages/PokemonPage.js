import React, { useState } from "react";
import { Pagination } from "react-bootstrap";
import { PokemonCard } from "../components/PokemonCard";
import { usePokemon } from "../context/pokemon";
import { Loading } from "../components/Loading";
import '../styles/PokemonPage.css';


const PokemonPage = () => {

const [pokemonCards,setPokemonCards] = React.useState([]);
const [page,setPage] = React.useState(1);

const{isPending} = usePokemon();

const cargarPokemon = () => { 
    let x = [];
    let first = (page - 1) * 30 + 1;
    let quantity =  (page === 6) ? 1 : 30;
    for (let i = 0; i < quantity; i++){
        x[i] = <PokemonCard key={first + i} id={first + i} />
    }
    setPokemonCards(x);
}

React.useEffect( () => {
  cargarPokemon();
}, [page]);


return  <main>
            <article className="text">
                <h2>Pokemon</h2>
                <p>A list of the original 151 Pokémon is shown below.</p>
                <Pagination className="pagination-custom">
                    <Pagination.First disabled={1 === page} onClick={() => setPage(1)}/>
                    <Pagination.Prev  disabled={1 === page} onClick={() => setPage((page === 1) ? 1 : (page - 1))}/>
                    <Pagination.Item key={1}  active={1 === page} onClick={() => setPage(1)}>1</Pagination.Item>
                    <Pagination.Item key={2}  active={2 === page} onClick={() => setPage(2)}>2</Pagination.Item>
                    <Pagination.Item key={3}  active={3 === page} onClick={() => setPage(3)}>3</Pagination.Item>
                    <Pagination.Item key={4}  active={4 === page} onClick={() => setPage(4)}>4</Pagination.Item>
                    <Pagination.Item key={5}  active={5 === page} onClick={() => setPage(5)}>5</Pagination.Item>
                    <Pagination.Item key={6}  active={6 === page} onClick={() => setPage(6)}>6</Pagination.Item>
                    <Pagination.Next  disabled={6 === page} onClick={() => setPage((page === 6) ? 6 : (page + 1))}/>
                    <Pagination.Last  disabled={6 === page} className="pageButton" onClick={() => setPage(6)}/>
                </Pagination>     
            </article>     

            {isPending ? <Loading/>
                       : <div className='pokemon_container'>
                            {pokemonCards}
                         </div> } 
        </main>   
}

export {PokemonPage}