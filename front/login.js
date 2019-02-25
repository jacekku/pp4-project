  
window.addEventListener('load', onload)

function onload() {
    form = document.getElementById('login-form')
    form.addEventListener('submit',val)
    feedback=document.getElementById('feedback')
}
async function val(e){
    e.preventDefault()
    const nickname = e.target[0].value
    const password = e.target[1].value
    let reg = await alreadyRegistered(nickname)
    if(reg){await login(nickname,password)}
    else {feedback.innerHTML='wrong user or password'}
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
        console.info(response)
    }).catch(response => {
        console.info(response)
    })
    return true
}