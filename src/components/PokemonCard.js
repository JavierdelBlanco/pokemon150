import React from "react";
import { Card } from "react-bootstrap";
import { TypeBadge } from "../components/TypeBadge";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaHeartBroken } from 'react-icons/fa';

import '../styles/PokemonCard.css';
import { getPokemon } from "../api/pokemon";
import { Loading } from "./Loading";



const PokemonCard = ({id}) => {

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
      });
      setIsPending(false);
      return pokemon;  
    }

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
    const [isPending,setIsPending] = React.useState(true);
    const [pokemon, setPokemon] = React.useState({
        id: 0,
        name: '',
        sprite: '',
        types: []
    });

    const navigate = useNavigate();

    React.useEffect( () => {
        fetchPokemon(id);
    },[id]);

    React.useEffect( () => {
        
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
    isPending ? <Loading/> 
              :<Card className='card_custom' bg='light' onClick={(e) => handleClick(e)}>
                    <Card.Img className='cardImage' variant='top' src={pokemon.sprite}/>
                    <Card.Body className='cardBody'>
                    <Card.Title>{pokemon.name} {'#' + id}</Card.Title>
                        {pokemon.types.map( (x,i) => <TypeBadge key={i} type={x.type.name} /> )}
                        <div className="icon_container" onMouseEnter={() => setHeartHover(true)} onMouseLeave={() => setHeartHover(false)}>
                            <Icon liked={liked} hover={heartHover}/>
                        </div>
                    </Card.Body>
                </Card>
    )
 }

 export {PokemonCard}