const { Router } = require('express');
const priceHandler = require('./price_handler');

module.exports = function() {
  const routes = new Router();
  routes.get('/price/:exchange/:pair', function(req, res) {
    priceHandler(req, res)
  });
  return routes;
}


