import React from "react";
import { Moves } from "../components/Moves";



const MovesPage = () => {

return (
  <article>
        <h2>List of Moves</h2>
        <p>A list of all Pokémon Moves is shown below:</p>
        <Moves/>
    </article>
    )
}

export {MovesPage}