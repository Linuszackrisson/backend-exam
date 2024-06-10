const isAdmin = (req, res, next) => {
    if (req.session && req.session.role === 'admin') {
      next(); 
    } else {
      res.status(403).json({ message: 'Access forbidden' }); // Användaren är inte inloggad eller har inte admin-rollen, skicka tillbaka ett felmeddelande
    }
  };
  
  module.exports = isAdmin;
  