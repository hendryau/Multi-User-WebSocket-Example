import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {SERVER_CONFIG} from "../server.config";

@Injectable()
export class WebSocketService {

    private static socket: WebSocket = new WebSocket("ws://" + SERVER_CONFIG.domain + ":" + SERVER_CONFIG.port);

    private static onOpenObs: Observable<MessageEvent> = Observable.fromEvent(WebSocketService.socket, "open");

    private static onMessageObs: Observable<MessageEvent> = Observable.fromEvent(WebSocketService.socket, "message");

    public onMessage(): Observable<MessageEvent> {
        return WebSocketService.onMessageObs;
    }

    public onOpen(): Observable<MessageEvent> {
        return WebSocketService.onOpenObs;
    }

    public send(msg: string): void {
        WebSocketService.socket.send(msg);
    }

}
