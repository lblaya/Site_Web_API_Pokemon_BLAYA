function updatePokemonDisplay(pokemonData, searchInput) {
    const pokemonContainer = document.getElementById('pokemonContainer');
    pokemonContainer.innerHTML = '';

    const searchTerm = searchInput.value.toLowerCase();
    const filteredPokemon = pokemonData.filter(pokemon => pokemon.name.fr.toLowerCase().includes(searchTerm));

    for (const pokemon of filteredPokemon) {
        if (pokemon.pokedexId === 0) {
            continue;
        }

        const pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('pokemon_style');

        const namePokemon = document.createElement('p');
        namePokemon.classList.add('pokemon_name');
        namePokemon.textContent = pokemon.name.fr;

        const imgElement = document.createElement('img');
        imgElement.classList.add('pokemon_img');
        imgElement.src = pokemon.sprites.regular;

        pokemonDiv.appendChild(imgElement);

        for (const type of pokemon.types) {
            const typeImgElement = document.createElement('img');
            typeImgElement.classList.add('type_img');
            typeImgElement.src = type.image;
            pokemonDiv.appendChild(typeImgElement);
        }

        pokemonDiv.appendChild(namePokemon);
        pokemonContainer.appendChild(pokemonDiv);
    }
}

async function searchBar() {
    const pokemonResponse = await fetch('https://tyradex.vercel.app/api/v1/pokemon');
    const pokemonData = await pokemonResponse.json();
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', () => updatePokemonDisplay(pokemonData, searchInput));
    updatePokemonDisplay(pokemonData, searchInput);
}

async function pokemonTypes() {
    const typesResponse = await fetch('https://tyradex.vercel.app/api/v1/types');
    const typesData = await typesResponse.json();
    const pokemonTypesContainer = document.getElementById('pokemonTypes');

    for (const type of typesData) {
        const typeImgElement = document.createElement('img');
        typeImgElement.src = type.sprites;
        typeImgElement.alt = type.name.fr;
        typeImgElement.classList.add('type_logo');
        typeImgElement.addEventListener('click', () => showPokemonsByType(type.name.en));
        pokemonTypesContainer.appendChild(typeImgElement);
    }
}

async function showPokemonsByType(typeName) {
    const response = await fetch(`https://tyradex.vercel.app/api/v1/types/${typeName}`);
    const responseData = await response.json();
    const pokemonsData = responseData.pokemons;
    const pokemonContainer = document.getElementById('pokemonContainer');
    pokemonContainer.innerHTML = '';

    for (const pokemon of pokemonsData) {
        const pokemonDiv = document.createElement('div');
        pokemonDiv.classList.add('pokemon_style');

        const namePokemon = document.createElement('p');
        namePokemon.classList.add('pokemon_name');
        namePokemon.textContent = pokemon.name.fr;

        const imgElement = document.createElement('img');
        imgElement.classList.add('pokemon_img');
        imgElement.src = pokemon.sprites.regular;

        pokemonDiv.appendChild(imgElement);
        pokemonDiv.appendChild(namePokemon);
        pokemonContainer.appendChild(pokemonDiv);
    }
}
pokemonTypes();
searchBar();