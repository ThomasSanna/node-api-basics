const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const favicon = require('serve-favicon')
const sequelize = require('./src/db/sequelize')

const app = express()
const port = 3000


app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json()) // for parsing application/json

sequelize.initDb()

require('./src/routes/findAllPokemons')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)


app.listen(port, () => console.log(`Our Node app is started on http://localhost:${port}`))

// Coded by Sanna Thomas (https://github.com/wadeekt) 😊