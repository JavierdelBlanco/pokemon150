const getAbilities = async (page) => {
    const url = `https://pokeapi.co/api/v2/ability?offset=${(page-1)*34}&limit=34`;
    try {
            let res = await fetch(url);
            if(!res.ok){
                let error = {
                err: true,
                status: res.status,
                statusText: !res.statusText ? 'An error has occurred'
                                            : res.statusText
                }
                throw error;
            }
            const data = await res.json();
            return data;

    } catch (error) {
        console.log(error);
    }
}

export {
    getAbilities,
}