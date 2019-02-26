window.addEventListener('load',async()=>{
    if(!localStorage.getItem('token')){console.log("no token")}
    else{
        token = localStorage.getItem('token')
        user = localStorage.getItem('user')
        console.log(user,token)
        if(await checkToken(user,token)){window.location.href='./front/chat.html'}
    }
})