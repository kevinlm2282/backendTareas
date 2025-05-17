const express = require('express');
const router = express.Router();

const { obtenerUsuarios, crearUsuario, obtenerDatosUsuario } = require('../controllers/usuario.controller');

    router.get('/usuarios', obtenerUsuarios);
    router.get('/usuario', obtenerDatosUsuario);
    router.post('/usuarios', crearUsuario);

    module.exports = router;