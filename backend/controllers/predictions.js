const Predictions = require('../models/predictions');
const predictions = new Predictions();

module.exports = (app) => {
    app.get('/predictions', (req, resp) => {
        predictions.getPredictions(resp, req.query);
    });
}
