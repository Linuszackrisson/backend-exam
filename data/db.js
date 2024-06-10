const Datastore = require('nedb');

const menuDb = new Datastore({ filename: './data/menu.db', autoload: true });
const campaignDb = new Datastore({ filename: './data/campaigns.db', autoload: true });

menuDb.find({}, (err, docs) => {
  if (err) {
    console.error('Error fetching menu:', err);
  } else if (docs.length === 0) {
    const menuData = [
      {
        title: "Bryggkaffe",
        desc: "Bryggd på månadens bönor.",
        price: 39,
        createdAt: new Date().toISOString(),
      },
      {
        title: "Caffè Doppio",
        desc: "Bryggd på månadens bönor.",
        price: 49,
        createdAt: new Date().toISOString(),
      },
      {
        title: "Cappuccino",
        desc: "Bryggd på månadens bönor.",
        price: 49,
        createdAt: new Date().toISOString(),
      },
      {
        title: "Latte Macchiato",
        desc: "Bryggd på månadens bönor.",
        price: 49,
        createdAt: new Date().toISOString(),
      },
      {
        title: "Kaffe Latte",
        desc: "Bryggd på månadens bönor.",
        price: 54,
        createdAt: new Date().toISOString(),
      },
      {
        title: "Cortado",
        desc: "Bryggd på månadens bönor.",
        price: 39,
        createdAt: new Date().toISOString(),
      }
    ];

    menuDb.insert(menuData, (err, newDocs) => {
      if (err) {
        console.error('Error inserting menu into database:', err);
      } else {
        console.log('Menu inserted into database:', newDocs);
      }
    });
  }
});

module.exports = { menuDb, campaignDb };
