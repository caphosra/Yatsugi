export class ToolRecord {
    startTime: number = 0;
    endTime: number | undefined = undefined;
    groupID: string = "";

    constructor(item: { startTime: number, endTime: number | undefined, groupID: string }) {
        this.startTime = item.startTime;
        this.endTime = item.endTime;
        this.groupID = item.groupID;
    }

    isLent() {
        return !this.endTime;
    }
}
