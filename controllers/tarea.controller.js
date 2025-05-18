const { where } = require("sequelize");
const { Tarea } = require("../models");
const dayjs = require("dayjs");
const jwt = require('jsonwebtoken');

exports.obtenerTareas = async (req, res) => {
    try {
      const { id }  = jwt.verify(req.header('Authorization'), process.env.SECRET_KEY)
      const tareas = await Tarea.findAll({
        attributes: ['id', 'titulo', 'descripcion','estado', 'fechaLimite'],
        order: [
          ['id', 'DESC']
        ],
        where:{
          usuarioId:id,
          estado:req.query.estado
        }
        });
      res.status(200).json({
        "success":true,
        "status":200,
        "response": tareas
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({
        "success":false,
        "status":500,
        "response":"Se produjo un error al obtener las tareas",
        "error": error
      })
    }
};

exports.crearTarea = async (req, res) => {
    try {
        const { id }  = jwt.verify(req.header('Authorization'), process.env.SECRET_KEY)
        req.body.estado = 0
        req.body.usuarioId = id
        const tarea = await Tarea.create(req.body);
        return res.status(200).json({
          "success":true,
          "status":201,
          "response": tarea
        });
      } catch (error) {
        res.status(500).json({
          "success":false,
          "status":500,
          "response":"Se produjo un error al crear una tarea",
          "error": error
        })
      }
};

exports.actualizarTarea = async (req, res) => {
    try {
        const { id } = req.params
        await Tarea.update(req.body, {where: { id: id}});
        return res.status(200).json({
          "success":true,
          "status":201,
          "response": req.body
        });
      } catch (error) {
          res.status(500).json({
          "success":false,
          "status":500,
          "response":"Se produjo un error al actualizar tarea",
          "error": error
        })
      }
};

exports.cambiarEstado = async(req, res) => {
    try {
        const {_previousDataValues, dataValues: { estado }} = await Tarea.findByPk(req.params.id)
        await Tarea.update({estado: estado + 1},{ where: {id: req.params.id}})
         return res.status(200).json({
            "success":true,
            "status":200,
            "response": _previousDataValues
        })
    } catch (error) {
        res.status(500).json({
            "success":false,
            "status":500,
            "response":"Se produjo un error al cambiar estado",
            "error": error
        })
    }
}

exports.eliminarTarea = async(req, res) => {
  try {
      await Tarea.destroy({ where: { id: req.params.id} })
      return res.status(200).json({
          "success":true,
          "status":200,
          "message": "Se elimino la tarea con exito"
      })
  } catch (error) {
      res.status(500).json({
          "success":false,
          "status":500,
          "response":"Se produjo un error al cambiar estado",
          "error": error
      })
  }
}