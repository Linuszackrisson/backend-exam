const isAdmin = (req, res, next) => {
    // Kontrollera om användaren är inloggad och har admin-rollen
    if (req.session && req.session.role === 'admin') {
      next(); // Användaren är admin, fortsätt till nästa middleware eller route
    } else {
      res.status(403).json({ message: 'Access forbidden' }); // Användaren är inte inloggad eller har inte admin-rollen, skicka tillbaka ett felmeddelande
    }
  };
  
  module.exports = isAdmin;
  