const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET

// Middleware per autenticare il token
function authenticateToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(403).json({ error: 'Access forbidden: No token provided' });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    req.user = user; // Aggiungi l'utente decodificato alla richiesta
    next();
  });
}

module.exports = { authenticateToken };
