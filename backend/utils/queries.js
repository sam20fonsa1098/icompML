const doQuery = (connection, sql, resp) => {
    connection.query(sql, (err, results) => {
        if (err) {
            resp.status(400).json(err);
        } else {
            resp.status(200).json(results)
        }
    })
}

const transformKeys = (params, sql, table) => {
    for (let key in params) {
        sql = sql.concat(`${table}.${key}=${params[key]} AND `)
    }
    sql = sql.substr(0, sql.length - 5);
    return sql;
}

module.exports = {doQuery, transformKeys};
