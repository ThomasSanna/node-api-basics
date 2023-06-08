const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    console.log(req.params);
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        const message = 'A Pokemon has been found.'
        res.json({ message, data: pokemon })
      })
      .catch(error => console.error(error))
  })
}