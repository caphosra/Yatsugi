export class ToolRecord {
    startTime: Date = new Date();
    endTime: Date | undefined = undefined;
    groupID: string = "";

    constructor(item: { startTime: Date, endTime: Date | undefined, groupID: string }) {
        this.startTime = item.startTime;
        this.endTime = item.endTime;
        this.groupID = item.groupID;
    }

    isLent() {
        return !this.endTime;
    }
}
