const imageDownloader = require(__dirname + '/util/imageDownloader')

// DOM element selectors
const downloadButton = document.getElementById('download-button')
const pokemonInput = document.getElementById('pokemon-input')
const display = document.getElementById('display')
const pokemonImage = document.getElementById('pokemon-image')

// clicking the download button
downloadButton.addEventListener('click', () => {
  // image downloader calls the API and downloads an image to the machine.
  imageDownloader(pokemonInput.value)
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
})
