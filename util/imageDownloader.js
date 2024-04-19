const fs = require('fs')

let name = 'pokemon'

// downloads the image of the given Pokémon to a file.
// communicates with PokéAPI.
module.exports = pokeId => {
  // fetch the resource from PokéAPI.
  // endpoint can be a Pokémon's ID or name.
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
    // parse response as JSON
    .then(res => res.json())
    .then(data => {
      if (data) {
        name = data.species.name

        // the sprites of a Pokémon are stored as links to the resource which hosts the image.
        // fetch the image using the stored link.
        return fetch(data.sprites.front_default)
          // parse the image data into an array buffer
          .then(res => res.arrayBuffer())
          .then(data => {

            // create the /images directory if it does not exist
            if (!fs.existsSync(`${__dirname}/../images`)) {
              fs.mkdirSync(`${__dirname}/../images`)
            }

            // create an image using the parsed array buffer
            fs.writeFileSync(`${__dirname}/../images/${name}.png`, Buffer.from(data))

            // successful download of the image
            return Promise.resolve(`${name}.png`)
          })
      }
    })
    // any errors are returned
    .catch(e => {
      return Promise.reject(e)
    })
}
