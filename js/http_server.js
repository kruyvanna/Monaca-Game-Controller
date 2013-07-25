window.App.httpServer = {};

var PORT = 3000;
var ROOT_DIRECTORY = "www/client/"
    
var httpServer = new monaca.HttpServer(ROOT_DIRECTORY, PORT);

App.httpServer.start = function(){
    httpServer.start(function(response){
        App.trigger('httpServer:started', response);
    }, echo);
}    