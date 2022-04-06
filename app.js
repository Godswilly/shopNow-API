const express = require('express');
const morgan = require('morgan');
const productRouter = require('./routes/productRoutes');

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//routes
app.use('/api/v1/products', productRouter);

module.exports = app;
