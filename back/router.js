const {
  Client
} = require('pg');
const passwordManage = require('./handlePasswords')

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
  response.status(501)
}
function register(request,response){
  const data = request.headers.authorize
  const text = Buffer.from(data, 'base64').toString('ascii')
  const {nickname,passwordUnhashed} = JSON.parse(text)
  const {password,salt} = passwordManage.saltHashPassword(passwordUnhashed)
  client.query(`INSERT INTO users (nickname,password,salt) VALUES ('${nickname}','${password}','${salt}')`,
    (err, result) => {
      if (err)throw err
    });
    response.status(201)
  }
function getNickname(request,response){
  const nickname = request.params.nickname
  client.query(`SELECT nickname FROM users where nickname = '${nickname}'`,
    (err, result) => {
      if (err) throw err;
      response.status(200).json(result.rows)
    });
}

module.exports = {
  getMessages,
  postMessage,
  register,
  getNickname
};

