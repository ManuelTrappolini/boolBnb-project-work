const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const connection = require('../database/connection')

// registrazione dell'utente
function register(req, res) {
  const { username, password, name, email } = req.body;

  // Validazione dei dati
  if (!username || !password || !name || !email) {
    return res.status(400).json({ error: 'Tutti i campi sono obbligatori.' });
  }

  //hash della password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Errore durante l’hashing della password' });

    // Inserimento dei dati nella tabella
    const sql = 'INSERT INTO owners (name, email, username, password) VALUES (?, ?, ?, ?)';
    connection.query(sql, [name, email, username, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ success: true, userId: result.insertId });
    });
  });

}

// Login dell'utente
function login(req, res) {
  const { username, password } = req.body;

  // recupera dati relativi a questo username
  const sql = 'SELECT * FROM owners WHERE username = ?';
  connection.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid username or password' });

    const user = results[0];

    // confronta password  
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err });
      if (!isMatch) return res.status(401).json({ error: 'Invalid username or password' });

      // genera token temporaneo
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
}

module.exports = { register, login };