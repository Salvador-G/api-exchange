const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://salguerreroh26:ToYbZMmBoF47sdJE@cluster0.2qqff.mongodb.net/DB_Exchange'); //URI de conexion(duracion de 36h)
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;