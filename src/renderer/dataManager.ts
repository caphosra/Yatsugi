import { ipcRenderer } from "electron";

import { YatsugiGroup } from "../lib/yatsugiGroup";
import { YatsugiTool } from "../lib/yatsugiTool";

export class DataManager<T extends YatsugiGroup | YatsugiTool> {
    private data: T[] | undefined;

    gets() {
        if (this.data) {
            return this.data;
        }
        else {
            const item = ipcRenderer.sendSync(`database-get-all-${this.getText()}s`) as T[];
            return item.map((val) => this.convertFromJson(val));
        }
    }

    add(item: T) {
        return new Promise<void>((resolve, reject) => {
            ipcRenderer.send(`database-add-${this.getText()}`, item);
            ipcRenderer.on(`database-add-${this.getText()}-reply`, (e, succeeded) => {
                if (succeeded && this.data) {
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
            ipcRenderer.send(`database-delete-${this.getText()}`, itemID);
            ipcRenderer.on(`database-delete-${this.getText()}-reply`, (e, succeeded) => {
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
        if (item instanceof YatsugiGroup) {
            return new YatsugiGroup(item as YatsugiGroup) as T;
        }
        else if (item instanceof YatsugiTool) {
            return new YatsugiTool(item as YatsugiTool) as T;
        }
        else {
            throw "Unknown type detected.";
        }
    }

    private getText() {
        switch (typeof({} as T)) {
            case typeof(YatsugiGroup): {
                return "group";
            }
            case typeof(YatsugiTool): {
                return "tool";
            }
            default: {
                throw "Unknown type detected.";
            }
        }
    }
}
