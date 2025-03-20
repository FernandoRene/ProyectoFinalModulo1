'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
      allowNull: false, // No permite valores nulos
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // No permite valores nulos
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, // No permite valores nulos
      validate: {
        len: [6, 100] // Mínimo 6 caracteres
      }
    }
  });

  User.associate = (models) => {
    User.hasMany(models.Task, { foreignKey: "userId" });
  };
  
  return User;
};