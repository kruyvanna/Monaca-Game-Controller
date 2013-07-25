Application = function(){};
Application.prototype = new EventDispatcher();

window.App = new Application();

window.addEventListener("load", loadFastClick, false);
function loadFastClick() {
    new FastClick(document.body);
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {    
    App.httpServer.start();
    App.webSocketServer.start();
}

App.on('httpServer:started', function(response){    
    var serverAddress = response.ip + ":" + response.port;    
    $('#http-server-status').html(serverAddress);
});

App.on('websocket_server:started', function(response){    
    var serverAddress = response.ip + ":" + response.port;    
    $('#websocket-server-status').html(serverAddress);
    refreshClients();
});

App.on('client:connected', function(){
    refreshClients();
});

App.on('jump:clicked', function(){
    App.webSocketServer.sendMessageToClients('jump'); 
});

function refreshClients(){
    App.webSocketServer.getClients(function(clients){
        $('#clients-status').html(clients.length);
    },
    errorHandler);
}
