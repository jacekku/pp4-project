  window.addEventListener('load', onload)

  function onload() {
      form = document.getElementById('login-form')
      form.addEventListener('submit', val)
      feedback = document.getElementById('feedback')
  }
  async function val(e) {
      e.preventDefault()
      const nickname = e.target[0].value
      const password = e.target[1].value
      let reg = await alreadyRegistered(nickname)
      if (reg) {
          let loggedIn = await login(nickname, password)
          if (loggedIn) {
              feedback.innerHTML = "<font color='green'>Logged in</font>"

          } else {
              feedback.innerHTML = "<font color='red'>Wrong user or password</font>"
          }
      } else {
          feedback.innerHTML = "<font color='red'>Wrong user or password</font>"
      }
  }


  async function login(nick, pass) {
      let f = await fetch(`https://pp4-project.herokuapp.com/login`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
              "Authorize": btoa(JSON.stringify({
                  "nickname": nick,
                  "passwordUnhashed": pass
              })),
              "Access-Control-Allow-Origin": "*"
          },
      })
      if (f.status == 200) {
          let token
          await f.json().then(r => console.log(r))
          console.log(`login token: ${token}`)
          localStorage.setItem('token', token)
          localStorage.setItem('user', nick)
          return true
      }
      return false
  }