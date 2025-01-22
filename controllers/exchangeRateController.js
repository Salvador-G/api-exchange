const ExchangeRate = require('../models/exchangeRate');

// Crear un nuevo tipo de cambio
const createExchangeRate = async (req, res) => {
  try {
    console.log('User:', req.user); // Verifica que req.user contiene la información del usuario
    
    console.log('Received data:', req.body); // Verifica los datos recibidos
    const { currencyFrom, currencyTo, rate } = req.body;
    const createdBy = req.user.username; // Usuario autenticado

    const newRate = new ExchangeRate({ currencyFrom, currencyTo, rate, createdBy });
    await newRate.save();

    res.status(201).json({ message: 'Exchange rate created successfully', data: newRate });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un tipo de cambio existente
const updateExchangeRate = async (req, res) => {
  try {
    const { currencyFrom, currencyTo, rate } = req.body;
    const updatedBy = req.user.username;

    const updatedRate = await ExchangeRate.findOneAndUpdate(
      { currencyFrom, currencyTo },
      { rate, updatedBy },
      { new: true }
    );

    if (!updatedRate) {
      return res.status(404).json({ message: 'Exchange rate not found' });
    }

    res.status(200).json({ message: 'Exchange rate updated successfully', data: updatedRate });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener los tipos de cambio
const getExchangeRates = async (req, res) => {
  try {
    const rates = await ExchangeRate.find();
    res.status(200).json({ data: rates });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

console.log(createExchangeRate, updateExchangeRate, getExchangeRates); // Verifica que las funciones estén definidas correctamente
module.exports = { createExchangeRate, updateExchangeRate, getExchangeRates };