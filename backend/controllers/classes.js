const Classes = require('../models/classes');
const classes = new Classes();

module.exports = (app) => {
    app.get('/classes', (req, resp) => {
        classes.getClasses(resp, req.query);
    });

    app.get('/classes/:id', (req, resp) => {
        const id = parseInt(req.params.id);
        classes.getClass(resp, {id});
    });
}
