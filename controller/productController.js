const Product = require('../models/productModel');

exports.createProduct = async(req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      status: 'success',
      count: product.length,
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports,getAllProducts = async(req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json({
      status: 'success',
      count: products.length,
      data: {
        products,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateProduct = async(req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        product,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteProduct = async(req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};