const app = require('./config/custom-express');
const connection = require('./infra/connection');
const Tables = require('./infra/tables');

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    } else {
        const tables = new Tables();
        tables.init(connection);
        tables.createTables();
        app.listen(3333, () => {
            console.log('running server at 3333')
        });
    }
});


