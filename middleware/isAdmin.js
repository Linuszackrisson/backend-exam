const isAdmin = (req, res, next) => {
    if (req.session && req.session.role === 'admin') {
      next(); 
    } else {
      res.status(403).json({ message: 'Endast admin har tillträde till denna funktion' }); 
    }
  };
  
  module.exports = isAdmin;
  