import React from "react";
import { Card } from "react-bootstrap";
import { TypeBadge } from "../components/TypeBadge";
import { useNavigate } from "react-router-dom";
import { usePokemon } from "../context/pokemon";
import { FaHeart, FaHeartBroken } from 'react-icons/fa';

import '../styles/PokemonCard.css';



const PokemonCard = ({id}) => {

    const handleFavorites = (id) => {
        let favorites = localStorage.getItem("Favorites");
        favorites = favorites !== null ? JSON.parse(favorites) : [];
        if(favorites.includes(id)){
            favorites = favorites.filter((x) => x !== id);
        }else favorites.push(id);
        favorites = localStorage.setItem("Favorites", JSON.stringify(favorites));
        console.log(localStorage.getItem("Favorites"));
        return null
    }
    
    const [liked,setLiked] = React.useState(localStorage.getItem("Favorites") !== null ? JSON.parse(localStorage.getItem("Favorites")).includes(id) : false);
    const [heartHover,setHeartHover] = React.useState(false);
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
        
    },[id,liked,heartHover]);

    const handleClick = (e) => {
        if(e.target.nodeName === 'path' ||  e.target.nodeName === 'svg'){
            setLiked(!liked); 
            handleFavorites(id);
        }else navigate(`/pokedex/pokemon/${id}`);
    }

    const Icon = ({liked, hover}) => {
        const heartClass = liked ? 'heart_liked' : 'heart';
        
        return (
            (hover && liked && <FaHeartBroken className="heart_liked"/>) || <FaHeart className={heartClass}/>
        );
    }
    return (
    <Card className='card_custom' bg='light' onClick={(e) => handleClick(e)}>
        <Card.Img className='cardImage' variant='top' src={pokemon.sprite}/>
        <Card.Body className='cardBody'>
            <Card.Title>{pokemon.name} {'#' + id}</Card.Title>
            {pokemon.types.map( (x,i) => <TypeBadge key={i} type={x.type.name} /> )}
            <div className="icon_container" onMouseEnter={() => setHeartHover(true)} onMouseLeave={() => setHeartHover(false)}>
             <Icon liked={liked} hover={heartHover}/>
            </div>
        </Card.Body>
        <div className="App">
    </div>
    </Card>
    )
 }

 export {PokemonCard}