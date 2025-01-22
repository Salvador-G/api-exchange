const express = require('express');
const jwt = require('jsonwebtoken');
const { createExchangeRate, updateExchangeRate, getExchangeRates } = require('../controllers/exchangeRateController');
const authMiddleware  = require('../middlewares/authMiddleware');

const router = express.Router();

console.log(createExchangeRate, updateExchangeRate, getExchangeRates); // Asegúrate de que estas funciones se están importando correctamente

router.post('/', authMiddleware, createExchangeRate);
router.put('/', authMiddleware, updateExchangeRate);
router.get('/', authMiddleware, getExchangeRates);

module.exports = router;