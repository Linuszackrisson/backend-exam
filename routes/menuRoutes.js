const express = require('express');
const router = express.Router();
const { menuDb } = require('../data/db');
const isAdmin = require('../middleware/isAdmin');
const validateProductProperties = require('../middleware/validateProductProperties');

router.get('/', (req, res) => {
  menuDb.find({}, (err, docs) => {
    if (err) {
      console.error('Error fetching menu:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(docs);
    }
  });
});

router.post('/', isAdmin, validateProductProperties, (req, res) => {
  const newProduct = { ...req.body, createdAt: new Date() };

  menuDb.insert(newProduct, (err, product) => {
    if (err) {
      console.error('Error adding product to menu:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json(product);
    }
  });
});

router.put('/:id', isAdmin, validateProductProperties, (req, res) => {
  const productId = req.params.id;
  const modifiedProduct = { ...req.body, modifiedAt: new Date() };

  menuDb.update({ _id: productId }, { $set: modifiedProduct }, {}, (err, numReplaced) => {
    if (err) {
      console.error('Error modifying product:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (numReplaced === 0) {
      res.status(404).json({ message: 'Produkten kunde ej hittas!' });
    } else {
      res.json({ message: 'Ändringarna är nu genomförda!' });
    }
  });
});

router.delete('/:id', isAdmin, (req, res) => {
  const productId = req.params.id;
  menuDb.remove({ _id: productId }, {}, (err, numRemoved) => {
    if (err) {
      console.error('Error removing product:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (numRemoved === 0) {
      res.status(404).json({ message: 'Produkt hittades ej.' });
    } else {
      res.json({ message: 'Produkten är nu borttagen!' });
    }
  });
});

module.exports = router;
