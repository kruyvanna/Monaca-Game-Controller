window.monaca = window.monaca || {};

(function() {
        
    var HttpServer = function(rootDirectory, port){
        this.rootDirectory = rootDirectory || "www/";
        this.port = port || 3000;
    };        
    
    HttpServer.prototype.checkCordova = function(){
        if(!cordova){
            throw new Error("Cordova is not loaded! Please include cordova.js");            
        }
    }
            
    HttpServer.prototype.start = function(success, failure){              
        var self = this;
        this.checkCordova();
        var errorCallback = function(error) {
            this.runCallback(failure, error);
        }
        
        cordova.exec(
            function(message) {                
                self.runCallback(success, message);
        	}, 
    		function(error) {
    			self.runCallback(failure, error);
    		}, 
    		"HttpServer",
            "start", 
            [self.rootDirectory, {port: self.port}]
        );
                
    };
    
    HttpServer.prototype.runCallback = function(callback, param){
        if(callback){
            callback(param);
        }  
    };
    
    HttpServer.prototype.stop = function(success, failure){
        var self = this;
        cordova.exec(
    	function(message) {
			self.runCallback(success, message);
		}, 
		function(error) {
			self.runCallback(failure, error);
		}, 
		"HttpServer",
        "stop", []);
    };
        
    
    HttpServer.prototype.getAddress = function(success, failure){
        var self = this;
        cordova.exec(
            function(message) {
                self.runCallback(success, message);
      		},
      		function(error) {
      			self.runCallback(failure, error);
      		},
      		"HttpServer",
           "getAddress", []
        );
    };
    
    HttpServer.prototype.getRootDirectoryAbsolutePath = function(success, failure){
        var self = this;
        cordova.exec(
            function(serverRootPath) {
                self.runCallback(success, serverRootPath);
          	},
      		function(error) {
      			self.runCallback(failure, error);
      		},
      		"HttpServer",
           "getRootDirectoryAbsolutePath", []
        );
    };
    
     HttpServer.prototype.getStatus = function(success, failure){
        var self = this;
        cordova.exec(
            function(serverRootPath) {
                self.runCallback(success, serverRootPath);
              },
      		function(error) {
      			self.runCallback(failure, error);
      		},
      		"HttpServer",
           "getStatus", []
        );
    };
    
    monaca.HttpServer = HttpServer;
            
})();


