const mongoose = require('mongoose');

const ExchangeRateSchema = new mongoose.Schema({
    currencyFrom: { type: String, required: true, uppercase: true },
    currencyTo: { type: String, required: true, uppercase: true },
    rate: { type: Number, required: true, min: 0 },
    createdBy: { type: String, required: true },//Usuario que creo la tasa 
    updatedBy: { type: String }, //usuario que actualizo la tasa
}, { timestamps: true });

// Evitar duplicados de tasas de cambio para la misma combinación de monedas
ExchangeRateSchema.index({ currencyFrom: 1, currencyTo: 1 }, { unique: true });

module.exports = mongoose.model('ExchangeRate', ExchangeRateSchema);