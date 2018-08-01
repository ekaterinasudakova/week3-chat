'use strict';

console.log('Hello World from app.js! \nChange this message, and make sure it changes in the browser \nto verify that you\'re working in the right files.');

//user types, presses send, message appears
//user types, presses send, get message from field, send message to server, message appears
//user types, presses send, get message from field, send message to server, message appears


var showMessagesOnDom = function showMessagesOnDom(messages) {
    console.log('messages: ', messages);

    var messagesUl = document.querySelector('ul.messages');
    messagesUl.innerHTML = '';

    while (messagesUl.children.length) {
        messagesUl.removeChild(messagesUl.children[0]);
    }

    messages.forEach(function (message) {
        var newMessage = document.createElement('li');
        var newTime = document.createElement('p');
        newTime.innerText = moment().format('MMM Do, h:mm:ss a');
        newMessage.innerText = message.text;
        newMessage.appendChild(newTime);
        messagesUl.appendChild(newMessage);
    });
};

var sendMessage = function sendMessage() {
    var field = document.querySelector('input[name="new-message"]');
    if (field.value) {
        console.log('send to server', field.value);

        axios.post('http://localhost:1337/message', {
            text: field.value
        }).then(function (response) {
            console.log('your message went through');
            //we put it in here so it (emptying the field) only happens upon successful submission
            field.value = '';
            console.log("server responded", response);
            showMessagesOnDom(response.data);
        }).catch(function (error) {
            console.log('there was a problem sending your message');
        });
    }
};
document.querySelector('button.send').addEventListener("click", sendMessage);

window.setInterval(function () {
    console.log("page gets checked for new msgs");
    window.onload = function () {
        axios.get('http://localhost:1337/message', {}).then(function (response) {
            console.log('response data from get function', response.data);
        }).catch(function (error) {
            console.log('error with your axios get');
        });
    };
}, 60 * 1000);
//# sourceMappingURL=main.js.map
