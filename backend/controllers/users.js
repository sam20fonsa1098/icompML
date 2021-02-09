const Users = require('../models/users');
const users = new Users();

module.exports = (app) => {
    app.get('/users', (req, resp) => {
        users.getUsers(resp, req.query);
    });
}
