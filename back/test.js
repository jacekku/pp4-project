const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

async function getComments(){
    let out=[]
    client.connect();
    await client.query('SELECT * from comments;', (err, res) => {
        if (err) throw err;
        for (let row of res.rows) {
            console.log(JSON.stringify(row))
            out.push(JSON.stringify(row));
        }
        client.end();
      });
      console.log(out)
    return out;
}
module.exports.getComments = getComments;