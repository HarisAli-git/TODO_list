const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'todos_list',
    password: '123456',
    port: 5432
});

module.exports = pool;