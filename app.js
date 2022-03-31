const express = require('express');
const morgan = require('morgan');
const productRouter = require('./routes/productRoutes');

const app = express();

app.use(express.json());

//routes
app.use('/api/v1/products', productRouter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

module.exports = app;
