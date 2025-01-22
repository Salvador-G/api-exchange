const express = require('express');
const connectDB = require('./config/db');
const User = require('./models/user');
const authRoutes = require('./routes/authRoutes');
const exchangeRoutes = require('./routes/exchangeRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
connectDB();

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/exchange', exchangeRoutes);
app.use('/api/transaction', transactionRoutes);


/* const userInsert = async() => {
    try {
        // Conéctate a MongoDB
        await connectDB();
    
        // Crear un nuevo documento de usuario
        const newUser = new User({
          username: 'Juan Pérez',
          password: 'password123',
        });
    
        // Guardar el usuario en la base de datos
        await newUser.save();
        console.log('Usuario insertado exitosamente');
    
      } catch (err) {
        console.error('Error al insertar el usuario:', err.message);
      }
    };

userInsert(); */
app.listen(3000, () => console.log('Server running on port 3000'));