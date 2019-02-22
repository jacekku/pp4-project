const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

function getComments(request, response){
    let out=[]
    client.connect();
    client.query('SELECT * from comments;', (err, result) => {
        if (err) throw err;
        response.status(200).json(result.rows)
        client.end();
      });
    
}
module.exports.getComments = getComments;