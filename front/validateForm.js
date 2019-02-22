let form,getButton
window.addEventListener('load',onLoad)
function validate(e){
    e.preventDefault()
    console.log(e)
    return false
}
function onLoad(){
let form=document.getElementById("new-message")
let getButton=document.getElementById("get")
form.addEventListener('submit',validate)
getButton.addEventListener('click',getComments)
}
function getComments(){
    fetch("https://pp4-project.herokuapp.com/postgres",{
        
    })
        .then((res)=>{
            console.log(res)
        })
}