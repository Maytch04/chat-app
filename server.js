const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

connections = []


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

// app.get("*", function(req, res){
//     res.sendfile(__dirname + '/client/public/index.html')
// })

// app.get("/api", function(req, res){
//     res.json({
//         "foo":"bar"
//     })
// })

io.on('connection', function(socket){
    connections.push(socket)
    console.log('Connected:')
    console.log("%s users connected", connections.length)
    socket.on('addMessage', function(message){
        io.emit('newMessage', message)
    })
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1)
         console.log('Disconnected:')
        console.log("%s users connected", connections.length)
    })
})

 

server.listen(3001, function(){
    console.log('listening on port 3001')
})