const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.put('/api/pokemons/:id', (req, res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Pokemon.findByPk(id)
        .then(pokemon => {
          if (pokemon === null){
            const message = "The Pokemon do not exist. Try with an another ID."
            return res.status(404).json({ message })
          }
          const message = `Pokemon ${pokemon.name} has been updated.`
          res.json({message, data: pokemon })
        })
    })
    .catch(error => {
      const message = "List of Pokemons cannot be updated. Try again later."
      res.status(500).json({ message, data: error})
    })
  })
}