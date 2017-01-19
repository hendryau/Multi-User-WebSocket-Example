import {Command} from "./command";
import {Data} from "../model/data";

export class DeleteCommand implements Command {

    public static DELETE: string = "DELETE";

    constructor(public data: Data) { }

    public cmdType: string = DeleteCommand.DELETE;

    public execute(dataArr: Data[]) {
        var dataInstance = dataArr.find(d => d.id === this.data.id );
        dataArr.splice(dataArr.indexOf(dataInstance), 1);
    }

}
