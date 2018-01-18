const request = require('request');

const BITTREX = 'https://bittrex.com/api/v1.1/public/getticker?market='
const BINANCE = 'https://api.binance.com/api/v1/ticker/price?symbol='
const CRYPTOPIA = 'https://www.cryptopia.co.nz/api/GetMarket/'


function handleBinance(pair, res) {
  const pairSplit = pair.split('-');
  const url = BINANCE + pairSplit[1] + pairSplit[0];
  request(url, function(err, body){
    if (err) {
      res.status(500).send('Something went wrong')
    } else {
      res.json(body);
    }
  });
}

function handleBittrex(pair, res) {
  const url = BITTREX + pair;
  request(url, function(err, body){
    if (err) {
      res.status(500).send('Something went wrong')
    } else {
      res.json(body);
    }
  });
}

function handleCryptopia(pair, res) {
  const pairSplit = pair.split('-');
  const url = CRYPTOPIA + pairSplit[1] + '_' + pairSplit[0];
  request(url, function(err, body){
    if (err) {
      res.status(500).send('Something went wrong')
    } else {
      res.json(body);
    }
  });
}


module.exports = function(req, res) {
  const { pair, exchange } = req.params;
  if (!exchange || !pair) {
    res.status(500).send('Check params')
  }
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
