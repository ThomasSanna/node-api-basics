const express = require('express')
let pokemons = require('./mock-pokemon')

const app = express()
const port = 3000

app.get("/", (req, res) => res.send('Hello Express !'))

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    res.send(`You asked for pokemon n°${id} which is ${pokemon.name}`)
});

app.get('/api/pokemons', (req, res) => {
    res.send(`There are ${pokemons.length} pokemons on mock-pokemon.js file !`)
})

app.listen(port, () => console.log(`Our node app is started on http://localhost:${port}`))

// Coded by Sanna Thomas (github.com/wadeekt) 😊 