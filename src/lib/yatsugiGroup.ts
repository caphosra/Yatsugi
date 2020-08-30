import * as path from "path";
import * as fs from "fs";
import { app } from "electron";

import { YatsugiTool } from "./yatsugiTool";

export class YatsugiGroup {
    id: string;
    name: string;

    constructor(item: { id: string, name: string}) {
        this.id = item.id;
        this.name = item.name;
    }

    getLentToolCount(tools: YatsugiTool[]) {
        let counter = 0;
        for (const tool of tools) {
            if (this.id == tool.getGroup()) {
                counter++;
            }
        }
        return counter;
    }

    static getDataFilePath() {
        const dataFolder = app.getPath("appData");
        return path.join(dataFolder, "yatsugi", "group.csv");
    }

    //
    // Data structure of YatsugiGroups CSV follows the rule:
    //
    // id1,name1
    // id2,name2
    // id3,name3
    // ...
    //
    static parseToGroups(content: string) {
        if (content == "") {
            return [];
        }
        else {
            return content.split("\n")
                .map((val) => {
                    const contents = val.split(",");
                    return new YatsugiGroup({ id: contents[0], name: contents[1] });
                });
        }
    }

    static parseToString(groups: YatsugiGroup[]) {
        return groups.map((group) => {
            return `${group.id},${group.name}`;
        }).join("\n");
    }

    static loadAllAsync() {
        return new Promise<YatsugiGroup[]>((resolve, reject) => {
            const dataFilePath = this.getDataFilePath();

            if (fs.existsSync(dataFilePath)) {
                fs.readFile(dataFilePath, "utf-8", (err, file) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        const groups = this.parseToGroups(file)
                        resolve(groups);
                    }
                });
            }
            else {
                resolve([]);
            }
        });
    }

    static saveAllAsync(groups: YatsugiGroup[]) {
        return new Promise<void>((resolve, reject) => {
            const dataFilePath = this.getDataFilePath();
            const dataString = this.parseToString(groups);

            console.log(`Start to save to ${dataFilePath}`);

            fs.writeFile(dataFilePath, dataString, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
