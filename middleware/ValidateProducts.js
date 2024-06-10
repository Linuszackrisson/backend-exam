const validateProductProperties = (req, res, next) => {
    const { id, title, desc, price, ...rest } = req.body;
  
    // Kontrollera om några nödvändiga egenskaper saknas
    if (!id || !title || !desc || !price) {
      return res.status(400).json({ message: "Missing required properties: id, title, desc, price" });
    }
  
    // Kontrollera om det finns extra egenskaper
    if (Object.keys(rest).length > 0) {
      return res.status(400).json({ message: "Extra properties are not allowed" });
    }
  
    // Alla nödvändiga egenskaper finns med och inga extra egenskaper finns, fortsätt till nästa middleware eller route
    next();
  };
  
  module.exports = validateProductProperties;
  