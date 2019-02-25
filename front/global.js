async function alreadyRegistered(nick) {
    let res = await fetch(`https://pp4-project.herokuapp.com/user/${nick}`)
    let js
    await res.json().then(r => js = r)
    if (js.length > 0) return true
    if (res.status == 500) console.error("internal server error")
    return false
}
async function getSessionToken(nickname, token, justRegistered) {
    if (token == null && !justRegistered) {
        return false
    }
    let t = await fetch('https://pp4-project.herokuapp.com/token', {
        headers: {
            "Authorize": btoa(JSON.stringify({
                "nickname": nickname,
                "token": token
            }))
        }
    })
    console.log(t)
}