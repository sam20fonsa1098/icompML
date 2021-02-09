const connection = require('../infra/connection');
const {doQuery, transformKeys} = require('../utils/queries');

class Users {
    getUsers = (resp, params) => {
        let sql = `SELECT * FROM users`;
        if (params) {
            sql = transformKeys(params, sql.concat(' WHERE '), 'users')
        }
        doQuery(connection, sql, resp);
    }
}

module.exports = Users;