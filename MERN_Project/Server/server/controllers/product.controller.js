const Product = require('../models/product.model');

module.exports.createProduct = (request, response) => {
    const { title, price, desc } = request.body;

    Product.create({
        title,
        price,
        desc
    })
        .then(product => response.json(product))
        .catch(err => response.json(err));
};

module.exports.getAllProducts = async (request, response) => {
    try {
        const products = await Product.find({});
        response.json(products);
    } catch (err) {
        response.json(err);
    }
};

module.exports.getProduct = async (request, response) => {
    try {
        const product = await Product.findOne({ _id: request.params.id });
        response.json(product);
    } catch (err) {
        response.json(err);
    }
};

module.exports.updateProduct = async (request, response) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { _id: request.params.id },
            request.body,
            { new: true }
        );
        response.json(updatedProduct);
    } catch (err) {
        response.json(err);
    }
};

module.exports.deleteProduct = async (request, response) => {
    try {
        const deleteConfirmation = await Product.deleteOne({ _id: request.params.id });
        response.json(deleteConfirmation);
    } catch (err) {
        response.json(err);
    }
};