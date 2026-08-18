const AuthorController = require('../controllers/author.controller');
module.exports = function(app){
    app.post('/authors/new', AuthorController.createAuthor);
    app.get('/authors', AuthorController.getAllAuthors);
    app.get('/authors/:id', AuthorController.getAuthor);
    app.patch('/authors/:id', AuthorController.updateAuthor);
    app.patch('/authors/:id/edit', AuthorController.updateAuthor);
    app.delete('/authors/:id', AuthorController.deleteAuthor);
}