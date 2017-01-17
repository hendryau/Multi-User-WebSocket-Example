import {Data, CmdUtil, MOCKED_DATA, Command, CreateCmd} from "./app/command";

class WebSocketServerWrapper {

    constructor() {
        let server = require("http").createServer(),
            WebSocketServer = require("ws").Server,
            express = require("express"),
            app = express(),
            port = 4080;

        this.initWss(new WebSocketServer({server: server, perMessageDeflate: true}));

        app.use(express.static(__dirname));
        server.on("request", app);
        server.listen(port, () => console.log("Listening on " + server.address().port + "..."));
    }

    private sockets: any[] = [];

    private dataArr: Data[] = MOCKED_DATA;

    private idCounter: number = this.dataArr.length - 1;

    private initWss(wss: any): void {
        wss.on("connection", (ws: any) => {
            console.log("Socket opened.", this.sockets.length+1, "open WebSockets.");
            this.initSocket(ws);
        });
    }

    private initSocket(ws: any): void {
        this.sockets.push(ws);

        ws.on("close", () => {
            console.log("Socket closed.", this.sockets.length, "open WebSockets.");
            this.sockets.splice(this.sockets.indexOf(ws), 1);
        });

        ws.on("message", (msg: any) => {
            console.log(msg);

            let cmdJson: any = JSON.parse(msg);

            let cmd: Command = CmdUtil.fromJson(cmdJson);

            if (cmd.cmdType === "GET_ALL") {
               this.dataArr.forEach(d => {
                   ws.send(JSON.stringify(new CreateCmd(d)))
               });
               return;
            }

            if (cmd.cmdType === "CREATE") {
                cmd.data.id = this.idCounter++;
            }

            cmd.execute(this.dataArr);

            this.sockets.forEach(socket => {
                socket.send(JSON.stringify(cmd));
            });
        });
    }

}

(() => new WebSocketServerWrapper())();
