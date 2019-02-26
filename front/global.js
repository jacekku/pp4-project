async function alreadyRegistered(nick) {
    let res = await fetch(`https://pp4-project.herokuapp.com/user/${nick}`)
    let js
    await res.json().then(r => js = r)
    if (js.length > 0) return true
    if (res.status == 500) console.error("internal server error")
    return false
}
async function checkToken(nickname, token) {
    if (token == null) {
        return false
    }
    let t = await fetch('https://pp4-project.herokuapp.com/token', {
        method:"POST",
        headers: {
            "Authorize": btoa(JSON.stringify({
                "nickname": nickname,
                "token": token
            }))
        }
    })
    if(t.status==200 || t.status==201){
        let newToken
        await t.json().then(r=>newToken=r.token)
        localStorage.setItem('token', newToken)
        localStorage.setItem('user', nickname)
        return true    
    }
    return false
}