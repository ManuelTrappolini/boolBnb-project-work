const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const connection = require('../database/connection')

// user registration
function register(req, res) {
  const { username, password, name, email } = req.body;

  // Data validation
  if (!username || !password || !name || !email) {
    return res.status(400).json({ error: 'All fields are mandatory.' });
  }

  //Password hash
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: 'Error hashing the password' });

    // Inserting data into the table
    const sql = 'INSERT INTO owners (name, email, username, password) VALUES (?, ?, ?, ?)';
    connection.query(sql, [name, email, username, hashedPassword], (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ success: true, userId: result.insertId });
    });
  });

}

// User login
function login(req, res) {
  const { username, password } = req.body;

  // retrieve data related to this username
  const sql = 'SELECT * FROM owners WHERE username = ?';
  connection.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid username or password' });

    const user = results[0];

    // compare passwords  
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: err });
      if (!isMatch) return res.status(401).json({ error: 'Invalid username or password' });

      // generate temporary token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  });
}

module.exports = { register, login };