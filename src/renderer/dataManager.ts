import { ipcRenderer } from "electron";

import { YatsugiGroup } from "../lib/yatsugiGroup";
import { YatsugiTool } from "../lib/yatsugiTool";

export class DataManager<T extends YatsugiGroup | YatsugiTool> {
    private data: T[] | undefined;
    private kind: "group" | "tool";

    constructor(kind: "group" | "tool") {
        this.kind = kind;
    }

    gets() {
        if (this.data) {
            return this.data;
        }
        else {
            const item = ipcRenderer.sendSync(`database-get-all-${this.kind}s`) as T[];
            this.data = item.map((val) => this.convertFromJson(val));
            return this.data;
        }
    }

    findByID(id: string): T | null {
        if (!this.data) {
            this.gets();
            return this.findByID(id);
        }
        else {
            for (const item of this.data) {
                if (item.id == id) {
                    return item;
                }
            }
            return null;
        }
    }

    add(item: T) {
        return new Promise<void>((resolve, reject) => {
            ipcRenderer.send(`database-add-${this.kind}`, item);
            ipcRenderer.on(`database-add-${this.kind}-reply`, (e, succeeded) => {
                if (succeeded && this.data) {
                    this.data = this.data.filter((val) => val.id != item.id);
                    this.data.push(item);
                    resolve();
                }
                else {
                    reject();
                }
            });
        });
    }

    delete(itemID: string) {
        return new Promise<void>((resolve, reject) => {
            ipcRenderer.send(`database-delete-${this.kind}`, itemID);
            ipcRenderer.on(`database-delete-${this.kind}-reply`, (e, succeeded) => {
                if (succeeded && this.data) {
                    this.data = this.data.filter((val) => val.id != itemID);
                    resolve();
                }
                else {
                    reject();
                }
            });
        });
    }

    private convertFromJson(item: T) {
        if (this.kind == "group") {
            return new YatsugiGroup(item as YatsugiGroup) as T;
        }
        else {
            return new YatsugiTool(item as YatsugiTool) as T;
        }
    }
}
