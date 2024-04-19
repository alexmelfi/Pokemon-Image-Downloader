// fetch the resource from PokéAPI.
// endpoint can be a Pokémon's ID or name.
module.exports = pokeId => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
    // parse response as JSON
    .then(res => res.json())
}
