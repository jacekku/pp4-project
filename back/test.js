const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

exports.getComments=()=>{
    let out=[]
    client.connect();
    client.query('SELECT * from comments;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
          out.push(JSON.stringify(row));
        }
        client.end();
      });
    return out;
}