
window.addEventListener('load',onLoad)
function validate(e){
    
    e.preventDefault()
    console.log(e)
    const name=e.target[0].value
    const msg=e.target[1].value
    console.log(JSON.stringify({name,msg}))
    fetch('https://pp4-project.herokuapp.com/postmessage',{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name,msg})
    }).then(response=>{
        console.log(response.json())
    }).catch(response=>{
        console.log(response)
    })
    console.log("gere")
    return true
}

function onLoad(){
form=document.getElementById("new-message")
//getButton=document.getElementById("get")
chatBox=document.getElementById("chat-box")
form.addEventListener('submit',validate)
//getButton.addEventListener('click',getComments)
getComments()

}
function getComments(){
    fetch("https://pp4-project.herokuapp.com/postgres",{
    })
        .then((res)=>{
            res.json().then((json)=>{
                const j=json
                fillChatBox(j)
            })
        })
}

function fillChatBox(texts){
    for(message of texts){
        chatBox.appendChild(getDiv(message))
    }
}
function getDiv(message){
    const {comment_user,comment_text,created_on}=message
    const d=new Date(created_on).toLocaleTimeString()
    const text=`<font color="grey">${d}#</font><font color="red">${comment_user}</font>: ${comment_text}`
    const div=document.createElement("div")
    div.innerHTML=text
    return div
}