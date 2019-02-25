window.addEventListener('load', onLoad)

function onLoad() {
    form = document.getElementById('register-form')
    form.addEventListener('submit', validate)
    feedback = document.getElementById('feedback')
}

async function validate(e) {
    e.preventDefault()
    const nickname = e.target[0].value
    //unhashedPassword
    const password1 = e.target[1].value
    const password2 = e.target[2].value
    feedback.innerHTML = ""
    if (isEmpty(nickname, password1, password2)) {
        feedback.innerHTML = "fill the fields"
        return false
    }
    let reg=await alreadyRegistered(nickname)
    if(reg){
        feedback.innerHTML = "already in db"
        return false
    }
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

    await register(nickname, password1)
    // window.location.href = 'http://127.0.0.1:5500'
    localStorage.setItem("user",nickname)
    return true
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

async function register(nick, pass) {
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
        console.info(response)
    }).catch(response => {
        console.info(response)
    })
    return true
}