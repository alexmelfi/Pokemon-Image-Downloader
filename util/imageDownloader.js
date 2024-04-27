const fs = require('fs')

let name = 'pokemon'
let id = '0'

const downloadImage = (res, name) => {
  // create the /images directory if it does not exist
  if (!fs.existsSync(`${__dirname}/../images`)) {
    fs.mkdirSync(`${__dirname}/../images`)
  }

  // create an image using the parsed array buffer
  return fs.promises.writeFile(`${__dirname}/../images/${name}.png`, res.body)
    // successful download of the image
    .then(() => Promise.resolve(`${name}.png`))
    .catch(err => Promise.reject(err))
}

// downloads the image of the given Pokémon to a file.
// communicates with PokéAPI.
module.exports = ((pokeId, bulbapedia) => {
  // fetch the resource from PokéAPI.
  // endpoint can be a Pokémon's ID or name.
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
    // parse response as JSON
    .then(res => res.json())
    .then(data => {
      if (data) {
        name = data.species.name

        if (bulbapedia) {
          name = name[0].toUpperCase() + name.slice(1)
          id = data.id.toString()
          while (id.length < 4) id = '0' + id
          // the sprites of a Pokémon are stored as links to the resource which hosts the image.
          // fetch the image using the stored link.
          return fetch(`https://bulbapedia.bulbagarden.net/wiki/File:${id}${name}.png`)
            // download the image
            .then(res => res.text())
            .then(data => {
              const domParser = new DOMParser()
              const pokeDocument = domParser.parseFromString(data, 'text/html')
              const pokeImg = pokeDocument
                .getElementById('file')
                .querySelectorAll('img')[0].src
              return fetch(pokeImg)
                .then(res => downloadImage(res, name))
            })
        } else {
          // the sprites of a Pokémon are stored as links to the resource which hosts the image.
          // fetch the image using the stored link.
          return fetch(data.sprites.front_default)
            // download the image
            .then(res => downloadImage(res, name))
        }
      }
    })
    // any errors are returned
    .catch(e => Promise.reject(e))
})
