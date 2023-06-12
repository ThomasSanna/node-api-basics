const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Pokemon } = require('../db/sequelize')
const auth = require('../auth/auth.js')

module.exports = (app) => {
    app.post("/api/pokemons", auth, (req, res) => {
        Pokemon.create(req.body)
            .then(pokemon => {
                const message = `Pokemon ${req.body.name} has been created.`
                res.json({ message, data: pokemon })
            })
            .catch(error => {
                if(error instanceof ValidationError) { // Sequelize Validator Errors 
                    return res.status(400).json({ message: error.message, data: error})
                }
                if(error instanceof UniqueConstraintError) { // Sequelize Constraint Errors
                    return res.status(400).json({ message: error.message, data: error })
                }
                const message = "The Pokemon cannot be added. Try again later."
                res.status(500).json({ message, data: error})
            })
    })
}

