window.App.webSocketServer = {};
var PORT = 3001;
    
var socketServer = new monaca.WebSocketServer(PORT);

socketServer.onClientConnected = function(client){
    App.trigger('client:connected', client);
};

socketServer.onClientDisconnected = function(client){
    App.trigger('client:disconnected', client);
};

socketServer.onerror = function(error){
    echo(error);  
};

App.webSocketServer.start = function(){
    socketServer.start(
        function(response){
            App.trigger('websocket_server:started', response);
        },
        echo
    );
}            
  
App.webSocketServer.getClients = function(success, failure){
    socketServer.getClients(                
        success,
        failure
    );              
}

App.webSocketServer.sendMessageToClients = function(message){        
    socketServer.sendToAllClients(
        message,
    	echo,
        echo
    );
}