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
    if (err || body.statusCode !== 200) {
      res.status(500).json({ error: 'Something went wrong' })
    } else {
      try {
        const response = JSON.parse(body.body);
        res.json({
          pair,
          lastPrice: response.price, 
        });
      } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
      }
    }
  });
}

function handleBittrex(pair, res) {
  const url = BITTREX_API + pair;
  request(url, function(err, body){
    if (err || body.statusCode !== 200) {
      res.status(500).json({ error: 'Something went wrong' })
    } else {
      try {
        const response = JSON.parse(body.body);
        res.json({
          pair,
          lastPrice: response.result.Last,
        });
      } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
      }
    }
  });
}

function handleCryptopia(pair, res) {
  const pairSplit = pair.split('-');
  const url = CRYPTOPIA_API + pairSplit[1] + '_' + pairSplit[0];
  request(url, function(err, body){
    if (err || body.statusCode !== 200) {
      res.status(500).json({ error: 'Something went wrong' })
    } else {
      try {
        const response = JSON.parse(body.body);
        res.json({
          pair,
          lastPrice: response.Data.LastPrice,
        });
      } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
      }
    }
  });
}


module.exports = function(req, res) {
  const { pair, exchange } = req.params;
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
}
