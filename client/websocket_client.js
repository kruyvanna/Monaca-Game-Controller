var host = window.location.hostname;
var port = 3001;
var serverAddress = host + ":" + port;
console.log('serverAddress:' + serverAddress);

var websocket = new WebSocket("ws:" + serverAddress);

websocket.onmessage = function(message){
    console.log('onmessage: ', message);
    if(message.data === "jump"){
        stage.click();
    }   
};

websocket.onerror = function(message){
    console.log('onerror: ' + message);   
}

websocket.onopen = function(message){
    console.log('onopen', message);   
}