const User = require('../models/user.model');

module.exports.index = (request, response) => {
    response.json({
        message: "Hello World"
    });
};

module.exports.createUser = (request, response) => {
    const { firstName, lastName } = request.body;

    User.create({
        firstName,
        lastName
    })
        .then(user => response.json(user))
        .catch(err => response.json(err));
};