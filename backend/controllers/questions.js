const Questions = require('../models/questions');
const questions = new Questions();

module.exports = (app) => {
    app.get('/questions', (req, resp) => {
        questions.getQuestions(resp, req.query);
    });

    app.get('/questions/:id', (req, resp) => {
        const id = parseInt(req.params.id);
        questions.getGroupByQuestion(resp, {...req.query, id});
    });
}
