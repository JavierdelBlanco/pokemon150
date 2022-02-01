const getAbilities = async () => {
    const url = 'https://pokeapi.co/api/v2/ability/';
    const data = await fetch(url)
    .then(res => res.json())
    .catch(error => console.log(error));
    return data.results;
}

export {
    getAbilities,
}