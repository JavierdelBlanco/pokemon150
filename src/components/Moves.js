import React from "react";
import { getMoves } from "../api/moves";

const Moves = () => {
    const [moves, setMoves] = React.useState([]);

    React.useEffect(() => {
        const fetchMoves = async () => {
            const data = await getMoves();
            setMoves(data);
        }
        fetchMoves();
    },[]);
    



    return( 
        <ul>
            {moves.map((x,i) => <li key={i}>{x.name}</li>)}
        </ul>
    );
}

export {Moves}