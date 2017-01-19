import {Command} from "./command";
import {Data} from "../model/data";

export class CreateCommand implements Command {

    public static CREATE: string = "CREATE";

    constructor(public data: Data) { }

    public cmdType: string = CreateCommand.CREATE;

    public execute(dataArr: Data[]): void {
        dataArr.push(this.data);
    }

}
