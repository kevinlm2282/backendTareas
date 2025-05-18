const { where } = require('sequelize');
const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    req.body.correo = req.body.correo.trim()
    req.body.contrasenia = req.body.contrasenia.trim()
    const { correo, contrasenia} = req.body;
    const user = await Usuario.findOne({where: { correo: correo} })
    if(!user){
      return res.status(400).json({
        "success":false,
        "status":400,
        "response":"usuario no encontrado",
      });
    }
    const ismatch = await bcrypt.compare(contrasenia, user.contrasenia)
    if(!ismatch){
      return res.status(400).json({
        "success":false,
        "status":400,
        "response":"la contraseña no es correcta",
      });
    }
    const token = jwt.sign(
      { id:user.id, correo: user.correo },
      process.env.SECRET_KEY,
      { expiresIn: process.env.TOKEN_EXPIRATION || "1h"}
    )
    return res.status(200).json({
      "success":true,
      "status":201,
      "response": {
        token
      }
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      "success":false,
      "status":500,
      "response":"Se produjo un error al hacer login ",
      "error": error
    })
  }
};