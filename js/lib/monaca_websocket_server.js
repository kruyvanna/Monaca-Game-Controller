window.monaca = window.monaca || {};

(function() {
        
    var WebSocketServer = function(port){
        this.port = port || 3001;
    };
        
    WebSocketServer.prototype.runCallback = function(callback, param){
        if(callback){
            callback(param);
        }  
    };
    
    WebSocketServer.prototype.checkCordova = function(){
        if(!cordova){
            throw new Error("Cordova is not loaded! Please include cordova.js");            
        }
    }
    
    WebSocketServer.prototype.startServerSuccessCallback = function(response){
        console.log('server start callback ' + JSON.stringify(response));
        
        if(response.event === "connected"){
            var clientId = response.client;
            if(this.onClientConnected){
                this.onClientConnected(response);
            }
        }
        
        if(response.event === "disconnected"){
            var clientId = response.client;
            if(this.onClientDisconnected){
                this.onClientDisconnected(response);
            }
        }
        
        if(response.event === 'message'){
            if(this.onmessage){
                this.onmessage(response);
            }
        }
    }
        
    WebSocketServer.prototype.start = function(success, failure){              
        var self = this;
        this.checkCordova();
        var errorCallback = function(error) {
            this.runCallback(failure, error);
        }
        cordova.exec( 
            function(response){
                if(response.event === 'server:started'){
                    success(response);
                }else{
                    self.startServerSuccessCallback.call(self, response);
                }
            },            
            errorCallback, 
    		"WebSocketServer",
            "start", 
            [{port: this.port}]
        );
    };
    
    
    WebSocketServer.prototype.stop = function(success, failure){
        var self = this;
        cordova.exec(
        	function(message) {
    			self.runCallback(success, message);
    		}, 
    		function(error) {
    			self.runCallback(failure, error);
    		}, 
    		"WebSocketServer",
            "stop", []
        );
    };
    
     WebSocketServer.prototype.stop = function(success, failure){
        var self = this;
        cordova.exec(
            function(message) {
    			self.runCallback(success, message);
    		}, 
    		function(error) {
    			self.runCallback(failure, error);
    		}, 
    		"WebSocketServer",
            "stop", []
        );
    };
    
    WebSocketServer.prototype.send = function(client, message, success, failure){
        var self = this;
        
        var options = {
            "clientId": client,
            "message": message
        }
        
        cordova.exec(
            function() {
        		self.runCallback(success);
        	}, 
        	function(error) {
        		self.runCallback(failure, error);
        	}, 
        	"WebSocketServer",
            "send", [options]
        );
        
    };
    
    WebSocketServer.prototype.sendToAllClients = function(message, success, failure){
        var self = this;
        
        var options = {
            "message": message
        }
        
        cordova.exec(
            function(response) {
            	self.runCallback(success, response);
        	}, 
        	function(error) {
        		self.runCallback(failure, error);
        	}, 
        	"WebSocketServer",
            "sendToAllClients", [options]
        );
        
    };
    
    WebSocketServer.prototype.getClients = function(success, failure){
        var self = this;        
        cordova.exec(
            function(clients) {
    		    self.runCallback(success, clients);	                
    		}, 
    		function(error) {
    			self.runCallback(failure, error);
    		},
    		"WebSocketServer",
            "getClients", []
        );                  
    };
    
    WebSocketServer.prototype.getAddress = function(success, failure){
        var self = this;
        cordova.exec(
            function(message) {
                self.runCallback(success, message);
      		},
      		function(error) {
      			self.runCallback(failure, error);
      		},
      		"WebSocketServer",
           "getAddress", []
        );
    };
    
    WebSocketServer.prototype.getStatus = function(success, failure){
        var self = this;
        cordova.exec(
            function(serverRootPath) {
                self.runCallback(success, serverRootPath);
              },
          	function(error) {
      			self.runCallback(failure, error);
      		},
      		"WebSocketServer",
           "getStatus", []
        );
    };
    
    monaca.WebSocketServer = WebSocketServer;
            
})();


