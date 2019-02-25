// type in password and nickname
// check if registered
// if registered
//      and valid login
//          
document.addEventListener('load', onload)

function onload(e) {
    form = document.getElementById('login-form')
    form.addEventListener('submit',val)
    console.log(form)
}
function val(e){
    e.preventDefault()
    const nickname = e.target[0].value
    const password = e.target[1].value
    console.log(nickname,password)
    // login(nickname,password)
}



function login(nick,pass) {
    fetch(`https://pp4-project.herokuapp.com/login`, {
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