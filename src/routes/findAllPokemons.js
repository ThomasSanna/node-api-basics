const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll()
      .then(pokemons => {
        const message = 'List of Pokemons has been found.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = 'List of Pokemons cannot be found. Try again later.'
        res.status(500).json({ message, date: error })
    })
  })
}