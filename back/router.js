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
    if (err) {
      response.sendStatus(500)
      console.error(err)
    }
    response.status(200).json(result.rows)
  });

}
function postMessage(request,response){
  response.sendStatus(501)
}
function register(request,response){
  const data = request.headers.authorize
  const text = Buffer.from(data, 'base64').toString('ascii')
  const {nickname,passwordUnhashed} = JSON.parse(text)
  const {password,salt} = passwordManage.saltHashPassword(passwordUnhashed)
  client.query(`INSERT INTO users (nickname,password,salt) VALUES ('${nickname}','${password}','${salt}')`,
    (err, result) => {
      if (err){
        response.sendStatus(500)
        console.error(err)
        return false
      }
      response.sendStatus(201)
    });
  }
function getNickname(request,response){
  const nickname = request.params.nickname
  client.query(`SELECT nickname FROM users where nickname = '${nickname}'`,
    (err, result) => {
      if (err) {
        response.sendStatus(500)
        console.error(err)
        return false
      }
      response.status(200).json(result.rows)
    });
}

function checkLogin(request,response){
  const data = request.headers.authorize
  const text = Buffer.from(data, 'base64').toString('ascii')
  const {nickname,passwordUnhashed} = JSON.parse(text)
  client.query(`SELECT password,salt FROM users where nickname = '${nickname}'`,
  (err,result)=>{
    if (err) {
      response.sendStatus(500)
      console.error(err)
    }
    const {password,salt}=result.rows[0]
    res = passwordManage.checkPassword(passwordUnhashed,password,salt)
    if(res){
      response.sendStatus(200)
    }else{
      response.sendStatus(401)
    }
  })
}

module.exports = {
  getMessages,
  postMessage,
  register,
  getNickname,
  checkLogin
};

