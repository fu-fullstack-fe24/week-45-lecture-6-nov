const sectionSetup = () => {
    const sectionRefs = document.querySelectorAll('.section');
    sectionRefs.forEach(section => section.classList.add('d-none'));
};
const navSetup = () => {
    const navItemRefs = document.querySelectorAll('.nav-item');
    navItemRefs.forEach(navItem => {
        navItem.addEventListener('click', (e) => {
            console.log(e.target.dataset.id);
            toggleSectionDisplay(e.target.dataset.id);
        });
    });
};
const toggleSectionDisplay = (section) => {
    const pokedexSectionRef = document.querySelector('#pokedexSection');
    const searchSectionRef = document.querySelector('#searchSection');
    const generatorSectionRef = document.querySelector('#generatorSection');
    switch (section) {
        case 'pokedex':
            pokedexSectionRef.classList.remove('d-none');
            searchSectionRef.classList.add('d-none');
            generatorSectionRef.classList.add('d-none');
            break;
        case 'search':
            pokedexSectionRef.classList.add('d-none');
            searchSectionRef.classList.remove('d-none');
            generatorSectionRef.classList.add('d-none');
            break;
        case 'generate':
            pokedexSectionRef.classList.add('d-none');
            searchSectionRef.classList.add('d-none');
            generatorSectionRef.classList.remove('d-none');
            break;
        default:
            console.log('Någonting gick väldigt, väldigt snett...');
    }
};
const pokedexSetup = async () => {
    const pokemonBasicList = await fetchAllPokemons();
    const pokemonPromises = [];
    pokemonBasicList.forEach(pokemon => {
        pokemonPromises.push(fetchPokemonDetails(pokemon.url));
    });
    const pokemonList = (await Promise.all(pokemonPromises)).filter(pokemon => pokemon !== null);
    renderPokedex(pokemonList);
};
const fetchAllPokemons = async () => {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
        console.log(response);
        if (response.ok) {
            const data = await response.json();
            return data.results;
        }
        else {
            throw new Error('Det sket sig...igen');
        }
    }
    catch (error) {
        console.log(error);
        return [];
    }
};
const fetchPokemonDetails = async (url) => {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            throw new Error('Det sket sig...igen');
        }
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
const renderPokedex = (pokemons) => {
    const sectionRef = document.querySelector('#pokedexContainer');
    pokemons.forEach(pokemon => {
        const cardRef = createCard(pokemon);
        sectionRef.appendChild(cardRef);
    });
};
const createCard = (pokemon) => {
    const cardRef = document.createElement('article');
    cardRef.classList.add('pokemon-card');
    const cardTemplate = `
        <section class="card-top">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name} sprite" class="card-sprite">
            <span class="card-id">#${pokemon.id}</span>
        </section>
        <section class="card-middle">
            <h2>${capitalizeWords(pokemon.name)}</h2>
            <h3>
                ${pokemon.types.length === 2
        ? capitalizeWords(pokemon.types[0]?.type.name) + ' / ' + capitalizeWords(pokemon.types[1]?.type.name)
        : capitalizeWords(pokemon.types[0]?.type.name)}
            </h3>
        </section>
        <section class="card-bottom">
            <p class="card-stat">Attack: ${pokemon.stats[1]?.base_stat ?? 'not defined'}</p>
            <p class="card-stat">Defense: ${pokemon.stats[2]?.base_stat ?? 'not defined'}</p>
            <p class="card-stat">Sp. Attack: ${pokemon.stats[3]?.base_stat ?? 'not defined'}</p>
            <p class="card-stat">Sp. Defense: ${pokemon.stats[4]?.base_stat ?? 'not defined'}</p>
            <p class="card-stat">HP: ${pokemon.stats[0]?.base_stat ?? 'not defined'}</p>
            <p class="card-stat">Speed: ${pokemon.stats[5]?.base_stat ?? 'not defined'}</p>
            <p class="card-stat card-stat--span-two">Total: ${calculateTotal(pokemon)}</p>
        </section>
    `;
    cardRef.innerHTML = cardTemplate;
    return cardRef;
};
const calculateTotal = (pokemon) => {
    let total = 0;
    pokemon.stats.forEach(stat => total += stat.base_stat);
    return total;
};
const capitalizeWords = (str) => {
    if (str) {
        return str.replace(/\b\w/g, (match) => match.toUpperCase());
    }
    else {
        return '-';
    }
};
sectionSetup();
navSetup();
pokedexSetup();
export {};
//# sourceMappingURL=index.js.map