let textarea, messages_div, last_message
window.addEventListener('load', () => {
    greet = document.getElementById('greet')
    greet.innerHTML += `${localStorage.getItem('user')}!`
    textarea = document.getElementById('new-message')
    textarea.value = ''
    textarea.addEventListener('keyup', e => {
        if (e.keyCode == 13) {
            if (textarea.value != "") {
                let textVal = textarea.value
                    .trim()
                    .replace("\n$", "")
                newMessage(textVal)
            }
            textarea.value = ''
        }
    })
    messages_div = document.getElementById('messages')
    handleMessages()
    setInterval(handleMessages, 2500)
})



function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}

async function getMessages(id = -1) {
    let out
    await fetch(`https://pp4-project.herokuapp.com/messages/${id}`)
        .then(res => {
            res.json().then(r => out = r)
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
        // console.info(response)
    }).catch(response => {
        console.info(response)
    })
    handleMessages()
}


function getDiv(message_obj) {
    const {
        nickname,
        message_date,
        message_text,
        rank_color
    } = message_obj
    console.log(message_obj)
    const formated_date = new Date(message_date).toLocaleString()
    const div = document.createElement('div')
    div.innerHTML =
        `<div class='message'>
    <font color='#aaa'>(${formated_date})</font><font color='${rank_color}'>${nickname}</font>:${sanitize(message_text)}
    </div>`
    return div
}

function appendMessages(messages) {
    messages.forEach(msg => messages_div.appendChild(getDiv(msg)))
    
}
async function handleMessages() {
    const messages = await getMessages(last_message)||[]
    if (messages.length>0) {
        last_message = messages[messages.length - 1].message_id || -1
        // localStorage.setItem('last_message_id',last_message)
        appendMessages(messages)
        messages_div.scrollBy(0,last_message*100)
    }
}