'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Tarea = sequelize.define("Tarea",{
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    estado: DataTypes.INTEGER,
    fechaLimite: DataTypes.DATE
  },{
    sequelize,
    paranoid: true,
    deletedAt: 'deletedAt',
  });

  Tarea.associate = (models) => {
    Tarea.belongsTo(models.Usuario, {foreignKey: "usuarioId"});
  }

  return Tarea;
};