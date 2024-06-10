const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session'); 
const menuRoutes = require('./routes/menuRoutes');
const loginRoutes = require('./routes/loginRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const db = require('./data/db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
  secret: 'Pappa123', 
  resave: false,
  saveUninitialized: false
}));

app.use(bodyParser.json());

app.use('/menu', menuRoutes);
app.use('/login', loginRoutes);

app.use(errorMiddleware.handleErrors);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
