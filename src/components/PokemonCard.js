import React from "react";
import { Card } from "react-bootstrap";
import { TypeBadge } from "../components/TypeBadge";
import { useNavigate } from "react-router-dom";
import { usePokemon } from "../context/pokemon";
import '../styles/PokemonCard.css';

   

const PokemonCard = ({id}) => {

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
        
    },[id]);

    return (
    <Card className='card_custom' bg='light' onClick={() => {
        window.scrollTo(0,0);
        navigate(`/pokedex/pokemon/${id}`)
    }}>
        <Card.Img className='cardImage' variant='top' src={pokemon.sprite}/>
        <Card.Body className='cardBody'>
            <Card.Title>{pokemon.name} {'#' + id}</Card.Title>
            {pokemon.types.map( (x,i) => <TypeBadge key={i} type={x.type.name} /> )}
        </Card.Body>
    </Card>
    )
 }

 export {PokemonCard}