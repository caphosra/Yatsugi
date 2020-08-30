import { ipcRenderer } from "electron";
import { YatsugiGroup } from "../lib/yatsugiGroup";
import { YatsugiTool } from "../lib/yatsugiTool";

export class DataClient {
    private groups: YatsugiGroup[] | undefined;
    private tools: YatsugiTool[] | undefined;

    mapGroup = <T>(action: ((group :YatsugiGroup) => T)) => {
        return this.getGroups().map(action);
    };

    mapTool = <T>(action: ((tool :YatsugiTool) => T)) => {
        return this.getTools().map(action);
    };

    getGroups = () => {
        if (!this.groups) {
            this.groups = DataClient.getAllGroups();
            return this.groups;
        }
        else {
            return this.groups;
        }
    };

    getTools = () => {
        if (!this.tools) {
            this.tools = DataClient.getAllTools();
            return this.tools;
        }
        else {
            return this.tools;
        }
    };

    //
    // Send to database-load
    //
    static loadDatabase() {
        return new Promise<void>((resolve, reject) => {
            ipcRenderer.send("database-load");
            ipcRenderer.on("database-load-reply", (e, succeeded) => {
                if (succeeded) {
                    resolve();
                }
                else {
                    reject();
                }
            });
        });
    }

    //
    // Send to database-save
    //
    static saveDatabase() {
        return new Promise<void>((resolve, reject) => {
            ipcRenderer.send("database-save");
            ipcRenderer.on("database-save-reply", (e, succeeded) => {
                if (succeeded) {
                    resolve();
                }
                else {
                    reject();
                }
            });
        });
    }

    //
    // Send to database-check-group
    //
    static checkGroup(id: string) {
        const group = ipcRenderer.sendSync("database-check-group", id);
        return group as YatsugiGroup | null;
    }

    //
    // Send to database-check-tool
    //
    static checkTool(id: string) {
        const tool = ipcRenderer.sendSync("database-check-tool", id);
        return tool as YatsugiTool | null;
    }

    //
    // Send to database-find-groups
    //
    static findGroups(text: string) {
        const groups = ipcRenderer.sendSync("database-find-groups", text);
        return groups as YatsugiGroup[];
    }

    //
    // Send to database-find-tools
    //
    static findTools(text: string) {
        const tools = ipcRenderer.sendSync("database-find-tools", text);
        return tools as YatsugiGroup[];
    }

    //
    // Send to database-add-group
    //
    static addGroup(group: YatsugiGroup) {
        return new Promise<void>((resolve, reject) => {
            ipcRenderer.send("database-add-group", group);
            ipcRenderer.on("database-add-group-reply", (e, succeeded) => {
                if (succeeded) {
                    resolve();
                }
                else {
                    reject();
                }
            });
        });
    }

    //
    // Send to database-add-tool
    //
    static addTool(tool: YatsugiTool) {
        return new Promise<void>((resolve, reject) => {
            ipcRenderer.send("database-add-tool", tool);
            ipcRenderer.on("database-add-tool-reply", (e, succeeded) => {
                if (succeeded) {
                    resolve();
                }
                else {
                    reject();
                }
            });
        });
    }

    //
    // Send to database-delete-group
    //
    static deleteGroup(id: string) {
        return new Promise<void>((resolve, reject) => {
            ipcRenderer.send("database-delete-group", id);
            ipcRenderer.on("database-delete-group-reply", (e, succeeded) => {
                if (succeeded) {
                    resolve();
                }
                else {
                    reject();
                }
            });
        });
    }

    //
    // Send to database-delete-tool
    //
    static deleteTool(id: string) {
        return new Promise<void>((resolve, reject) => {
            ipcRenderer.send("database-delete-tool", id);
            ipcRenderer.on("database-delete-tool-reply", (e, succeeded) => {
                if (succeeded) {
                    resolve();
                }
                else {
                    reject();
                }
            });
        });
    }

    //
    // Send to database-get-all-groups
    //
    static getAllGroups() {
        const groups = ipcRenderer.sendSync("database-get-all-groups") as YatsugiGroup[];
        return groups.map((group) => new YatsugiGroup(group));
    }

    //
    // Send to database-get-all-tools
    //
    static getAllTools() {
        const tools = ipcRenderer.sendSync("database-get-all-tools");
        return tools as YatsugiTool[];
    }
}
