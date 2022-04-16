const Order = require('../models/orderModel');

exports.createOrder = async(req, res) => {
  try {
    const order = await Order.create(req.body);

    res.status(201).json({
      status: 'success',
      count: order.length,
      data: {
        order,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getAllOrder = async(req, res) => {
  try {
    const order = await Order.find({});

    res.status(200).json({
      status: 'success',
      count: order.length,
      data: {
        order,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getOrder = async(req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};


exports.updateOrder = async(req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      status: 'success',
      count: order.length,
      data: {
        order,
      },
    })
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteOrder = async(req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

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
