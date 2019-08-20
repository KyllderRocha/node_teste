'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//Conecta Banco
mongoose.connect("mongodb+srv://Kyllder:kyllder@ndstr-tczgv.azure.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true});

//Carrega os Models
const Product = require('./models/product');

//Carrega as Rotas
const indexRoute = require('./routes/index-route');
const productsRoute = require('./routes/products-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productsRoute);

module.exports = app;