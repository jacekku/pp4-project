const {
  Client
} = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
client.connect();

function getMessages(request, response) {
  client.query('SELECT * from comments order by created_on asc;', (err, result) => {
    if (err) throw err;
    response.status(200).json(result.rows)
  });

}
function postMessage(request,response){
    const { name, msg } = request.body

    client.query(`INSERT INTO comments (comment_user, comment_text) VALUES ('${name.trim()}','${msg.trim()}')`, (error, results) => {
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