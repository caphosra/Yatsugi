import * as path from "path";
import * as fs from "fs";
import { app } from "electron";

import { YatsugiSettings } from "./yatsugiSettings";
import { YatsugiGroup } from "./yatsugiGroup";
import { YatsugiTool } from "./yatsugiTool";

export class DataLoader<T extends YatsugiGroup | YatsugiTool> {
    kind: "group" | "tool";

    constructor(kind: "group" | "tool") {
        this.kind = kind;
    }

    async loadAllAsync() {
        if (fs.existsSync(this.getDataPath())) {
            const dataPath = this.getDataPath();
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
            if (this.isGroup()) {
                return await YatsugiGroup.loadAllAsync() as T[];
            }
            else {
                return await YatsugiTool.loadAllAsync() as T[];
            }
        }
    }

    async saveAllAsync(list: T[]) {
        const dataPath = this.getDataPath();
        fs.writeFileSync(dataPath, JSON.stringify(list), { encoding: "utf-8" });
    }

    private isGroup() {
        return this.kind == "group";
    }

    private getDataPath() {
        return path.join(app.getPath("appData"), "yatsugi", this.isGroup() ? "groups.json" : "tools.json");
    }
}

export class SettingsLoader {
    async loadAsync() {
        const dataPath = this.getDataPath();
        if (fs.existsSync(dataPath)) {
            const json = fs.readFileSync(dataPath, { encoding: "utf-8" });
            const settings = JSON.parse(json) as YatsugiSettings;
            return settings;
        }
        else {
            return new YatsugiSettings({
                lendingLimit: [1, 1, 1, 1, 1, 1]
            });
        }
    }

    async saveAsync(settings: YatsugiSettings) {
        const dataPath = this.getDataPath();
        fs.writeFileSync(dataPath, JSON.stringify(settings), { encoding: "utf-8" });
    }

    private getDataPath() {
        return path.join(app.getPath("appData"), "yatsugi", "settings.json");
    }
}

export const groupLoader = new DataLoader<YatsugiGroup>("group");
export const toolLoader = new DataLoader<YatsugiTool>("tool");
export const settingLoader = new SettingsLoader();
