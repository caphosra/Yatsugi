import * as path from "path";
import * as fs from "fs";
import glob from "glob";
import { app } from "electron";

import { ToolRecord } from "./toolRecords"

export class YatsugiTool {
    id: string;
    name: string;
    records: ToolRecord[];

    constructor(item: { id: string, name: string, records: ToolRecord[] }) {
        this.id = item.id;
        this.name = item.name;
        this.records = item.records;
    }

    getGroup() {
        for (const record of this.records) {
            if (record.isLent()) {
                return record.groupID;
            }
        }
        return null;
    }

    static getDataFilePath(tool: YatsugiTool) {
        const dataFolder = app.getPath("appData");
        return path.join(dataFolder, "yatsugi", `tool-${tool.id}.csv`);
    }

    //
    // Data structure of YatsugiTool CSV follows the rule:
    //
    // id,name
    // startTime1,endTime1
    // startTime2,endTime2
    // startTime3,endTime3
    // ...
    //
    // Note that endTime(n) can be "null" when it is "undefined".
    //
    static parseToTool(content: string) {
        const contents = content.split("\n");

        const firstLine = contents[0].split(",");
        const id = firstLine[0];
        const name = firstLine[1];

        const records = contents.slice(1)
            .map((val) => {
                const startTime = new Date(val.split(",")[0]);
                const endTime = val.split(",")[1] != "null"
                    ? new Date(val.split(",")[1])
                    : undefined;
                const groupID = val.split(",")[2];
                return new ToolRecord(startTime, endTime, groupID);
            });
        return new YatsugiTool({ id: id, name: name, records: records });
    }

    static parseToString(tool: YatsugiTool) {
        let text = `${tool.id},${tool.name}`;
        for (const record of tool.records) {
            text += `\n${record.startTime},${record.endTime ? record.endTime : "null"},${record.groupID}`
        }
        return text;
    }

    static loadAllAsync() {
        return new Promise<YatsugiTool[]>((resolve, reject) => {
            glob(path.join(app.getPath("appData"), "yatsugi", "tool-*.csv"), (err, files) => {
                if (err) {
                    reject(err);
                }
                else {
                    let tools: YatsugiTool[] = [];
                    for (const file of files) {
                        try {
                            const content = fs.readFileSync(file, "utf-8");
                            const tool = this.parseToTool(content);
                            tools.push(tool);
                        }
                        catch (err) {
                            reject(err);
                        }
                    }
                    resolve(tools);
                }
            });
        });
    }

    static saveAllAsync(tools: YatsugiTool[]) {
        return new Promise<void>((resolve, reject) => {
            try {
                const files = glob.sync(path.join(app.getPath("appData"), "yatsugi", "tool-*.csv"));
                for (const file of files) {
                    fs.unlinkSync(file);
                }
                for (const tool of tools) {
                    const dataFilePath = this.getDataFilePath(tool);
                    const dataString = this.parseToString(tool);
                    fs.writeFileSync(dataFilePath, dataString);
                }
            }
            catch (err) {
                reject(err);
            }
            resolve();
        });
    }
}
