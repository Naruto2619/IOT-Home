var cors = require("cors");
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var cors = require('cors');
app.use(cors());
app.use(express.static(__dirname));
app.get("/",(req,res)=>{
    res.sendFile('client.html',{root:__dirname})
});
SerialPort = require('serialport');
sp = new SerialPort('COM9', {
    baudRate: 115200
}),
arduinoMessage="";
sendMessage = function(buffer, socket) {
    arduinoMessage += buffer.toString();
    if (arduinoMessage.indexOf('\r') >= 0) {
      socket.volatile.emit('notification', arduinoMessage);
      arduinoMessage = '';
    }
};
io.on('connection',function(socket){
    sp.on('data', function(data) {
        sendMessage(data, socket);
    });
    socket.on('lightstatus',function(lightstatus){
        sp.write(lightstatus + '\r', function() {
            console.log('the light should be: ' + lightstatus);
        });
    })
});
sp.on('error', function(err) {
    console.error('error', err);
  });
server.listen(process.env.PORT||3000);
console.log('yep its working');