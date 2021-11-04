const mysql = require('mysql');
module.exports = () => {
  const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
  };

  return mysql.createConnection(config);
}