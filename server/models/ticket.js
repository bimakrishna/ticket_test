'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Ticket.belongsTo(models.User)
      // define association here
    }
  };
  Ticket.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Ticket can not empty'
        }
      }
    },
    image_url: {
     type: DataTypes.STRING,
     validate: {
       notEmpty: {
         args: true,
         msg: 'image_url can not empty'
       }
     }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          args: true,
          msg: 'status can not empty'
        }
      }
    },
    due_date: { 
      type: DataTypes.DATE,
      validate: {
        notEmpty: { 
          args: true, 
          msg: 'Ticket has to have Date' },
        dateCustom(value) {
          const validate = value > new Date()
          if (!validate) 
          throw new Error('Date must be greater than today')
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};