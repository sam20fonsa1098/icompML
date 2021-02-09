const connection = require('../infra/connection');
const {doQuery, transformKeys} = require('../utils/queries');

class Classes {
    getClasses = (resp, params) => {
        let sql = `SELECT * FROM classes`;
        if (params) {
            sql = transformKeys(params, sql.concat(' WHERE '), 'classes')
        }
        doQuery(connection, sql, resp);
    }

    getClass = (resp, params) => {
        let sql =`SELECT * FROM classes WHERE `
        sql = transformKeys(params, sql, 'classes')
        doQuery(connection, sql, resp);
    }
}

module.exports = Classes;