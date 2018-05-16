const todoRoutes = require('./todos_routes');

module.exports = function(app) {
  todoRoutes(app);
}
