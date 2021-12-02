import * as http from "http";
import * as https from "https";
import * as fs from "fs";
import WebSocket from "ws";
import WSCommander from "./WSCommander";

class DuelingBots {
    
    private readonly http_server: http.Server;
    private readonly ws_server: WebSocket.Server;
    
    private readonly ws_commander: WSCommander;
    
    constructor() {
        
        this.ws_commander = new WSCommander();
        
        this.http_server = https.createServer({
            cert: fs.readFileSync("./ssl/cert.pem"),
            key: fs.readFileSync("./ssl/key.pem"),
            minVersion: "TLSv1.2",
            maxVersion: "TLSv1.3",
        });
        
        this.ws_server = new WebSocket.Server({
            server: this.http_server,
        });
        
        this.ws_server.on("connection", (socket, request) => {
            this.ws_commander.onConnection(socket, request);
        });
        
        this.http_server.listen(443);
    }
    
}

new DuelingBots();
