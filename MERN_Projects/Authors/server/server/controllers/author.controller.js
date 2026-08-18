const Author = require('../models/author.model');

module.exports.createAuthor = (request, response) => {
    const { name } = request.body;

    Author.create({
        name
    })
        .then(author => response.json(author))
        .catch(err => response.json(err));
};

module.exports.getAllAuthors = async (request, response) => {
    try {
        const authors = await Author.find({});
        response.json(authors);
    } catch (err) {
        response.json(err);
    }
};

module.exports.getAuthor = async (request, response) => {
    try {
        const author = await Author.findOne({ _id: request.params.id });
        response.json(author);
    } catch (err) {
        response.json(err);
    }
};

module.exports.updateAuthor = async (request, response) => {
    try {
        const updatedAuthor = await Author.findOneAndUpdate(
            { _id: request.params.id },
            request.body,
            { new: true }
        );
        response.json(updatedAuthor);
    } catch (err) {
        response.json(err);
    }
};

module.exports.deleteAuthor = async (request, response) => {
    try {
        const deleteConfirmation = await Author.deleteOne({ _id: request.params.id });
        response.json(deleteConfirmation);
    } catch (err) {
        response.json(err);
    }
};