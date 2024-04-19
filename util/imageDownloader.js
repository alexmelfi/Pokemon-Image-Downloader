const fs = require('fs')

let name = 'pokemon'

// downloads the image of the given Pokemon to a file.
// communicates with PokeAPI.
module.exports = pokeId => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
    .then(res => res.json())
    .then(data => {
      if (data) {
        name = data.species.name

        return fetch(data.sprites.front_default)
          .then(res => res.arrayBuffer())
          .then(data => {

            if (!fs.existsSync(`${__dirname}/../images`)) {
              fs.mkdirSync(`${__dirname}/../images`)
            }

            fs.writeFileSync(`${__dirname}/../images/${name}.png`, Buffer.from(data))
            return Promise.resolve(`${name}.png`)
          })
      }
    })
    .catch(e => {
      return Promise.reject(e)
    })
}
