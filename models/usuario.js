'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define("Usuario",{
    nombre:DataTypes.STRING,
    correo:DataTypes.STRING,
    contrasenia:DataTypes.STRING
  },{
    sequelize,
    paranoid: true,
    deletedAt: 'deletedAt',
  });

  Usuario.associate = (models) => {
    Usuario.hasMany(models.Tarea, {foreignKey:"usuarioId"});
  }

  return Usuario;
};

