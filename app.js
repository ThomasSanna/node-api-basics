const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const { success, getUniqueID } = require('./helper.js')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json()) // for parsing application/json

app.get("/", (req, res) => res.send('Hello Express !'))

// SEARCH AN UNIQUE POKEMON (WITH ID)

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'A pokemon has been found'
    res.json(success(message, pokemon))
});

// SHOW LIST OF POKEMONS

app.get('/api/pokemons', (req, res) => {
    const message = "A list of pokemons has been found"
    res.json(success(message, pokemons))
})

// CREATE A NEW POKEMON

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueID(pokemons)
    console.log(req);
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `${pokemonCreated.name} a été créé !`
    res.json(success(message, pokemonCreated))
})

// UPDATE AN EXISTING POKEMON

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonUpdated = { ...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon
    })
    const message = `The pokemon ${pokemonUpdated.name} is updated.`
    res.json(success(message, pokemonUpdated))
})

// DELETE AN EXISTING POKEMON

app.delete('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
  pokemons = pokemons.filter(pokemon => pokemon.id !== id)
  const message = `The pokemon ${pokemonDeleted.name} is deleted.`
  res.json(success(message, pokemonDeleted))
})

app.listen(port, () => console.log(`Our Node app is started on http://localhost:${port}`))

// Coded by Sanna Thomas (https://github.com/wadeekt) 😊