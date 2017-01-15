(() => {
    var server = require("http").createServer(),
        WebSocketServer = require("ws").Server,
        wss = new WebSocketServer({server: server}),
        express = require("express"),
        app = express(),
        port = 4080;

    app.use(express.static(__dirname));

    let globalMsgCount: number = 0;

    wss.on("connection", (ws: any) => {
        let msgCount: number = 0;

        ws.on("message", (message: any) => {
            console.log("received: %s", message);

            let msg: string = "I've received " + msgCount++ + " messages from you. I've received " + globalMsgCount++ + " total messages." ;

            ws.send(msg);
        });

        ws.send("Hello, this channel is open.");
    });

    server.on("request", app);

    server.listen(port, () => console.log("Listening on " + server.address().port));
})();