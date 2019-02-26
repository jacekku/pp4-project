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

function postMessage(request, response) {
  const {nickname,text} = request.body
  const data = request.headers.authorize
  const obj = Buffer.from(data, 'base64').toString('ascii')
  const {
    token
  } = JSON.parse(obj)
  console.log(nickname,text)
  client.query(`SELECT user_id FROM users where nickname = '${nickname}' and token = '${token}'`,(err,res)=>{
    if (err) {
      response.sendStatus(500)
      console.error(err)
    }
    console.log(res.rows)
    const id=res.rows.user_id
    client.query(`INSERT INTO messages (user_id,message_text) VALUES (${id},'${text}')`,(err,res)=>{
      if (err) {
        response.sendStatus(500)
        console.error(err)
      }
      response.sendStatus(201)
    })
  })
  
}

function register(request, response) {
  const data = request.headers.authorize
  const text = Buffer.from(data, 'base64').toString('ascii')
  const {
    nickname,
    passwordUnhashed
  } = JSON.parse(text)
  const {
    password,
    salt
  } = passwordManage.saltHashPassword(passwordUnhashed)
  const newToken = passwordManage.generateToken()
  client.query(`INSERT INTO users (nickname,password,salt,token) VALUES ('${nickname}','${password}','${salt}','${newToken}')`,
    (err, result) => {
      if (err) {
        response.sendStatus(500)
        console.error(err)
        return false
      }
      response.status(201).json({
        'token': newToken
      })
    });
}

function getNickname(request, response) {
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

function checkLogin(request, response) {
  const data = request.headers.authorize
  const text = Buffer.from(data, 'base64').toString('ascii')
  const {
    nickname,
    passwordUnhashed
  } = JSON.parse(text)
  client.query(`SELECT password,salt FROM users where nickname = '${nickname}'`,
    (err, result) => {
      if (err) {
        response.sendStatus(500)
        console.error(err)
      }
      const {
        password,
        salt
      } = result.rows[0]
      res = passwordManage.checkPassword(passwordUnhashed, password, salt)
      if (res) {
        const newToken = passwordManage.generateToken()
        client.query(`UPDATE users SET token = '${newToken}' WHERE nickname = '${nickname}'`, (err, res) => {
          if (err) {
            response.sendStatus(500)
            console.error(err)
          }
          response.status(200).json({
            'token': newToken
          })
        })
      } else {
        response.sendStatus(401)
      }
    })
}

function getToken(request, response) {
  const data = request.headers.authorize
  const text = Buffer.from(data, 'base64').toString('ascii')
  const {
    nickname,
    token
  } = JSON.parse(text)
  client.query(`SELECT token FROM users where nickname = '${nickname}' and token = '${token}'`, (err, result) => {
    if (err) {
      response.sendStatus(500)
      console.error(err)
    } else {
      if (result.rows.length == 0) {
        response.sendStatus(401)
      } else {
        const newToken = passwordManage.generateToken()
        client.query(`UPDATE users SET token = '${newToken}' WHERE token = '${token}'`, (err, res) => {
          if (err) {
            response.sendStatus(500)
            console.error(err)
          }
          response.status(200).json({
            'token': newToken
          })
        })
      }
    }
  })
}
module.exports = {
  getMessages,
  postMessage,
  register,
  getNickname,
  checkLogin,
  getToken
};