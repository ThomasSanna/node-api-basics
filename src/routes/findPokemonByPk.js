const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    console.log(req.params);
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if (pokemon === null){
          const message = "The Pokemon do not exist. Try with an another ID."
          return res.status(404).json({ message })
        }
        const message = 'A Pokemon has been found.'
        res.json({ message, data: pokemon })
      })
      .catch(error => {
        const message = "Pokemons cannot be found. Try again later."
        res.status(500).json({ message, data: error})
      })
  })
}