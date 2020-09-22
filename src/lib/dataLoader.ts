import * as path from "path";
import * as fs from "fs";
import { app } from "electron";

import { YatsugiGroup } from "./yatsugiGroup";
import { YatsugiTool } from "./yatsugiTool";

export class DataLoader<T extends YatsugiGroup | YatsugiTool> {
    kind: "group" | "tool";

    constructor(kind: "group" | "tool") {
        this.kind = kind;
    }

    async loadAllAsync() {
        if (this.jsonFileExists()) {
            const dataPath = this.getDataPath();
            try {
                if (fs.existsSync(dataPath)) {
                    const listJson = fs.readFileSync(dataPath, { encoding: "utf-8" });
                    let list = JSON.parse(listJson) as T[];

                    if (this.isGroup()) {
                        list = list.map(val => new YatsugiGroup(val as YatsugiGroup)) as T[];
                        return list;
                        }
                        else {
                            list = list.map(val => new YatsugiTool(val as YatsugiTool)) as T[];
                            return list;
                        }
                    }
                    else {
                        return [] as T[];
                    }
                }
            catch (err) {
                throw err;
            }
        }
        else {
            if (this.isGroup()) {
                return await YatsugiGroup.loadAllAsync() as T[];
            }
            else {
                return await YatsugiTool.loadAllAsync() as T[];
            }
        }
    }

    saveAllAsync(list: T[]) {
        return new Promise<void>((resolve, reject) => {
            const dataPath = this.getDataPath();
            try {
                fs.writeFileSync(dataPath, JSON.stringify(list), { encoding: "utf-8" });
                resolve();
            }
            catch (err) {
                reject(err);
            }
        });
    }

    jsonFileExists() {
        return fs.existsSync(this.getDataPath());
    }

    private isGroup() {
        return this.kind == "group";
    }

    private getDataPath() {
        return path.join(app.getPath("appData"), "yatsugi", this.isGroup() ? "groups.json" : "tools.json");
    }
}

export const groupLoader = new DataLoader<YatsugiGroup>("group");
export const toolLoader = new DataLoader<YatsugiTool>("tool");
