const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "", // empty because no password set
    host: "localhost",
    port: "",
    database: "portfolio",  
});

module.exports = pool;  


