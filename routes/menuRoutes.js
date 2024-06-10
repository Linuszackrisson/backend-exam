const express = require('express');
const router = express.Router();
const db = require('../data/db');
const isAdmin = require('../middleware/isAdmin');
const validateProductProperties = require('../middleware/validateProductProperties');

// GET route för att hämta hela menyn
router.get('/', (req, res) => {
  db.find({}, (err, docs) => {
    if (err) {
      console.error('Error fetching menu:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(docs);
    }
  });
});

// POST route för att lägga till en ny produkt i menyn
router.post('/', isAdmin, validateProductProperties, (req, res) => {
  const newProduct = { ...req.body, createdAt: new Date() };

  // Kontrollera om en produkt med samma titel redan finns
  db.findOne({ title: newProduct.title }, (err, existingProduct) => {
    if (err) {
      console.error('Error checking for existing product:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (existingProduct) {
      res.status(400).json({ message: 'Product with this title already exists' });
    } else {
      db.insert(newProduct, (err, product) => {
        if (err) {
          console.error('Error adding product to menu:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
          res.status(201).json(product);
        }
      });
    }
  });
});

// PUT route för att modifiera en produkt i menyn
router.put('/:id', isAdmin, validateProductProperties, (req, res) => {
  const productId = req.params.id;
  const modifiedProduct = { ...req.body, modifiedAt: new Date() };

  db.update({ _id: productId }, { $set: modifiedProduct }, {}, (err, numReplaced) => {
    if (err) {
      console.error('Error modifying product:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (numReplaced === 0) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json({ message: 'Product modified successfully' });
    }
  });
});

// DELETE route för att ta bort en produkt från menyn
router.delete('/:id', isAdmin, (req, res) => {
  const productId = req.params.id;
  db.remove({ _id: productId }, {}, (err, numRemoved) => {
    if (err) {
      console.error('Error removing product:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (numRemoved === 0) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json({ message: 'Product removed successfully' });
    }
  });
});

module.exports = router;
