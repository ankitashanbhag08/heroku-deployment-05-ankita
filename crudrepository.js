require('dotenv').config()
const mysql = require('mysql')

var connection = mysql.createConnection({ 
 connectionLimit : 10,
 host: process.env.DB_HOST,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_DB,
 multipleStatements: false
});

const fieldNames=["latitude", "longitude"]

let connectionFunctions = {
    connect:(callback)=>{
        connection.connect((err)=>{
            callback();
        });
    },
    findAll:(filters)=>{
        let sql='SELECT * FROM locations '
        
        return new Promise((resolve, reject)=>{
                connection.query(sql, (err, results)=>{
                err ? reject(err) : resolve(results)
            })
        })
        
    },
    
    save:(latitude, longitude)=>{
        function innerAsync(resolve, reject){
            const sql = "INSERT INTO locations (latitude, longitude) VALUES (?, ?)"
            connection.query(sql, [latitude, longitude], (err, result)=>{
                err ? reject(err) : resolve(result.insertId)
            })
        }
        return new Promise(innerAsync);
    },
    
    close: (callback)=>{
        connection.end(()=>{
            console.log("Closing db")
            callback();
        })
    }
}

module.exports = connectionFunctions