const connection = require('../infra/connection');
const { doQuery, transformKeys } = require('../utils/queries');
const { predictionsColumns } = require('../utils/strings');

class Predictions {
    getPredictions = (resp, params) => {
        let sql = `SELECT ${predictionsColumns} FROM predictions WHERE `;
        sql = transformKeys(params, sql, 'predictions')
        doQuery(connection, sql, resp);
    }
}

module.exports = Predictions;