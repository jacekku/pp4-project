window.addEventListener('load', onLoad)

function onLoad() {
    form = document.getElementById('register-form')
    form.addEventListener('submit', validate)
    feedback = document.getElementById('feedback')
}

function validate(e) {
    e.preventDefault()
    const nickname = e.target[0].value
    //unhashedPassword
    const password1 = e.target[1].value
    const password2 = e.target[2].value
    console.log(nickname, password1, password2)
    feedback.innerHTML = ""
    if (isEmpty(nickname, password1, password2)) {
        feedback.innerHTML = "fill the fields"
        return false
    }
    alreadyRegistered(nickname).then(res=>{
        //if registered
        feedback.innerHTML = "already used nickname"
        return false
    }).catch(err=>{
        //if not registered do nothing
        if(!err){}
        else {
            console.error(err)
            feedback.innerHTML = "server error"
            return false
        }
    })
    const passStatus = checkPassword(password1, password2)
    if (passStatus == "diff") {
        feedback.innerHTML = "passwords need to be the same"
        return false
    }
    if (passStatus == "short") {
        feedback.innerHTML = "password need to have at least 8 characters"
        return false
    }
    if (passStatus == "missing") {
        feedback.innerHTML = "password need to contain at least one number,letter(uppercase),letter(lowercase),special character"
        return false
    }

    register(nickname, password1)
    // window.location.href = 'http://127.0.0.1:5500'
    return true
}

function alreadyRegistered(nick) {
    return new Promise((resolve,reject)=>{
    fetch(`https://pp4-project.herokuapp.com/user/${nick}`)
        .then(response => {
            if(response.status == 200){
                return resolve(true)
            }
            if(response.status == 404){
                return resolve(false)
            }
        }).catch(response => {
            console.log(response)
            return reject("error")
        })
    })
}

function isEmpty(nickname, password1, password2) {
    return nickname.length == 0 ||
        password1.length == 0 ||
        password2.length == 0
}

function checkPassword(pass1, pass2) {
    if (pass1 != pass2) return "diff"
    if (pass1.length < 10) return "short"
    let pattern = "^["
    pattern += "0-9"
    pattern += "a-z"
    pattern += "A-Z"
    pattern += "!@#$%^&*]"
    pattern += "{10,}&"
    const re = new RegExp(pattern)
    return re.test(pass1)
}

function register(nick, pass) {
    fetch('https://pp4-project.herokuapp.com/register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorize": btoa(JSON.stringify({
                "nickname": nick,
                "passwordUnhashed": pass
            })),
            "Access-Control-Allow-Origin": "*"
        },
    }).then(response => {
        console.log(response.json())
    }).catch(response => {
        console.log(response)
    })
    return true
}