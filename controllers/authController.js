const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Función para registrar un nuevo usuario
exports.register = async (req, res) => {
    const { username, password } = req.body;
  
    // Verificar si el nombre de usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }
  
    // Crear un nuevo usuario
    const user = new User({
      username,
      password
    });
  
    await user.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  };
  

// Función para login y obtener token
exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
  
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
    }
    const secretKey = 'secretKey'
    const token = jwt.sign({ username: user.username }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  };

