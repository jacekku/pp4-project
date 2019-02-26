window.addEventListener('load',()=>{
    greet = document.getElementById('greet')
    greet.innerHTML+=`${localStorage.getItem('user')}!`
})


function logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}