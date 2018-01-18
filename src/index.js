const express = require('express');
const app = express();
const routes = require('./routes');

var port = process.env.PORT || 8080;

routes(app);

app.listen(port);

