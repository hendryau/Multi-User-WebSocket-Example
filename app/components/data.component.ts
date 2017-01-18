import {Component, Input} from "@angular/core";
import {Data, DeleteCmd, UpdateCmd} from "../command";
import {WebSocketService} from "../services/web-socket.service";

@Component({
    selector: "data",
    template: `
        <label>id: {{data.id}}</label>
        
        <form (ngSubmit)="addField()">
            <input name="newField" type="text" [(ngModel)]="newField" placeholder="field name">
            <button type="submit">Add Field</button>
        </form>
        
        <button (click)="deleteData()">Delete</button>
        
        <div *ngFor="let k of getDataKeys()">
            <label>{{k}}:</label>
            <input type="text" [(ngModel)]="data[k]" (ngModelChange)="updateData()">
        </div>
    `
})
export class DataComponent {

    constructor(private webSocketService: WebSocketService) { }

    @Input() private data: Data;

    private newField: string;

    public getDataKeys(): string[] {
        return Object.keys(this.data || {}).filter(k => k != "id");
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