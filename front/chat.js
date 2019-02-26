window.addEventListener('load', () => {
    greet = document.getElementById('greet')
    greet.innerHTML += `${localStorage.getItem('user')}!`

    messages_div = document.getElementById('messages')
})

function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}
function getMessages(){
    fetch('https://pp4-project.herokuapp.com/messages')
        .then(res=>{
            res.json().then(console.log)
        })
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