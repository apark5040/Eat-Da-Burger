// var connection = require("../config/connection.js");

// var orm = {
//     selectAll: function(tableName){
//         var query = "SELECT * FROM ??";

//         connection.query(query, [tableName], function(err, results){
//             if(err) throw err;
//             console.log(results);
//             connection.end();
//         });

//     },

//     insertOne: function(tableName, column1, column2, value1, value2){
//         var query = "INSERT INTO ?? (??, ??) VALUES (?, ?)";

//         connection.query(query, [tableName, column1, column2, value1, value2], function(err, results){
//             if(err) throw err;
//             console.log("Inserted new data");
//         })

//     },
//     updateOne: function(tableName, columnName, value, id){
//         var query = "UPDATE ?? SET ?? = ? WHERE id = ?";

//         connection.query(query, [tableName, columnName, value, id], function(err, results){
//             if(err) throw err;
//             console.log("Updated data");
//         });

//     }

// };

// module.exports = orm;



var connection = require("../config/connection.js");


function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

// Object for all our SQL statement functions.
var orm = {
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },
  // An example of objColVals would be {name: panther, sleepy: true}
  update: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;