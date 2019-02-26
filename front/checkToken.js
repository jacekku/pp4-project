window.addEventListener('load',async ()=>{
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if(!token){
        window.location.href='..'
        return false
    }
    if(!await checkToken(user, token)){
        window.location.href='..'
        return false
    }
})