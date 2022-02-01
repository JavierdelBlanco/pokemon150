const getPokemon = async (id) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id;
    const data = await fetch(url)
    .then(res => res.json())
    .catch(error => console.log(error));
    return data;
}

export {
   getPokemon,
};