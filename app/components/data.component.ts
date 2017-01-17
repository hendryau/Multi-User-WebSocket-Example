import {Component, Input, OnChanges} from "@angular/core";
import {Data, DeleteCmd, UpdateCmd} from "../command";
import {WebSocketService} from "../services/web-socket.service";

@Component({
    selector: "data",
    template: `
        <div *ngFor="let k of dataKeys">
            <label>{{k}}:</label>
            <input type="text" [(ngModel)]="data[k]" (ngModelChange)="updateData()">
        </div>
        
        <button (click)="deleteData()">Delete</button>
        
        <form (ngSubmit)="addField()">
            <input name="newField" type="text" [(ngModel)]="newField" required pattern="^[a-zA-Z]+$">
            <button type="submit">Add Field</button>
        </form>
    `
})
export class DataComponent implements OnChanges {

    constructor(private webSocketService: WebSocketService) { }

    @Input() private data: Data;

    private dataKeys: string[] = [];

    private newField: string;

    public ngOnChanges(): void {
        Object.keys(this.data).forEach(k => {
           if (k !== "id") this.dataKeys.push(k);
        });
    }

    private deleteData(): void {
        this.webSocketService.send(JSON.stringify(new DeleteCmd(this.data)));
    }

    private updateData(): void {
        this.webSocketService.send(JSON.stringify(new UpdateCmd(this.data)));
    }

    private addField(): void {
        this.data[this.newField] = "";
        this.newField = "";
        this.updateData();
    }

}