import React from "react";
import { Card } from "react-bootstrap";
import { TypeBadge } from "../components/TypeBadge";
import { getPokemon } from "../api/pokemon"; 
import { useNavigate } from "react-router-dom";
import '../styles/PokemonCard.css';

const PokemonCard = (props) => {
    const [pokemon, setPokemon] = React.useState({
        name: '',
        sprite: '',
        types: []
    });

    React.useEffect( () => { 
        
        const fetchPokemon = async() => {
            const data = await getPokemon(props.id);
            setPokemon({
                name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
                sprite: data.sprites.versions["generation-v"]["black-white"].front_default,
                types: data.types
            });
        }
        fetchPokemon();
    }, []);

    const navigate = useNavigate();


    return (
    <Card className='card-custom' bg='light' onClick={() => navigate("/pokedex/pokemon/" + props.id)} >
        <Card.Img className='card-image-custom' variant='top' src={pokemon.sprite}/>
        <Card.Body className='cardBody-custom'>
            <Card.Title>{pokemon.name} {'#' + props.id}</Card.Title>
            {pokemon.types.map( (x,i) => <TypeBadge key={i} type={x.type.name} /> )}
        </Card.Body>
    </Card>
    )
 }

 export {PokemonCard}