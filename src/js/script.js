// Seleciona o elemento HTML com a classe "search"
const search = document.querySelector('.search');

// Seleciona os elementos HTML com os respectivos IDs
const number = document.querySelector('#number');
const name = document.querySelector('#name');
const pokemonImage = document.querySelector('#pokemon-image');
const types = document.querySelector('#types');
const statNumber = document.querySelectorAll('.stat-number');
const barInner = document.querySelectorAll('.bar-inner');
const barOuter = document.querySelectorAll('.bar-outer');
const statDesc = document.querySelectorAll('.stat-desc');
const baseStats = document.querySelector('#base-stats');
const pokedex = document.querySelector('#pokedex');


// Cores dos tipos de Pokémon
const typeColors = {
    "rock": [182, 158, 49],
    "ghost": [112, 85, 155],
    "steel": [183, 185, 208],
    "water": [100, 147, 235],
    "grass": [116, 203, 72],
    "psychic": [251, 85, 132],
    "ice": [154, 214, 223],
    "dark": [117, 87, 76],
    "fairy": [230, 158, 172],
    "normal": [170, 166, 127],
    "fighting": [193, 34, 57],
    "flying": [168, 145, 236],
    "poison": [164, 62, 158],
    "ground": [222, 193, 107],
    "bug": [167, 183, 35],
    "fire": [245, 125, 49],
    "electric": [249, 207, 48],
    "dragon": [112, 55, 255]
}

// Função para buscar dados do Pokémon na API
const fetchApi = async (pkmnName) => {
    // Junta os nomes dos Pokémon que possuem mais de uma palavra
    pkmnNameApi = pkmnName.split(' ').join('-');

    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + pkmnNameApi);

    if (response.status === 200) {
        const pkmnData = await response.json();
        return pkmnData;
    }

    return false;
}

// Evento de mudança no campo de busca
search.addEventListener('change', async (event) => {
    const pkmnData = await fetchApi(event.target.value);

    // Validação quando o Pokémon não existe
    if (!pkmnData) {
        alert('Pokémon does not exist.');
        return;
    }

    // Cor principal do Pokémon, para alterar o tema da interface
    const mainColor = typeColors[pkmnData.types[0].type.name];
    baseStats.style.color = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
    pokedex.style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;

    // Define o número do Pokémon no topo da página
    console.log(pkmnData);

    // Define o numero do Pokémon
    number.innerHTML = '#' + pkmnData.id.toString().padStart(3, '0');

    // Define o nome do Pokémon
    name.innerHTML = pkmnData.name.charAt(0).toUpperCase() + pkmnData.name.substring(1);;

    // Define a imagem do Pokémon
    pokemonImage.src = pkmnData.sprites.other.home.front_default;

    // Atualiza as bolhas de "Tipo"
    types.innerHTML = '';

    pkmnData.types.forEach((t) => {
        let newType = document.createElement('span');
        let color = typeColors[t.type.name];

        newType.innerHTML = t.type.name;
        newType.classList.add('type');
        newType.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;

        types.appendChild(newType);
    });

    // Atualiza os valores e as barras de estatísticas
    pkmnData.stats.forEach((s, i) => {
        statNumber[i].innerHTML = s.base_stat.toString().padStart(3, '0');
        barInner[i].style.width = `${s.base_stat}%`;
        barInner[i].style.backgroundColor = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
        barOuter[i].style.backgroundColor = `rgba(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]}, 0.3)`;
        statDesc[i].style.color = `rgb(${mainColor[0]}, ${mainColor[1]}, ${mainColor[2]})`;
    });
});