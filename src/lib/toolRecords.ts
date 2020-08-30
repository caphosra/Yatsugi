export class ToolRecord {
    startTime: Date = new Date();
    endTime: Date | undefined = undefined;
    groupID: string = "";

    constructor(startTime: Date, endTime: Date | undefined, groupID: string) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.groupID = groupID;
    }

    isLent() {
        return !this.endTime;
    }
}
