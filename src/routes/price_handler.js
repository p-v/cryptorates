const request = require('request');

const BITTREX_API = 'https://bittrex.com/api/v1.1/public/getticker?market='
const BINANCE_API = 'https://api.binance.com/api/v1/ticker/price?symbol='
const CRYPTOPIA_API = 'https://www.cryptopia.co.nz/api/GetMarket/'

const BITTREX = 'bittrex';
const BINANCE = 'binance';
const CRYPTOPIA = 'cryptopia';

function handleBinance(pair, res) {
  const pairSplit = pair.split('-');
  const url = BINANCE_API + pairSplit[1] + pairSplit[0];
  request(url, function(err, body){
    const response = JSON.parse(body.body);
    if (err) {
      res.status(500).send('Something went wrong')
    } else {
      res.json({
        pair,
        lastPrice: response.price, 
      });
    }
  });
}

function handleBittrex(pair, res) {
  const url = BITTREX_API + pair;
  request(url, function(err, body){
    if (err) {
      res.status(500).send('Something went wrong')
    } else {
      const response = JSON.parse(body.body);
      res.json({
        pair,
        lastPrice: response.result.Last,
      });
    }
  });
}

function handleCryptopia(pair, res) {
  const pairSplit = pair.split('-');
  const url = CRYPTOPIA_API + pairSplit[1] + '_' + pairSplit[0];
  request(url, function(err, body){
    if (err) {
      res.status(500).send('Something went wrong')
    } else {
      const response = JSON.parse(body.body);
      res.json({
        pair,
        lastPrice: response.Data.LastPrice,
      });
    }
  });
}


module.exports = function(req, res) {
  const { pair, exchange } = req.params;
  if (!exchange || !pair) {
    res.status(500).send('Check params')
  }
  try {
    switch (exchange) {
      case BITTREX:
        handleBittrex(pair, res);
        break;
      case BINANCE:
        handleBinance(pair, res);
        break;
      case CRYPTOPIA:
        handleCryptopia(pair, res);
        break;
    }
  } catch (error) {
    res.status(500).send('Something went wrong')
  }
}
