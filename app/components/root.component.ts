import {Component, OnInit} from "@angular/core";

@Component({
    selector: "root",
    template: `
        <button [disabled]="!channelOpen" (click)="ping()">ping server</button>
        {{lastMsg || 'Server has not said anything yet.'}}
    `
})
export class RootComponent implements OnInit {

    private channelOpen: boolean = false;

    private lastMsg: string;

    private channel: WebSocket;

    public ngOnInit(): void {
        this.channel = new WebSocket("ws://localhost:4080");

        this.channel.onopen = () => {
            console.log("Opened WebSocket channel with server.");
        };
        this.channel.onerror = (err) => {
            console.log("Something went wrong...", err.message);
        };
        this.channel.onmessage = (msgEvt: MessageEvent): any => {
            this.lastMsg = msgEvt.data;

            if (!this.channelOpen) {
                this.channel.send("Root component has loaded!");

                this.channelOpen = true;

                return;
            }
        };
    }

    private ping(): void {
        this.channel.send("Pinging you :)");
    }

}