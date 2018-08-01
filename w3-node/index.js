const colors = require('colors')
console.log('running index.js')

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
//for cross-domain ajax
app.use(cors())
//for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

let messages = [];

app.get('/', function(req, res){
    res.send('Hello World!')
})

app.post('/message', function(req, res){
    console.log(req.body.text)
    
    messages.push({
        text: req.body.text,
        username: "",
        timestamp: new Date().getTime()
    })

    res.send(messages)
})
app.listen(1337, function(){
    console.log('Example app listening on port 1337!')
})