import React, { useState } from "react";
import { Card, ListGroup, Tab, Tabs } from "react-bootstrap";
import { getPokemon } from "../api/pokemon";
import { TypeBadge } from "../components/TypeBadge";
import { useParams } from "react-router-dom";
import '../styles/PokemonNPage.css'

const PokemonNPage = () => {
    const[pokemon, setPokemon] = useState({
        id: 0,
        name: '', 
        sprites: [], 
        height: 0,
        weight: 0,
        types: [],
        abilities: [],
        moves: [],
        stats: []
    });

    const {id} = useParams();
    console.log('id',id);  
    React.useEffect( () => { 

        const fetchPokemon = async() => {
            const data = await getPokemon(id);
            console.log('data', data);
            setPokemon({
                id: data.id,
                name: data.name.charAt(0).toUpperCase() + data.name.slice(1), 
                sprites: data.sprites.versions["generation-v"]["black-white"], 
                height: data.height,
                weight: data.weight,
                types: data.types,
                abilities: data.abilities,
                moves: data.moves,
                stats: data.stats
            });
        }
        fetchPokemon();

    }, []);


    return (
        <main>
            <div className="container">
                <Card className='card-information'>
                    <Card.Header>
                        <div className='card-title'>
                            <h2> #{pokemon.id}</h2> 
                            <h2 className='card-name'>{pokemon.name}</h2>     
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Type: {pokemon.types.map( (x,i) => <TypeBadge key={i} type={x.type.name}/> )}</ListGroup.Item>
                            <ListGroup.Item>Height: {pokemon.height/10}m</ListGroup.Item>
                            <ListGroup.Item>Weight: {pokemon.weight/10}kg</ListGroup.Item>
                            <ListGroup.Item>Abilities: <ul>
                                                        {pokemon.abilities.map( (x,i) => {
                                                        return (x.is_hidden ? <li key={i}>  {x.ability.name.charAt(0).toUpperCase() + x.ability.name.slice(1) + ' (hidden ability)'} </li>
                                                                            : <li key={i}>  {x.ability.name.charAt(0).toUpperCase() + x.ability.name.slice(1)} </li>)
                                                        })}
                                                        </ul>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
                <div className='pokemon-sprites'>
                        <Tabs  defaultActiveKey="normal" className="mb-3">
                            <Tab className="tab-custom-1" eventKey="normal" title="Normal">
                                <Tabs className='tabs-custom' defautActiveKey="front" className="mb-3">
                                    <Tab className='tab-custom-2' eventKey="front" title="Front">
                                        <Card.Img variant='top' src={pokemon.sprites.front_default}/>
                                    </Tab>
                                    <Tab className='tab-custom-2' eventKey="back" title="Back">
                                        <Card.Img variant='top' src={pokemon.sprites.back_default}/>
                                    </Tab>
                                </Tabs>
                            </Tab>
                            <Tab className='tab-custom-1' eventKey="shiny" title="Shiny">
                                <Tabs className='tabs-custom'  defautActiveKey="front" className="mb-3">
                                    <Tab className='tab-custom-2' eventKey="front" title="Front">
                                        <Card.Img variant='top' src={pokemon.sprites.front_shiny}/>
                                    </Tab>
                                    <Tab className='tab-custom-2' eventKey="back" title="Back">
                                        <Card.Img variant='top' src={pokemon.sprites.back_shiny}/>
                                    </Tab>
                                </Tabs>
                            </Tab> 
                        </Tabs>
                </div>
            </div>
        </main>
    )
}

export {PokemonNPage}