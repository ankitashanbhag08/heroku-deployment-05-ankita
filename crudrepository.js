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
    
    
    
    close: (callback)=>{
        connection.end(()=>{
            console.log("Closing db")
            callback();
        })
    }
}

module.exports = connectionFunctions