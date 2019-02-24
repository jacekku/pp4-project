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
    console.log(request.headers.authorize)
    let data=request.headers.authorize 
    let text = Buffer.from(data, 'base64').toString('ascii')
    console.log(text)
    response.status(200)
}

module.exports = {
  getMessages,
  postMessage
};