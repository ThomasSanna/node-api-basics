const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

  
module.exports = (app) => {
  app.get('/api/pokemons', auth, (req, res) => {
    if(req.query.name) { // localhost:3000/api/pokemons?name=.../ Advanced search
      const name = req.query.name

      if(name.length < 2) { // if the name is less than 2 characters, return an error (to avoid too many results)
        return res.status(400).json({ message: 'The name must contain at least 2 characters.' })
      } else {
        return Pokemon.findAndCountAll({
          where: { 
            name: { // 'name' is the column name in the table
              [Op.like]: `%${name}%` // 'Op.like' is the operator for 'LIKE' in SQL
            } 
          },
          order: ['name'],
          limit: parseInt(req.query.limit) || 5 // limit the number of results (localhost:3000/api/pokemons?name=...&limit=10)
        })
          .then(({count, rows}) => {
            const message = `There are ${count} pokemons with the name ${name}.`
            res.json({ message, data: rows })
          })
      }
    } 
    else{
      Pokemon.findAll({ order: ['name'] }) // localhost:3000/api/pokemons (without any query)
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