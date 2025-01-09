const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const connection = require('../database')

// registrazione dell'utente
function register(req, res) {
    const {username, password, name, email} = req.body;

    //hash della password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: 'Error hashing password' })
    })

    // inserimento dei dati nella tabella
    const sql = 'INSERT INTO owners (username, password, name, email) VALUES (?, ?, ?, ?)';
    connection.query(sql, [username, hashedPassword, name, email], (err, result) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ success: true, userId: result.insertId });
    });
}

// Login dell'utente
function login(req, res) {
    const { username, password } = req.body;

    // recupera dati relativi a questo username
    const sql = 'SELECT * FROM users WHERE username = ?';
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