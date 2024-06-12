const { menuDb } = require('../data/db');

const validateProductProperties = (req, res, next) => {
  const { title, desc, price } = req.body;

  if (!title || !desc || !price) {
    return res.status(400).json({ message: "Missing required properties: title, desc, price" });
  }

  const allowedProperties = ['title', 'desc', 'price'];
  const extraProperties = Object.keys(req.body).filter(prop => !allowedProperties.includes(prop));
  if (extraProperties.length > 0) {
    return res.status(400).json({ message: "Endast titel, beskrivning och pris är tillåtet." });
  }

  menuDb.findOne({ title }, (err, existingProduct) => {
    if (err) {
      console.error('Error checking for existing product:', err);
      return res.status(500).json({ error: 'Internal server error' });
    } else if (existingProduct) {
      return res.status(400).json({ message: 'En produkt med den här namnet existerar redan.' });
    } else {
      next();
    }
  });
};

module.exports = validateProductProperties;
