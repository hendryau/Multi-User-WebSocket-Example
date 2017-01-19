import {Component} from "@angular/core";
import {Command} from "../command/command";
import {CommandUtil} from "../command/command-util";
import {CreateCommand} from "../command/create.command";
import {Data} from "../model/data";
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
            let cmd: Command = CommandUtil.fromJson(cmdJson);
            cmd.execute(this.dataArr);
        });
    }

    private createData(): void {
        this.webSocketService.send(JSON.stringify(new CreateCommand({ id: null })));
    }

}
