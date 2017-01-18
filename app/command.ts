export interface Command {
    data: any
    cmdType: string
    execute: (dataArr: Data[]) => void
}

export class CreateCmd implements Command {

    constructor(public data: Data) { }

    public cmdType: string = "CREATE";

    public execute(dataArr: Data[]): void {
        dataArr.push(this.data);
    }

}

export class DeleteCmd implements Command {

    constructor(public data: Data) { }

    public cmdType: string = "DELETE";

    public execute(dataArr: Data[]) {
        var dataInstance = dataArr.find(d => d.id === this.data.id );
        dataArr.splice(dataArr.indexOf(dataInstance), 1);
    }

}

export class UpdateCmd implements Command {

    constructor(public data: Data) { }

    public cmdType: string = "UPDATE";

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

export class CmdUtil {

    public static fromJson(json: { cmdType: string, data: any}): Command {
        switch(json.cmdType) {
            case ("CREATE"):
                return new CreateCmd(json.data)
            case ("DELETE"):
                return new DeleteCmd(json.data);
            case ("UPDATE"):
                return new UpdateCmd(json.data);
            default:
                throw new Error("Unknown command type " + json.cmdType + ".");
        }
    }

}

export interface Data {
    id: number
}

export let MOCKED_DATA = [
    {
        name: "Frodo Baggins",
        race: "Hobbit",
        other: "ring-bearer",
        id: 0,
    },
    {
        name: "Samwise Gamgee",
        race: "Hobbit",
        other: "eaves-dropper",
        id: 1
    },
    {
        name: "Meriadoc Brandybuck",
        race: "Hobbit",
        id: 2
    },
    {
        name: "Peregrin Took",
        race: "Hobbit",
        id: 3
    }
];