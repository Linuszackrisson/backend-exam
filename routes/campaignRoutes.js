const express = require('express');
const router = express.Router();
const { campaignDb } = require('../data/db');
const isAdmin = require('../middleware/isAdmin');
const validateCampaign = require('../middleware/validateCampaign');

// POST route för att lägga till en ny kampanj
router.post('/', isAdmin, validateCampaign, (req, res) => {
  const { products, campaignPrice } = req.body;

  // Kontrollera om kampanjen redan finns
  campaignDb.findOne({ products }, (err, existingCampaign) => {
    if (err) {
      console.error('Error checking existing campaign:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (existingCampaign) {
      return res.status(400).json({ message: 'Campaign with these products already exists' });
    }

    // Lägg till den nya kampanjen
    const newCampaign = { products, campaignPrice, createdAt: new Date().toISOString() };
    campaignDb.insert(newCampaign, (err, campaign) => {
      if (err) {
        console.error('Error adding campaign to database:', err);
        return res.status(500).json({ error: 'Internal server error' });
      } else {
        res.status(201).json(campaign);
      }
    });
  });
});

// GET route för att hämta alla kampanjer
router.get('/', (req, res) => {
  campaignDb.find({}, (err, docs) => {
    if (err) {
      console.error('Error fetching campaigns:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (docs.length === 0) {
      res.status(404).json({ error: 'No campaigns found' });
    } else {
      res.json(docs);
    }
  });
});

// DELETE route för att ta bort en kampanj
router.delete('/:id', isAdmin, (req, res) => {
  const campaignId = req.params.id;
  campaignDb.remove({ _id: campaignId }, {}, (err, numRemoved) => {
    if (err) {
      console.error('Error removing campaign:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (numRemoved === 0) {
      res.status(404).json({ message: 'Campaign not found' });
    } else {
      res.json({ message: 'Campaign removed successfully' });
    }
  });
});

module.exports = router;
