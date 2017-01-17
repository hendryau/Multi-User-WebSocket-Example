import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RootComponent} from "./components/root.component";
import {DataComponent} from "./components/data.component";
import {WebSocketService} from "./services/web-socket.service";

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule],
    declarations: [RootComponent, DataComponent],
    providers: [WebSocketService],
    bootstrap: [RootComponent]
})
export class MultiUserWsExmplModule { }