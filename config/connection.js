var mysql = require("mysql");

var connection = mysql.createConnection(
    process.env.JAWSDB_URL || {
        host: process.env.MYSQL_HOST || "l7cup2om0gngra77.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
        port: process.env.MYSQL_PORT || 3306,
        user: process.env.MYSQL_USER || "flwggm2f0cyn1sob",
        password: process.env.MYSQL_SECRET || "uv2yc7rowoz02hoh",
        database: process.env.MYSQL_DB || "hk9e06vgypastvk8"
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
