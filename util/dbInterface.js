const sqlite3 = require('sqlite3')

const fetchPokemon = require('./fetchPokemon')

const createDatabase = () => {
  const newdb = new sqlite3.Database('./pokemon-images.sqlite', err => {
    if (err) console.log(err)
  })
  createTables(newdb)
}

const createTables = newdb => {
  newdb.exec(`
    create table pokemon (
        id int primary key not null,
        name text not null,
        image text not null
    );
  `)
}

const insertPokemon = id => {
  const db = new sqlite3.Database('./pokemon-images.sqlite', sqlite3.OPEN_READWRITE, err => {
    if (err && err.code === 'SQLITE_CANTOPEN') {
      createDatabase()
    }
    else if (err) console.log("Getting error " + err)
  })

  return fetchPokemon(id)
    .then(data => {
      db.exec(`
          insert into pokemon (id, name, image)
          values (${data.id}, '${data.species.name}', '${data.sprites.front_default}');
      `, err => {
        if (err) return Promise.reject(err)
      })

      return Promise.resolve(data.species.name)
    })
    .catch(e => {
      console.log(e)
    })
}

module.exports = insertPokemon
