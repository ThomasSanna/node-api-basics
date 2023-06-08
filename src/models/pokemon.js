module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {  // The first argument of define is the name of the table (singular will be pluralized and lowercase)
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',') // The get method is used to format the data when it is received from the database
        },
        set(types) {
          this.setDataValue('types', types.join()) // The set method is used to format the data when it is sent to the database
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }