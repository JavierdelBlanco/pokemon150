import React from "react";
import { getMoves } from "../api/moves";
import { Loading } from "./Loading";

const Moves = () => {
    const [moves, setMoves] = React.useState([]);
    const [isPending, setIsPending] = React.useState(true);

    const fetchMoves = async () => {
            const data = await getMoves();
            console.log('data',data);
            setMoves(data.results);
            setIsPending(false);
    }

    React.useEffect(() => {
        fetchMoves();
    },[]);
    


    
    return( isPending  ? <Loading/>
                       :<ul>
                            {moves.map((x,i) => <li key={i}>{x.name}</li>)}
                        </ul>
    );
}

export {Moves}