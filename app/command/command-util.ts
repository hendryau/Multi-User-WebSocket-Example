import {Command} from "./command";
import {CreateCommand} from "./create.command";
import {DeleteCommand} from "./delete.command";
import {UpdateCommand} from "./update.command";

import {Data} from "../model/data";

export class CommandUtil {

    public static fromJson(json: { cmdType: string, data: Data}): Command {
        switch(json.cmdType) {
            case (CreateCommand.CREATE):
                return new CreateCommand(json.data)
            case (DeleteCommand.DELETE):
                return new DeleteCommand(json.data);
            case (UpdateCommand.UPDATE):
                return new UpdateCommand(json.data);
            default:
                throw new Error("Unknown command type " + json.cmdType + ".");
        }
    }

}
