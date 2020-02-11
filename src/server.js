const express = require('express');
const cors = require('cors');
const http = require('http');

require('dotenv/config');

const routes = require('./routes');

const app = express();
const server = http.Server(app);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

server.listen(process.env.PORT || 3333);