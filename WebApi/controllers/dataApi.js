var mysql = require('mysql');
var config = require('./config');

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});

let allServices = {
    query: function (sql, values) {

        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    reject(err)
                } else {
                    connection.query(sql, values, (err, rows) => {

                        if (err) {
                            reject(err)
                        } else {
                            resolve(rows)
                        }
                        connection.release()
                    })
                }
            })
        })

    },
    getproduct:function(dq,type){
        let _sql=`select name from yxb where dq="${dq}" and type="${type}";`
        return allServices.query(_sql)
    },
   getData: function (dq,name,unit) {
        let _sql = `select * from ${unit} where dq="${dq}" and name="${name}";`
        return allServices.query(_sql)
    },
    getAll:function(dq){
        let _sql=`select name from yxb where dq="${dq}";`
        return allServices.query(_sql)
    }
}

module.exports = allServices;