import { ipcMain } from "electron";

import { groupLoader, toolLoader } from "./lib/dataLoader";
import { ToolRecord } from "./lib/toolRecords";
import { YatsugiGroup } from "./lib/yatsugiGroup";
import { YatsugiTool } from "./lib/yatsugiTool";
import { YatsugiSettings } from "./lib/yatsugiSettings";
import { settingLoader } from "./lib/dataLoader";

let groups: YatsugiGroup[] = [];
let tools: YatsugiTool[] = [];

export function initDatabase() {
    groupLoader.loadAllAsync()
        .then((val) => {
            groups = val;
        })
        .catch((err) => {
            console.error(err);
        });

    toolLoader.loadAllAsync()
        .then((val) => {
            tools = val;
        })
        .catch((err) => {
            console.error(err);
        });

    //
    // Response on database-load
    //
    ipcMain.handle("database-load", async (e) => {
        try {
            groups = await groupLoader.loadAllAsync();
            tools = await toolLoader.loadAllAsync();
        }
        catch (err) {
            console.error(err);
        }
    });

    //
    // Response on database-save
    //
    ipcMain.handle("database-save", async (e) => {
        try {
            await groupLoader.saveAllAsync(groups);
            await toolLoader.saveAllAsync(tools);
        }
        catch (err) {
            console.error(err);
        }
    });

    //
    // Response on database-lending
    //
    ipcMain.handle("database-lending", (e) => {
        return tools.some((val) => new YatsugiTool(val).getGroup() != null);
    });

    //
    // Response on database-check-group
    //
    ipcMain.handle("database-check-group", (e, id: string) => {
        for (const group of groups) {
            if (group.id == id) {
                return group;
            }
        }
        return null;
    });

    //
    // Response on database-check-tool
    //
    ipcMain.handle("database-check-tool", (e, id) => {
        for (const tool of tools) {
            if (tool.id == id) {
                return tool;
            }
        }
        return null;
    });

    //
    // Response on database-find-groups
    //
    ipcMain.handle("database-find-groups", (e, text) => {
        return groups.filter((group) => {
            return group.name.includes(text);
        });
    });

    //
    // Response on database-find-tools
    //
    ipcMain.handle("database-find-tools", (e, text) => {
        return tools.filter((tool) => {
            return tool.name.includes(text);
        });
    });

    //
    // Response on database-add-group
    //
    ipcMain.handle("database-add-group", async (e, group) => {
        const groupInstance = group as YatsugiGroup;
        groups = groups.filter((val) => {
            return val.id != groupInstance.id;
        });
        groups.push(groupInstance);

        try {
            await groupLoader.saveAllAsync(groups);
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    });

    //
    // Response on database-add-tool
    //
    ipcMain.handle("database-add-tool", async (e, tool) => {
        const toolInstance = tool as YatsugiTool;
        tools = tools.filter((val) => {
            return val.id != toolInstance.id;
        });
        tools.push(toolInstance);

        try {
            await toolLoader.saveAllAsync(tools);
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    });

    //
    // Response on database-delete-group
    //
    ipcMain.handle("database-delete-group", async (e, id) => {
        groups = groups.filter((val) => {
            return val.id != id;
        });

        try {
            await groupLoader.saveAllAsync(groups);
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    });

    //
    // Response on database-delete-tool
    //
    ipcMain.handle("database-delete-tool", async (e, id) => {
        tools = tools.filter((val) => {
            return val.id != id;
        });

        try {
            await toolLoader.saveAllAsync(tools);
            return true;
        }
        catch (err) {
            console.error(err);
            return false;
        }
    });

    //
    // Response on database-lent-tool
    //
    ipcMain.handle("database-lent-tool", async (e, groupID, toolID) => {
        try {
            for (const tool of tools) {
                if (tool.id == toolID) {
                    tool.records.push(
                        new ToolRecord({
                            startTime: Date.now(),
                            endTime: undefined,
                            groupID: groupID
                        })
                    );

                    await toolLoader.saveAllAsync(tools);
                    return true;
                }
            }
            throw "No one is matched!";
        }
        catch (err) {
            console.error(err);
            return false;
        }
    });

    //
    // Response on database-return-tool
    //
    ipcMain.handle("database-return-tool", async (e, toolID) => {
        try {
            for (const tool of tools) {
                if (tool.id == toolID) {
                    tool.records = tool.records.map((record) => {
                        record.endTime = Date.now();
                        return record;
                    });

                    await toolLoader.saveAllAsync(tools)
                    return true;
                }
            }
        }
        catch (err) {
            console.error(err);
            return false;
        }
    });

    //
    // Response on database-get-all-groups
    //
    ipcMain.handle("database-get-all-groups", (e) => {
        return groups.sort((l, r) => (l.name > r.name ? 1 : -1));
    });

    //
    // Response on database-get-all-tools
    //
    ipcMain.handle("database-get-all-tools", (e) => {
        return tools.sort((l, r) => (l.name > r.name ? 1 : -1));
    });

    //
    // Response on settings-load
    //
    ipcMain.handle("settings-load", async (e) => {
        return await settingLoader.loadAsync();
    });

    //
    // Response on settings-save
    //
    ipcMain.handle("settings-save", async (e, settings: YatsugiSettings) => {
        await settingLoader.saveAsync(settings);
    });
}
