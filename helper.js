const pokemons = require("./mock-pokemon");

exports.success = (message, data) => {
    return { message, data }; // ES6
};

exports.getUniqueID = (pokemons) => {
    const pokemonsIds = pokemons.map(pokemon => pokemon.id);
    const maxID = pokemonsIds.reduce((a, b) => Math.max(a, b));
    const uniqueID = maxID + 1;
    
    return uniqueID;
};