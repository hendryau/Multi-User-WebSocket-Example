import {Data} from "../model/data";

export interface Command {
    data: Data
    cmdType: string
    execute: (dataArr: Data[]) => void
}
