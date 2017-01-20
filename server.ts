import {CommandUtil} from "./app/command/command-util";
import {Command} from "./app/command/command";
import {CreateCommand} from "./app/command/create.command";
import {Data} from "./app/model/data";
import {MOCKED_DATA} from "./app/model/mocked-data";
import {SERVER_CONFIG} from "./app/server.config";

class WebSocketServerWrapper {

    constructor() {
        let server = require("http").createServer(),
            WebSocketServer = require("ws").Server,
            express = require("express"),
            app = express(),
            port = SERVER_CONFIG.port;

        this.initWss(new WebSocketServer({server: server}));

        app.use(express.static(__dirname));
        server.on("request", app);
        server.listen(port, () => console.log("Listening on", server.address().port + "..."));
    }

    private sockets: any[] = [];

    private dataArr: Data[] = MOCKED_DATA;

    private idCounter: number = this.dataArr.length;

    private initWss(wss: any): void {
        wss.on("connection", (ws: any) => {
            console.log("Socket opened.", this.sockets.length+1, "WebSockets open.");
            this.initSocket(ws);
        });
    }

    private initSocket(ws: any): void {
        this.sockets.push(ws);

        ws.on("close", () => {
            console.log("Socket closed.", this.sockets.length-1, "WebSockets open.");
            this.sockets.splice(this.sockets.indexOf(ws), 1);
        });

        ws.on("message", (msg: any) => {
            console.log(msg);

            let cmdJson: any = JSON.parse(msg);

            let cmd: Command = CommandUtil.fromJson(cmdJson);

            if (cmd.cmdType === CreateCommand.CREATE) {
                cmd.data.id = this.idCounter++;
            }

            cmd.execute(this.dataArr);

            this.sockets.forEach(socket => {
                socket.send(JSON.stringify(cmd));
            });
        });

        this.dataArr.forEach(d => {
            ws.send(JSON.stringify(new CreateCommand(d)))
        });
    }

}

(() => new WebSocketServerWrapper())();
