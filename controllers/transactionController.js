const Transaction = require('../models/transaction');
const ExchangeRate = require('../models/exchangeRate');

// Función para realizar una transacción
const createTransaction = async (req, res) => {
  const { currencyFrom, currencyTo, amountFrom } = req.body;
  const userId = req.user._id; // El id del usuario autenticado

  try {
    // Buscar la tasa de cambio para la moneda especificada
    const exchangeRate = await ExchangeRate.findOne({
      currencyFrom,
      currencyTo,
    });

    if (!exchangeRate) {
      return res.status(400).json({ message: 'Exchange rate not found' });
    }

    // Calcular la cantidad convertida
    const amountTo = amountFrom * exchangeRate.rate;

    // Crear la transacción
    const transaction = new Transaction({
      fromCurrency: currencyFrom, // Moneda de origen
      toCurrency: currencyTo,     // Moneda de destino
      amountFrom,
      amountTo,
      rate: exchangeRate.rate,
      createdBy: req.user.username, // El nombre del usuario que hace la transacción
      exchangeRateId: exchangeRate._id, // ID de la tasa de cambio utilizada
    });

    // Guardar la transacción en la base de datos
    await transaction.save();

    res.status(201).json({
      message: 'Transaction successful',
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Obtener transacciones
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json({ data: transactions });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createTransaction, getTransactions };