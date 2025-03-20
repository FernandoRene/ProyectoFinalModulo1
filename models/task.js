'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    title: {
      type: DataTypes.STRING,
      allowNull: false, // No permite valores nulos
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true // Opcional
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false, // No permite valores nulos
      validate: {
        isIn: [['pendiente', 'en progreso', 'completada']]
      },
      defaultValue: 'pendiente'
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true // Opcional
    },
    userId: { // validaciones para el campo userId
      type: DataTypes.INTEGER,
      allowNull: false, // No permite valores nulos
      references: {
        model: 'User', // Nombre de la tabla de user
        key: 'id' // Clave primaria en la tabla de usuarios
      }
    }
  });
  Task.associate = (models) => {
    Task.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Task;
};