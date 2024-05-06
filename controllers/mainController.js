const imageDownloader = require(__dirname + '/util/imageDownloader')

// DOM element selectors
const downloadButton = document.querySelector('#download-button')
const pokemonInput = document.querySelector('#pokemon-input')
const display = document.querySelector('#display')
const pokemonImage = document.querySelector('#pokemon-image')
const imageTypeToggle = document.querySelector('#image-type-toggle')

// clicking the download button
downloadButton.addEventListener('click', () => {
    
})

const getImage = () => {
  // image downloader calls the API and downloads an image to the machine.
  imageDownloader(pokemonInput.value, imageTypeToggle.checked)
  .then(fileName => {
    display.textContent = `
  File downloaded as ${fileName}.\n
  Saved to the project /images directory.
  `

    // set pokemon image display
    pokemonImage.src = `./images/${fileName}`
  })
  // error if the image cannot be downloaded or displayed.
  // error is general in the user view, but the specific error can be found in the developer console.
  .catch(e => {
    display.textContent = 'Failed to locate requested Pokémon'
    pokemonImage.src = ''
    console.error(e)
  })
}