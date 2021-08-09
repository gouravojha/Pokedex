const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 150; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        console.log(results)
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_shiny'],
            type: result.types.map((type) => type.type.name).join(' , '),
            id: result.id,
            moves1: result.moves.slice(0,5).map((e) => e.move["name"]).join(" , "),

        }));
        displayPokemon(pokemon);
    });
};

const displayPokemon = (pokemon) => {
    // console.log(pokemon);
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
        <li class="card">
            <img class="card-image" src="${pokeman.image}"/>
            <h2 class="card-title">${pokeman.name}</h2>
            <p class="card-subtitle">Type: ${pokeman.type}</p>
            <p class="">Top 5 Moves</p>
            <p>${pokeman.moves1}</p>
        </li>
    `
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
