import {Pool} from 'pg'

const pool = new Pool({
    user: 'uti',
    password: 'uti',
    host: '127.0.0.1',
    database: 'uti',
    port: 5432,
});

const query = (sql, params) => pool.query(sql, params);

export {query}