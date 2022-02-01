const getMoves = async () => {
    const url = 'https://pokeapi.co/api/v2/move/';
    const data = await fetch(url)
    .then(res => res.json())
    .catch(error => console.log(error));
    return data.results;
}

export {
    getMoves,
}