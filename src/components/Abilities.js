import React from "react";
import { getAbilities } from "../api/abilities";

const Abilities = (props) => {
    const [abilities, setAbilities] = React.useState([]);

    React.useEffect( () => {
        const fetchAbilities = async() => {
            const data = await getAbilities();
            setAbilities(data);
        }
        fetchAbilities();
    }, []);


    return (
        <ul>
          { abilities.map( (x,i) => <li key={i}> {x.name} </li>) }
        </ul>
    );
}
export {Abilities}