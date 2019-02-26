window.addEventListener('load', () => {
    greet = document.getElementById('greet')
    greet.innerHTML += `${localStorage.getItem('user')}!`
    var textarea = document.getElementById('new-message')
    textarea.value=''
    textarea.addEventListener('keyup',e=>{
        if(e.keyCode==13){
            if(textarea.value!=""){
                let textVal=textarea.value
                    .trim()
                    .replace("\n$","")
                newMessage(textVal)
            }
            textarea.value=''
        }
    })
    var messages_div = document.getElementById('messages')
})



function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

async function getMessages(id=-1) {
    let out
    await fetch(`https://pp4-project.herokuapp.com/messages/${id}`)
        .then(res => {
            res.json().then(r=>out=r)
        }).catch(err => {
            console.info(err)
        })
    return out
}

async function newMessage(message) {
    await fetch('https://pp4-project.herokuapp.com/postmessage', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorize": btoa(JSON.stringify({
                "token": localStorage.getItem('token'),
            })),
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            'nickname': localStorage.getItem('user'),
            'text': message
        })
    }).then(response => {
        console.info(response)
    }).catch(response => {
        console.info(response)
    })
}