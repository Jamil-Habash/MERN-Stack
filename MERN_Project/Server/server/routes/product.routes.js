const ProductController = require('../controllers/product.controller');
module.exports = function(app){
    app.post('/api/products', ProductController.createProduct);
    app.get('/api/products', ProductController.getAllProducts);
    app.get('/api/products/:id', ProductController.getProduct);
    app.patch('/api/products/:id', ProductController.updateProduct);
    app.patch('/api/products/:id/edit', ProductController.updateProduct);
    app.delete('/api/products/:id', ProductController.deleteProduct);
}