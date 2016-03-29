var dbconf = JSON.parse(F.config.database);
var mysql = require('mysql');
var DAL = require('../DAL/dal.js');

// console.log(DAL.user);

DAL.pool = mysql.createPool({
    host            : dbconf.host,
    user            : dbconf.user,
    password        : dbconf.pwd,
    database        : dbconf.db,
    connectionLimit : 100
});

DAL.pool.on('connection', function (connection) {
  console.log('[POOL] : connected as id ' + connection.threadId);

});

F.database = function (callback) {
    return DAL.pool.getConnection(callback);
};

F.DAL = DAL;
