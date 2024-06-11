const express = require('express');
const router = express.Router();
const session = require('express-session');

let user = {
  username: 'admin',
  password: 'admin123',
  role: 'guest' 
};

router.use(session({
  secret: 'mySecret', 
  resave: false,
  saveUninitialized: false
}));

router.post('/', (req, res) => {
  const { username, password } = req.body;

  if (username === user.username && password === user.password) {
    
    req.session.role = 'admin';
    res.status(200).json({ message: 'Inloggning lyckades!' });
  } else {
    res.status(401).json({ message: 'Fel användarnamn eller lösenord, testa admin och admin123 :)' });
  }
});

module.exports = router;
