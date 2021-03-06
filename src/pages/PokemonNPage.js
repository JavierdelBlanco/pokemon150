import React, { useState } from "react";
import { Card, ListGroup, Table, Tab, Tabs } from "react-bootstrap";
import { TypeBadge } from "../components/TypeBadge";
import { useParams } from "react-router-dom";
import { Loading } from "../components/Loading";
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { getPokemon } from "../api/pokemon"
import '../styles/PokemonNPage.css'
;



const PokemonNPage = () => {
    
    const fixName = (x) => {
        let name = x.charAt(0).toUpperCase() + x.slice(1);
        let hyphen = name.indexOf('-');
        if(hyphen !== -1){
            name = name.slice(0, hyphen + 1) + name.charAt(hyphen + 1).toUpperCase() + name.slice(hyphen + 2)
        }
        name = name.replace('-',' ');
        return name;
    }

    const handleFavorite = (id) => {
        let favorites = localStorage.getItem("Favorites");
        favorites = favorites !== null ? JSON.parse(favorites) : [];
        if(favorites.includes(id)){
            favorites = favorites.filter((x) => x !== id);
        }else favorites.push(id);
        favorites = localStorage.setItem("Favorites", JSON.stringify(favorites));
        console.log(localStorage.getItem("Favorites"));
        return null
    }

    const fetchPokemon = async(id) => {
    const data = await getPokemon(id);
    setPokemon({
      id: data.id,
      name: fixName(data.name), 
      sprites: data.sprites, 
      height: data.height,
      weight: data.weight,
      types: data.types,
      abilities: data.abilities,
      moves: data.moves,
      stats: data.stats 
      })
      setIsPending(false);
      return pokemon;  
    }

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
    const [isPending,setIsPending] = React.useState(true);
    const [liked,setLiked] = React.useState(null);
    const [heartHover,setHeartHover] = React.useState(false);
    const {id} = useParams(); 

    React.useEffect( () => {
        fetchPokemon(id);
    },[]);

    React.useEffect( () => {
        if(!isPending){
            setLiked(localStorage.getItem("Favorites") !== null ? JSON.parse(localStorage.getItem("Favorites")).includes(pokemon.id) : false);
        };
    },[liked,heartHover]);

    const Moves = () =>{
        let list = [];
        pokemon.moves.map( (x) => {
            x.version_group_details.map((y,i) => {
                list.push(<tr key={i} id={i} lm={y.move_learn_method.name} ver={y.version_group.name} number={y.level_learned_at}>
                            <td key={0}>{fixName(x.move.name)}</td>
                            <td key={1}>{y.level_learned_at === 0 ? 'evo' : y.level_learned_at}</td>
                        </tr>)
            return 0;
            })
            return 0
        })
        return list
               .filter( (x) => x.props.ver === 'ultra-sun-ultra-moon' && x.props.lm === 'level-up' )
               .sort((a,b) => a.props.number - b.props.number)
    }

    const Icon = ({liked, hover}) => {
        const heartClass = liked ? 'heart_liked_n' : 'heart_n';
        
        return (
            (hover && liked && <FaHeartBroken className="heart_liked_n"/>) || <FaHeart className={heartClass}/>
        );
    }

    return isPending 
            ? <Loading/>
            : <main>
            <div className="main_information">
                <Card className='card-information'>
                    <Card.Header className="card_header_custom">
                        <div className='card-title'>
                            <h2> #{pokemon.id}</h2> 
                            <h2 className='card-name'>{pokemon.name}</h2>
                            <div className="icon_container_n" 
                                onMouseEnter={() => setHeartHover(true)} 
                                onMouseLeave={() => setHeartHover(false)} 
                                onClick={() => {
                                    setLiked(!liked);
                                    handleFavorite(pokemon.id)
                                }}>
                                <Icon liked={liked} hover={heartHover}/>
                            </div>  
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Type: {pokemon.types.map( (x,i) => <TypeBadge key={i} type={x.type.name}/> )}</ListGroup.Item>
                            <ListGroup.Item>Height: {pokemon.height/10}m</ListGroup.Item>
                            <ListGroup.Item>Weight: {pokemon.weight/10}kg</ListGroup.Item>
                            <ListGroup.Item>Abilities: <ul>
                                                        {pokemon.abilities.map( (x,i) => {
                                                        return (x.is_hidden ? <li key={i}>  {fixName(x.ability.name) + ' (Hidden Ability)'} </li>
                                                                            : <li key={i}>  {fixName(x.ability.name)} </li>)
                                                        })}
                                                        </ul>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
                
                <div className='pokemon-sprites'>
                        <Tabs  defaultActiveKey="normal" className="mb-3">
                            <Tab className="tab-custom-1" eventKey="normal" title="Normal">
                                <Tabs className='tabs-custom' defaultActiveKey="front" className="mb-3">
                                    <Tab className='tab-custom-2' eventKey="front" title="Front">
                                        <Card.Img variant='top' src={pokemon.sprites.front_default}/>
                                    </Tab>
                                    <Tab className='tab-custom-2' eventKey="back" title="Back">
                                        <Card.Img variant='top' src={pokemon.sprites.back_default}/>
                                    </Tab>
                                </Tabs>
                            </Tab>
                            <Tab className='tab-custom-1' eventKey="shiny" title="Shiny">
                                <Tabs className='tabs-custom'  defaultActiveKey="front" className="mb-3">
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
            <div className="other_information">
                <Table striped bordered hover size='sm' className="table_custom">
                    <thead>
                        <tr>
                            <th key={0}>Stats</th>
                            <th key={1}>Hp</th>
                            <th key={2}>Attack</th>
                            <th key={3}>Defense</th>
                            <th key={4}>Special Attack</th>
                            <th key={5}>Special Defense</th>
                            <th key={6}>Speed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td key={0}>PE</td>
                            {pokemon.stats.map( (x,i) =>  <td key={i}>{x.effort}</td>)}
                        </tr>
                        <tr>
                            <td key={1}>Base</td>
                            {pokemon.stats.map( (x,i) =>  <td key={i}>{x.base_stat}</td>)}
                        </tr>
                        <tr>
                            <td key={2}>Max (UN)</td>
                            {pokemon.stats.map( (x,i) =>  <td key={i}>{ i === 0 ? (((x.base_stat * 2) + 31 + (252/4)) + 100 + 10) : Math.floor((((x.base_stat * 2) + 31 + (252/4)) + 5) * 0.9)}</td>)}
                        </tr>
                        <tr>
                            <td key={3}>Max (NN)</td>
                            {pokemon.stats.map( (x,i) =>  <td key={i}>{ i === 0 ? (((x.base_stat * 2) + 31 + (252/4)) + 100 + 10) : (((x.base_stat * 2) + 31 + (252/4)) + 5)}</td>)}
                        </tr>
                        <tr>
                            <td key={4}>Max (FN)</td>
                            {pokemon.stats.map( (x,i) =>  <td key={i}>{ i === 0 ? (((x.base_stat * 2) + 31 + (252/4)) + 100 + 10) : Math.floor((((x.base_stat * 2) + 31 + (252/4)) + 5) * 1.1)}</td>)}
                        </tr>
                    </tbody>
                </Table>
                <Table striped bordered hover size='sm' className="table_custom">
                    <thead>
                        <tr>
                            <th key={0}>Moves</th>
                            <th key={1}>Level</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Moves/>
                    </tbody>
                </Table>
            </div>
        </main>
        
}

export {PokemonNPage}