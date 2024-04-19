const imageDownloader = require(`${__dirname}/util/imageDownloader`)
const insertPokemon = require(`${__dirname}/util/dbInterface`)

// DOM element selectors
const downloadButton = document.getElementById('download-button')
const pokemonInput = document.getElementById('pokemon-input')
const display = document.getElementById('display')
const pokemonImage = document.getElementById('pokemon-image')
const saveButton = document.getElementById('save-button')

// clicking the download button
downloadButton.addEventListener('click', () => {

  downloadImage()
    // error if the image cannot be downloaded or displayed.
    // error is general in the user view, but the specific error can be found in the developer console.
    .catch(e => {
      display.textContent = 'Failed to locate requested Pokémon'
      pokemonImage.src = ''
      console.error(e)
    })
})

// click the save to database button
saveButton.addEventListener('click', () => {
  insertPokemon(pokemonInput.value)
    .then(name => {
      console.log(name)
      display.textContent = `
      ${name} saved to database.
      `
    })
    .catch(e => {
      display.textContent = 'Failed to save requested Pokémon'
      pokemonImage.src = ''
      console.error(e)
    })
})

const downloadImage = () => {
  // image downloader calls the API and downloads an image to the machine.
  return imageDownloader(pokemonInput.value)
    .then(fileName => {
      display.textContent = `
      File downloaded as ${fileName}.\n
      Saved to the project /images directory.
      `

      // set pokemon image display
      pokemonImage.src = `./images/${fileName}`
    })
}