const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if(req.query.name) { // localhost:5000/api/pokemons?name=.../ Advanced search
      const name = req.query.name
      return Pokemon.findAll({ where: { name: name }})
        .then(pokemons => {
          const message = `There are ${pokemons.length} pokemons with the name ${name}`
          res.json({ message, data: pokemons })
        })
        .catch(error => {
          const message = `There is no pokemon with the name ${name}`
          res.status(404).json({ message, data: error })
        })
    } 
    else{
      Pokemon.findAll()
        .then(pokemons => {
          const message = 'List of Pokemons has been found.'
          res.json({ message, data: pokemons })
        })
        .catch(error => {
          const message = 'List of Pokemons cannot be found. Try again later.'
          res.status(500).json({ message, date: error })
      })
    }
  })
}