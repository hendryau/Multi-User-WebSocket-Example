import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {MultiUserWsExmplModule} from "./multi-user-ws-exmpl.module";

platformBrowserDynamic().bootstrapModule(MultiUserWsExmplModule)
    .catch((err: any) => console.error(err));