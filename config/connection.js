var mysql = require("mysql");

var connection = mysql.createConnection(
    process.env.JAWSDB_URL || {
        host: process.env.MYSQL_HOST || "localhost",
        port: process.env.MYSQL_PORT || 8889,
        user: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_SECRET || "root",
        database: process.env.MYSQL_DB || "burgers_db"
    }
);

connection.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});

module.exports = connection;
