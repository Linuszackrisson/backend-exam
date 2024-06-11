const handleErrors = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Där gick det snett, nu har Linus pillat i koden!');
  };
  
  module.exports = {
    handleErrors,
  };
  