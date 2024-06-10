const Datastore = require('nedb');

const db = new Datastore({ filename: './data/menu.db', autoload: true });

const getMenu = (req, res) => {
  db.find({}, (err, docs) => {
    if (err) {
      console.error('Error fetching menu:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(docs);
    }
  });
};

module.exports = {
  getMenu,
};
