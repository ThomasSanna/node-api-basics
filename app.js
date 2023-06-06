const express = require('express')
const { success } = require('./helper.js')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

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

app.listen(port, () => console.log(`Our node app is started on http://localhost:${port}`))

// Coded by Sanna Thomas (github.com/wadeekt) 😊