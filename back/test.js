const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();

function getComments(request, response){
    let out=[]
    
    client.query('SELECT * from comments;', (err, result) => {
        if (err) throw err;
        response.status(200).json(result.rows)
      });
    
}
module.exports.getComments = getComments;