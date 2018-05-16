/* Error Handler */
module.exports = function(app) {
  // capture all rough requests
  app.get('*', (req, res, next) => {
    let error = new Error('Not found');
    error.statusCode = 404;
    next(error);
  });

  // middleware
  app.use((error, req, res, next) => {
    if (!error.statusCode) { error.statusCode = 500; }
    res.status(error.statusCode)
       .json({
         code: error.statusCode,
         message: error.message || 'Invalid Request'
       });
  });
}
