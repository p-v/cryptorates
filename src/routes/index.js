const priceRoutes = require('./price_routes');

module.exports = function(app) {
  app.use(priceRoutes());
}
