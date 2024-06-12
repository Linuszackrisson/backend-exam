const express = require('express');
const router = express.Router();
const { campaignDb } = require('../data/db');
const isAdmin = require('../middleware/isAdmin');
const validateCampaign = require('../middleware/validateCampaign');

router.post('/', isAdmin, validateCampaign, (req, res) => {
  const { products, campaignPrice } = req.body;

  campaignDb.findOne({ products }, (err, existingCampaign) => {
    if (err) {
      console.error('Error checking existing campaign:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (existingCampaign) {
      return res.status(400).json({ message: 'En kampanj med dessa produkter existerar redan.' });
    }

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

router.get('/', (req, res) => {
  campaignDb.find({}, (err, docs) => {
    if (err) {
      console.error('Error fetching campaigns:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (docs.length === 0) {
      res.status(404).json({ error: 'Ingen kampanj hittad.' });
    } else {
      res.json(docs);
    }
  });
});

router.delete('/:id', isAdmin, (req, res) => {
  const campaignId = req.params.id;
  campaignDb.remove({ _id: campaignId }, {}, (err, numRemoved) => {
    if (err) {
      console.error('Error removing campaign:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else if (numRemoved === 0) {
      res.status(404).json({ message: 'Kampanjen du försöker ta bort finns inte.' });
    } else {
      res.json({ message: 'Kampanjen är nu borttagen! Trist, det som var så bra pris.' });
    }
  });
});

module.exports = router;
