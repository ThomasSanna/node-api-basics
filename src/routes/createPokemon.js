const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
    app.post("/api/pokemons", (req, res) => {
        Pokemon.create(req.body)
            .then(pokemon => {
                const message = `Pokemon ${req.body.name} has been created.`
                res.json({ message, data: pokemon })
            })
            .catch(error => console.error(error))
    })
}