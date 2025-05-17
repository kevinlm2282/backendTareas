const express = require('express');
const router = express.Router();

const { verifyToken } = require('../middleware/verify.middleware')
const { obtenerTareas, crearTarea, actualizarTarea, cambiarEstado, eliminarTarea } = require('../controllers/tarea.controller');

    router.get('/tarea', verifyToken, obtenerTareas); 
    router.post('/tarea', verifyToken, crearTarea);
    router.put('/tarea/:id', verifyToken, actualizarTarea);
    router.put('/tarea/cambiar/:id', verifyToken, cambiarEstado);
    router.delete('/tarea/:id',verifyToken, eliminarTarea)

    module.exports = router;