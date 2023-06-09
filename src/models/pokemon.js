const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {  // The first argument of define is the name of the table (singular will be pluralized and lowercase)
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'The name is already taken.'
        },
        validate: { // Native Validator
          len: {
            args: [1, 20],
            msg: `Pokemon's name needs to be between 1 and 20 characters long.`
          },
          notEmpty: { msg: "Pokemon's name cannot be empty." },
          notNull: { msg: "Pokemon's name cannot be null." }
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { // Native Validator
          min: {
            args: [0],
            msg: "HP needs to be positive and lower than 999."
          },
          max: {
            args: [999],
            msg: "HP needs to be positive and lower than 999."
          },
          isInt: { msg: "HP needs to be an integer." },
          notNull: { msg: "HP cannot be null." }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { // Native Validator
          min: {
            args: [0],
            msg: "CP needs to be positive and lower than 99."
          },
          max: {
            args: [99],
            msg: "CP needs to be positive and lower than 99."
          },
          isInt: { msg: "CP needs to be an integer." },
          notNull: { msg: "CP cannot be null." }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { // Native Validator
          isUrl: { msg: "Picture needs to be an URL." },
          notNull: { msg: "Picture cannot be null." }
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',') // The get method is used to format the data when it is received from the database
        },
        set(types) {
          this.setDataValue('types', types.join()) // The set method is used to format the data when it is sent to the database
        },
        validate: {
          isTypesValid(value) { // Custom Validator
            if(!value) {
              throw new Error('Pokemon needs to have at least one type.')
            }
            if(value.split(',').lenth > 3) {
              throw new Error('A pokemon cannot has more than three types.')
            }
            value.split(',').forEach(type => {
              if(!validTypes.includes(type)){
                throw new Error (`Type of a pokemon needs to include to this list : ${validTypes}`)
              }
            })
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }