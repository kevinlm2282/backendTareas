const { Usuario, Tarea } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({include: Tarea});
    return res.status(200).json({
      "success":true,
      "status":201,
      "response": usuarios
    });
  } catch (error) {
    res.status(500).json({
      "success":false,
      "status":500,
      "response":"Se produjo un error al crear el usuario",
      "error": error
    })
  }
};

exports.crearUsuario = async (req, res) => {  
    try {
      const salt = await bcrypt.genSalt(10)
      req.body.contrasenia = await bcrypt.hash(req.body.contrasenia,salt);
      const usuario = await Usuario.create(req.body);
      return res.status(201).json({
          "success":true,
          "status":201,
          "response": usuario
      });
    } catch (error) {
      res.status(500).json({
        "success":false,
        "status":500,
        "response":"Se produjo un error al crear el usuario",
        "error": error
      })
    } 
};

exports.obtenerDatosUsuario = async (req, res) => {
  try {
    const data  = await jwt.verify(req.header('Authorization'), process.env.SECRET_KEY)
    return res.status(200).json({
      "success":true,
      "status":200,
      "response":data
    });
  } catch (error) {
    return res.status(500).json({
      "success":true,
      "status":500,
      "message": "Es necesario iniciar sesion"
    });
  }
}