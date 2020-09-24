import { ipcMain } from "electron";

import { groupLoader, toolLoader } from "./lib/dataLoader";
import { ToolRecord } from "./lib/toolRecords";
import { YatsugiGroup } from "./lib/yatsugiGroup";
import { YatsugiTool } from "./lib/yatsugiTool";

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
    ipcMain.on("database-load", async (e) => {
        try {
            groups = await groupLoader.loadAllAsync();
            tools = await toolLoader.loadAllAsync();
            e.sender.send("database-load-reply", true);
        }
        catch (err) {
            console.error(err);
            e.sender.send("database-load-reply", false);
        }
    });

    //
    // Response on database-save
    //
    ipcMain.on("database-save", async (e) => {
        try {
            await groupLoader.saveAllAsync(groups);
            await toolLoader.saveAllAsync(tools);
            e.sender.send("database-save-reply", true);
        }
        catch (err) {
            console.error(err);
            e.sender.send("database-save-reply", false);
        }
    });

    //
    // Response on database-lending
    //
    ipcMain.on("database-lending", async (e) => {
        e.returnValue = tools.some((val) => new YatsugiTool(val).getGroup() != null);
    });

    //
    // Response on database-check-group
    //
    ipcMain.on("database-check-group", (e, id) => {
        for (const group of groups) {
            if (group.id == id) {
                e.returnValue = group;
                return;
            }
        }
        e.returnValue = null;
    });

    //
    // Response on database-check-tool
    //
    ipcMain.on("database-check-tool", (e, id) => {
        for (const tool of tools) {
            if (tool.id == id) {
                e.returnValue = tool;
                return;
            }
        }
        e.returnValue = null;
    });

    //
    // Response on database-find-groups
    //
    ipcMain.on("database-find-groups", (e, text) => {
        e.returnValue = groups.filter((group) => {
            return group.name.includes(text);
        });
    });

    //
    // Response on database-find-tools
    //
    ipcMain.on("database-find-tools", (e, text) => {
        e.returnValue = tools.filter((tool) => {
            return tool.name.includes(text);
        });
    });

    //
    // Response on database-add-group
    //
    ipcMain.on("database-add-group", async (e, group) => {
        const groupInstance = group as YatsugiGroup;
        groups = groups.filter((val) => {
            return val.id != groupInstance.id;
        });
        groups.push(groupInstance);

        try {
            await groupLoader.saveAllAsync(groups);
            e.sender.send("database-add-group-reply", true);
        }
        catch (err) {
            console.error(err);
            e.sender.send("database-add-group-reply", false);
        }
    });

    //
    // Response on database-add-tool
    //
    ipcMain.on("database-add-tool", async (e, tool) => {
        const toolInstance = tool as YatsugiTool;
        tools = tools.filter((val) => {
            return val.id != toolInstance.id;
        });
        tools.push(toolInstance);

        try {
            await toolLoader.saveAllAsync(tools);
            e.sender.send("database-add-tool-reply", true);
        }
        catch (err) {
            console.error(err);
            e.sender.send("database-add-tool-reply", false);
        }
    });

    //
    // Response on database-delete-group
    //
    ipcMain.on("database-delete-group", async (e, id) => {
        groups = groups.filter((val) => {
            return val.id != id;
        });

        try {
            await groupLoader.saveAllAsync(groups);
            e.sender.send("database-delete-group-reply", true);
        }
        catch (err) {
            console.error(err);
            e.sender.send("database-delete-group-reply", false);
        }
    });

    //
    // Response on database-delete-tool
    //
    ipcMain.on("database-delete-tool", async (e, id) => {
        tools = tools.filter((val) => {
            return val.id != id;
        });

        try {
            await toolLoader.saveAllAsync(tools);
            e.sender.send("database-delete-tool-reply", true);
        }
        catch (err) {
            console.error(err);
            e.sender.send("database-delete-tool-reply", false);
        }
    });

    //
    // Response on database-lent-tool
    //
    ipcMain.on("database-lent-tool", async (e, groupID, toolID) => {
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
                    e.sender.send("database-lent-tool-reply", true);
                    return;
                }
            }
            throw "No one is matched!";
        }
        catch (err) {
            console.error(err);
            e.sender.send("database-lent-tool-reply", false);
        }
    });

    //
    // Response on database-return-tool
    //
    ipcMain.on("database-return-tool", async (e, toolID) => {
        try {
            for (const tool of tools) {
                if (tool.id == toolID) {
                    tool.records = tool.records.map((record) => {
                        record.endTime = Date.now();
                        return record;
                    });

                    await toolLoader.saveAllAsync(tools)
                    e.sender.send("database-return-tool-reply", true);
                    return;
                }
            }
        }
        catch (err) {
            console.error(err);
            e.sender.send("database-return-tool-reply", false);
        }
    });

    //
    // Response on database-get-all-groups
    //
    ipcMain.on("database-get-all-groups", (e) => {
        e.returnValue = groups.sort((l, r) => (l.name > r.name ? 1 : -1));
    });

    //
    // Response on database-get-all-tools
    //
    ipcMain.on("database-get-all-tools", (e) => {
        e.returnValue = tools.sort((l, r) => (l.name > r.name ? 1 : -1));
    });
}
