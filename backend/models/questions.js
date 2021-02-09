const connection = require('../infra/connection');
const strings = require('../utils/strings');
const {doQuery, transformKeys} = require('../utils/queries');

class Questions {
    getQuestions = (resp, params) => {
        let sql = `SELECT ${strings.questionAvgColumns} FROM questions WHERE `;
        // if (params.hasOwnProperty('session')) {
        //     sql =`SELECT ${strings.questionColumns} 
        //           FROM questions INNER JOIN assessments 
        //           WHERE assessments.session in (${params['session']}) AND 
        //           assessments.id = questions.assessment_id AND ` 
        //     delete params['session'];
        // }
        sql = transformKeys(params, sql, 'questions')
        sql = `${sql} group by questions.assessment_id`
        doQuery(connection, sql, resp);
    }

    getGroupByQuestion = (resp, params) => {
        let sql =`SELECT ${strings.questionAvgColumns} FROM questions WHERE `
        sql = transformKeys(params, sql, 'questions')
        sql = sql.concat(' GROUP BY questions.id')
        doQuery(connection, sql, resp);
    }
}

module.exports = Questions;