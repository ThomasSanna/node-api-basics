const express = require('express')
const morgan = require('morgan')
const favicon = require('serve-favicon')
const { success } = require('./helper.js')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))

app.get("/", (req, res) => res.send('Hello Express !'))

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'A pokemon has been found'
    res.json(success(message, pokemon))
});

app.get('/api/pokemons', (req, res) => {
    const message = "A list of pokemons has been found"
    res.json(success(message, pokemons))
})

app.listen(port, () => console.log(`Our Node app is started on http://localhost:${port}`))

// Coded by Sanna Thomas (https://github.com/wadeekt) 😊