const {
  Client
} = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();

function getMessages(request, response) {
  client.query('SELECT * from comments;', (err, result) => {
    if (err) throw err;
    response.status(200).json(result.rows)
  });

}
function postMessage(request,response){
    const { name, msg } = request.body
    console.log(name,msg)
  
    client.query(`INSERT INTO comments (comment_user, comment_text) VALUES ('${name}','${msg}')`, (error, results) => {
      if (error) {
        throw error
      }
      console.log(results)
      response.status(201)
    })
  }

module.exports = {
  getMessages,
  postMessage
};