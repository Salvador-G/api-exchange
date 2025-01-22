const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fromCurrency: { type: String, required: true },
  toCurrency: { type: String, required: true },
  amountFrom: { type: Number, required: true },
  amountTo: { type: Number, required: true },
  rate: { type: Number, required: true },
  createdBy: { type: String, required: true }, // Usuario que hace la transacción
  exchangeRateId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ExchangeRate' }, // Asegúrate de incluir este campo
}, { timestamps: true });

module.exports = mongoose.model('Transaction', TransactionSchema);