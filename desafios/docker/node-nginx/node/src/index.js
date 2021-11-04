const express = require('express');
const createConnection = require('./db');

const app = express();
const port = 3000;


function inserirPeople(cb) {
  
  const connection = createConnection();
  const sql = `INSERT INTO people(name) values ('Usuario ${Date.now()}')`;
  connection.query(sql, (err) => {
    cb();
  });
  
}

function consultarPeople(cb) {
  
  const connection = createConnection();
  const sql = `SELECT * FROM people`;
  connection.query(sql, (err, result) => {
    if(err) throw err;

    cb(result);
  });
  
}

app.get('/', (req, res) => {
  
  inserirPeople(() => {
    consultarPeople((peoples) => {
      console.log(peoples);
    
      return res.send(`
        <h1>Full Cycle Rocks!</h1>
        <ul>
          ${
            peoples.map(p => `<li>${p.id} - ${ p.name}</li>`).join('')
          }
        </ul>
      `);

      connection.end();
    })
  });
  

});

app.listen(port, () => {
  console.log('Rodando na porta '+port);
})
