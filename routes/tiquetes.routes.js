const express = require('express');
const router = express.Router();
const tiquetesControlador= require('../controladores/tiquetes-contorlador')

router
    .get('/listar-reservas', tiquetesControlador.listarReservas)
    .post('/guardar-reservas', tiquetesControlador.guardarReservas)
    .post('/buscar-paises', tiquetesControlador.buscarPaises)

module.exports = router;
