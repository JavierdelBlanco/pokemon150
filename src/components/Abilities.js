import React from "react";
import { getAbilities } from "../api/abilities";
import { Loading } from "./Loading";

const Abilities = () => {
    const [abilities, setAbilities] = React.useState([]);
    const [isPending, setIsPending] = React.useState(true);

    React.useEffect( () => {
        const fetchAbilities = async() => {
            const data = await getAbilities();
            setAbilities(data.results);
            setIsPending(false);
        }
        fetchAbilities();
    }, []);


    return( isPending  ? <Loading/>
                       :<ul>
                            {abilities.map((x,i) => <li key={i}>{x.name}</li>)}
                        </ul>
    );
}
export {Abilities}