const fs = require('fs')

const imageDownloader = require(__dirname + '/util/imageDownloader')

const downloadButton = document.getElementById('download-button')
const pokemonInput = document.getElementById('pokemon-input')
const display = document.getElementById('display')
const pokemonImage = document.getElementById('pokemon-image')

downloadButton.addEventListener('click', () => {
  imageDownloader(pokemonInput.value)
    .then(fileName => {
      display.textContent = `
      File downloaded as ${fileName}.\n
      Saved to the project /images directory.
      `

      // set pokemon image
      pokemonImage.src = `./images/${fileName}`
    })
    .catch(e => {
      display.textContent = 'Failed to locate requested Pokémon'
      pokemonImage.src = ''
      console.error(e)
    })
})
