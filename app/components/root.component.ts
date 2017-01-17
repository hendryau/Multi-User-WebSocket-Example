import {Component} from "@angular/core";
import {Data, CreateCmd, GetAllCmd, CmdUtil, Command} from "../command";
import {WebSocketService} from "../services/web-socket.service";

@Component({
    selector: "root",
    template: `
        <button (click)="createData()">New</button>
        <data *ngFor="let data of dataArr" [data]="data"></data>
    `
})
export class RootComponent {

    private dataArr: Data[] = [];

    constructor(private webSocketService: WebSocketService) {
        this.webSocketService.onMessage().subscribe((msgEvt: MessageEvent) => {
            let cmdJson: any = JSON.parse(msgEvt.data);
            let cmd: Command = CmdUtil.fromJson(cmdJson);
            cmd.execute(this.dataArr);
        });

        this.webSocketService.onOpen().subscribe(
            () => this.webSocketService.send(JSON.stringify(new GetAllCmd(this.dataArr)))
        );
    }

    private createData(): void {
        let data: any = {
            name: "New Data",
            id: -1
        };

        this.webSocketService.send(JSON.stringify(new CreateCmd(data)));
    }

}