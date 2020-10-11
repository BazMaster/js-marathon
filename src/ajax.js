class ajaxData {
    constructor(player1id = 0, attackid = 0, player2id = 0) {
        this.api = {
            pokemons: 'https://reactmarathon-api.netlify.app/api/pokemons',
            fight: 'https://reactmarathon-api.netlify.app/api/fight?player1id=' + player1id + '&attackId=' + attackid + '&player2id=' + player1id + '',
        }
    }

    getData = async (api) => {
        const response = await fetch(this.api[api]);
        const body = await response.json();
        return await body;
    }

}

export default ajaxData;