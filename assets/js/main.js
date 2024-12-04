const pokemonList = document.querySelector("#pokemonList")
const loadMore = document.querySelector("#loadMore")
const maxRecords = 151
const limit = 8
let offset = 0



function toUpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function loadPokemons(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `
          <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${toUpperCase(pokemon.name)}</span>
    
            <div class="detail">
              <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${toUpperCase(type)}</li>`).join('')}
              </ol>
              <img src="${pokemon.image}" alt="${toUpperCase(pokemon.name)}">
            </div>
          </li>
          `
    ).join('')
    pokemonList.innerHTML += newHtml
  })
}

loadPokemons(offset, limit)

loadMore.addEventListener('click', () => {
  offset += limit

  const quantityRecord = offset + limit

  if (quantityRecord >= maxRecords) {
    const newLimit = maxRecords - offset
    loadPokemons(offset, newLimit)

    loadMore.parentElement.removeChild(loadMore)
  } else {
    loadPokemons(offset, limit)
  }
})