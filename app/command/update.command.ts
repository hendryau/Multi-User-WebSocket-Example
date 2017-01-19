import {Command} from "./command";
import {Data} from "../model/data";

export class UpdateCommand implements Command {

    public static UPDATE: string = "UPDATE";

    constructor(public data: Data) { }

    public cmdType: string = UpdateCommand.UPDATE;

    public execute(dataArr: Data[]) {
        var dataInstance = dataArr.find(d => d.id === this.data.id);
        for (let k in this.data) {
            if (k === "id") {
                continue;
            }
            dataInstance[k] = this.data[k];
        }
    }

}
