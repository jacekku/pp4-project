window.addEventListener('load',onLoad)
function validate(e){
    e.preventDefault()
    console.log(e)
    const nickname=e.target[0].value
    //unhashedPassword
    const password=e.target[1].value
    console.log(nickname,password)
    if(nickname.length==0 || password.length==0){
        return false
    }
    console.log("here")

    fetch('https://pp4-project.herokuapp.com/postmessage',{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorize":btoa(JSON.stringify({"nick":nickname,"pass":password})),
            "Access-Control-Allow-Origin":"*"
        },
    }).then(response=>{
        console.log(response.json())
    }).catch(response=>{
        console.log(response)
        })
    
    return true
}
function clearChatBox(){
    chatBox.innerHTML=""
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
function onSignIn(googleUser) {
    console.log("logged in")
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }



function refreshChatBox(){
    clearChatBox()
    getComments()
}
function onLoad(){
    form= document.getElementById('login-form')
form.addEventListener('submit',validate)
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