console.log(`Hello World from app.js! 
Change this message, and make sure it changes in the browser 
to verify that you're working in the right files.`)

//user types, presses send, message appears
//user types, presses send, get message from field, send message to server, message appears
//user types, presses send, get message from field, send message to server, message appears


let showMessagesOnDom = function(messages){
    console.log('messages: ', messages)

    let messagesUl = document.querySelector(`ul.messages`);
    messagesUl.innerHTML = '';

    while(messagesUl.children.length){
        messagesUl.removeChild(messagesUl.children[0])
    }

    messages.forEach(function(message){
        let newMessage = document.createElement(`li`);
        let newTime = document.createElement('p');
        newTime.innerText = moment().format('MMM Do, h:mm:ss a');
        newMessage.innerText = message.text;
        newMessage.appendChild(newTime);
        messagesUl.appendChild(newMessage);
    })
}



let sendMessage = function(){
    let field = document.querySelector(`input[name="new-message"]`);
    if (field.value){
        console.log(`send to server`, field.value);

        axios
            .post('http://localhost:1337/message', {
                text: field.value
            })
            .then(function(response){
                console.log(`your message went through`)
                //we put it in here so it (emptying the field) only happens upon successful submission
                field.value = '';
                console.log("server responded", response)
                showMessagesOnDom(response.data)
            })
            .catch(function(error){
                console.log(`there was a problem sending your message`)
            })
    }
}
document.querySelector('button.send').addEventListener("click", sendMessage);

window.setInterval(function(){
    console.log("page gets checked for new msgs");
    window.onload = function(){
        axios
            .get('http://localhost:1337/message',{
            })
            .then(function (response) {
                console.log('response data from get function', response.data);
              })
              .catch(function (error) {
                console.log('error with your axios get');
              });
            }
}, 60*1000);