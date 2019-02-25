window.addEventListener('load',()=>{
    if(!localStorage.getItem('token')){console.log("no token")}
    else{
        window.location+='front/chat.html'
    }
})