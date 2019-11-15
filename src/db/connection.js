const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'uti',
    password: 'uti',
    host: '127.0.0.1',
    database: 'uti',
    port: 5432,
});

const query = (sql, params) => pool.query(sql, params);
export {query}

/*
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('../../db.db', err => {
    if(err) return console.log(err);
    console.log("Connected to Database");
});

export {
    db
}

*/
