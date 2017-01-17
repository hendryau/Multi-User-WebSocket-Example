import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";


@Injectable()
export class WebSocketService {

    private static socket: WebSocket = new WebSocket("ws://192.168.1.68:4080");

    private static onOpenObs: Observable<any> = Observable.fromEvent(WebSocketService.socket, "open");

    private static onMessageObs: Observable<any> = Observable.fromEvent(WebSocketService.socket, "message");

    public onMessage(): Observable<MessageEvent> {
        return WebSocketService.onMessageObs;
    }

    public onOpen(): Observable<any> {
        return WebSocketService.onOpenObs;
    }

    public send(msg: string): void {
        WebSocketService.socket.send(msg);
    }

}


