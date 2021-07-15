var socket = io("http://localhost:3000");
var button = $("button");
var text = $("#butt");
onSocketNotification = function(data) {
    console.log(data);
    text.text()==="off"?text.text("on"):text.text("off");
    socket.emit('lightStatus', text.text());
};
togglelight = function(){
    text.text()==="off"?text.text("on"):text.text("off");
    socket.emit('lightstatus',text.text());
}
button.on('click',togglelight);