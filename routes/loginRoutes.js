const express = require('express');
const router = express.Router();
const session = require('express-session');

// Användarobjekt som håller användarinformation
let user = {
  username: 'admin',
  password: 'admin123',
  role: 'guest' // Default roll är 'guest'
};

// Konfigurera express-session
router.use(session({
  secret: 'mySecret', // Ersätt 'mySecret' med din egen hemliga nyckel
  resave: false,
  saveUninitialized: false
}));

router.post('/', (req, res) => {
  const { username, password } = req.body;

  // Kontrollera användarnamn och lösenord
  if (username === user.username && password === user.password) {
    // Spara användarrollen i sessionen
    req.session.role = 'admin';
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

module.exports = router;
