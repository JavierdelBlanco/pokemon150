const getMoves = async () => {
    const url = 'https://pokeapi.co/api/v2/move/';
    try {
            let res = await fetch(url);
            if(!res.ok){
                throw {
                err: true,
                status: res.status,
                statusText: !res.statusText ? 'An error has occurred'
                                            : res.statusText
                }
            }
            const data = await res.json();
            return data;

    } catch (error) {
        console.log(error);
    }
}

export {
    getMoves,
}