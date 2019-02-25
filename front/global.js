async function alreadyRegistered(nick) {
    let res=await fetch(`https://pp4-project.herokuapp.com/user/${nick}`)
    let js
    await res.json().then(r=>js=r)
    if(js.length>0)return true
    if(res.status==500)console.error("internal server error")
    return false
}