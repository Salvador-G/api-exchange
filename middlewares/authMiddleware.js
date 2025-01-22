const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    console.log('Authorization header:', authHeader);

    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access denied: Missing or invalid Authorization header' });
    }

    
    const token = authHeader.split(' ')[1];
    console.log('Token received:', token);

    const secretKey = 'secretKey'; // firma estatica
    console.log('Using secretKey:', secretKey);

    const decoded = jwt.verify(token, secretKey);
    console.log('Decoded payload:', decoded);

    req.user = decoded; // Guarda el payload decodificado en la solicitud
    next();
  } catch (error) {
    console.error('Error during token verification:', error.message);
    return res.status(403).json({ message: 'Invalid token', error: error.message });
  }
};

module.exports = authMiddleware;