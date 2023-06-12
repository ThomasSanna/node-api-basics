const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth.js')
  
module.exports = (app) => {
  app.delete('/api/pokemons/:id', auth, (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then(pokemon => {
        if(pokemon === null){
          const message = 'Pokemon do not exist. Try with an another ID.'
          return res.status(404).json({message})
        }
        
        const pokemonDeleted = pokemon;
        return Pokemon.destroy({
          where: { id: pokemon.id }
        })
          .then(_ => {
            const message = `Pokemon with id n°${pokemonDeleted.id} has been deleted.`
            res.json({ message, data: pokemonDeleted })
          })
      })
      .catch(error => {
        const message = "The Pokemon cannot be deleted. Try later."
        res.status(500).json({ message, data: error })
      })
  })
}