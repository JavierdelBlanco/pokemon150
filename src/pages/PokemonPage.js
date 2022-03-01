import React from "react";
import { Pagination } from "react-bootstrap";
import { PokemonCard } from "../components/PokemonCard";
import { Loading } from "../components/Loading";
import '../styles/PokemonPage.css';


const PokemonPage = () => {

const [pokemonCards,setPokemonCards] = React.useState([]);
const [page,setPage] = React.useState(1);
const [pagination,setPagination] = React.useState(1);
const [isPending, setIsPending] = React.useState(true);

const loadPokemon = () => { 
    let cards = [];
    let first = (page - 1) * 30 + 1;
    let quantity =  (page === 30) ? 28 : 30;
    for (let i = 0; i < quantity; i++){
        cards[i] = <PokemonCard key={first + i} id={first + i} />
    }
    setPokemonCards(cards);
    setIsPending(false);
}

React.useEffect( () => {
  loadPokemon();
}, [page]);


return  <main>
            <article className="text">
                <h2>Pokemon</h2>
                <p>A list of all Pokémon until 8th genetation.</p>
                <Pagination className="pagination-custom">
                    <Pagination.First  disabled={1 === page} className="pageButton" onClick={() => setPagination(pagination !== 1 ? (pagination - 1) : 1)}/>
                    <Pagination.Prev disabled={1 === page} onClick={() => {
                                                                            if((((pagination - 1 )* 6) + 1) === page){
                                                                              setPagination(pagination !== 1 ? (pagination - 1) : 1);
                                                                            }
                                                                            setPage(page !== 1 ? page - 1 : 1);
                                                                            }}/>
                    <Pagination.Item key={1}  active={((pagination - 1 )* 6) + 1 === page} onClick={() => setPage(((pagination - 1 )* 6) + 1)}>{((pagination - 1 )* 6) + 1}</Pagination.Item>
                    <Pagination.Item key={2}  active={((pagination - 1 )* 6) + 2 === page} onClick={() => setPage(((pagination - 1 )* 6) + 2)}>{((pagination - 1 )* 6) + 2}</Pagination.Item>
                    <Pagination.Item key={3}  active={((pagination - 1 )* 6) + 3 === page} onClick={() => setPage(((pagination - 1 )* 6) + 3)}>{((pagination - 1 )* 6) + 3}</Pagination.Item>
                    <Pagination.Item key={4}  active={((pagination - 1 )* 6) + 4 === page} onClick={() => setPage(((pagination - 1 )* 6) + 4)}>{((pagination - 1 )* 6) + 4}</Pagination.Item>
                    <Pagination.Item key={5}  active={((pagination - 1 )* 6) + 5 === page} onClick={() => setPage(((pagination - 1 )* 6) + 5)}>{((pagination - 1 )* 6) + 5}</Pagination.Item>
                    <Pagination.Item key={5}  active={((pagination - 1 )* 6) + 6 === page} onClick={() => setPage(((pagination - 1 )* 6) + 6)}>{((pagination - 1 )* 6) + 6}</Pagination.Item>
                    <Pagination.Next  disabled={30 === page} onClick={() => {
                                                                            if((((pagination - 1 )* 6) + 6) === page){
                                                                              setPagination(pagination !== 5 ? (pagination + 1) : 5);
                                                                            }
                                                                            setPage(page !== 30 ? page + 1 : 30)
                                                                            }}/>
                    <Pagination.Last  disabled={30 === page} className="pageButton" onClick={() => setPagination(pagination !== 5 ? (pagination + 1) : 5)}/>
                </Pagination>         
            </article>     

            {isPending ? <Loading/>
                       : <div className='pokemon_container'>
                            {pokemonCards}
                         </div> } 
        </main>   
}

export {PokemonPage}