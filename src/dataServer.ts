import { ipcMain } from "electron";

import { YatsugiGroup } from "./lib/yatsugiGroup";
import { YatsugiTool } from "./lib/yatsugiTool";

let groups: YatsugiGroup[] = [];
let tools: YatsugiTool[] = [];

export function initDatabase() {
    YatsugiGroup.loadAllAsync()
        .then((val) => {
            groups = val;
        })
        .catch((err) => {
            console.error(err);
        });

    YatsugiTool.loadAllAsync()
        .then((val) => {
            tools = val;
        })
        .catch((err) => {
            console.error(err);
        });

    //
    // Response on database-load
    //
    ipcMain.on("database-load", (e) => {
        YatsugiGroup.loadAllAsync()
            .then((val) => {
                groups = val;
                YatsugiTool.loadAllAsync()
                .then((val) => {
                    tools = val;
                    e.sender.send("database-load-reply", true);
                })
                .catch((err) => {
                    console.error(err);
                    e.sender.send("database-load-reply", false);
                });
            })
            .catch((err) => {
                console.error(err);
                e.sender.send("database-load-reply", false);
            });
    });

    //
    // Response on database-save
    //
    ipcMain.on("database-save", (e) => {
        // Save YatsugiGroup
        YatsugiGroup.saveAllAsync(groups)
            .then(() => {
                YatsugiTool.saveAllAsync(tools)
                .then(() => {
                    e.sender.send("database-save-reply", true);
                })
                .catch((err) => {
                    console.error(err);
                    e.sender.send("database-save-reply", false);
                });
            })
            .catch((err) => {
                console.error(err);
                e.sender.send("database-save-reply", false);
            });
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
    ipcMain.on("database-add-group", (e, group) => {
        const groupInstance = group as YatsugiGroup;
        groups = groups.filter((val) => {
            return val.id != groupInstance.id;
        });
        groups.push(groupInstance);
        YatsugiGroup.saveAllAsync(groups)
            .then(() => {
                e.sender.send("database-add-group-reply", true);
            })
            .catch((err) => {
                console.error(err);
                e.sender.send("database-add-group-reply", false);
            });
    });

    //
    // Response on database-add-tool
    //
    ipcMain.on("database-add-tool", (e, tool) => {
        const toolInstance = tool as YatsugiTool;
        tools = tools.filter((val) => {
            return val.id != toolInstance.id;
        });
        tools.push(toolInstance);
        YatsugiTool.saveAllAsync(tools)
            .then(() => {
                e.sender.send("database-add-tool-reply", true);
            })
            .catch((err) => {
                console.error(err);
                e.sender.send("database-add-tool-reply", false);
            });
    });

    //
    // Response on database-delete-group
    //
    ipcMain.on("database-delete-group", (e, id) => {
        groups = groups.filter((val) => {
            return val.id != id;
        });
        YatsugiGroup.saveAllAsync(groups)
            .then(() => {
                e.sender.send("database-delete-group-reply", true);
            })
            .catch((err) => {
                console.error(err);
                e.sender.send("database-delete-group-reply", false);
            });
    });

    //
    // Response on database-delete-tool
    //
    ipcMain.on("database-delete-tool", (e, id) => {
        tools = tools.filter((val) => {
            return val.id != id;
        });
        YatsugiTool.saveAllAsync(tools)
            .then(() => {
                e.sender.send("database-delete-tool-reply", true);
            })
            .catch((err) => {
                console.error(err);
                e.sender.send("database-delete-tool-reply", false);
            });
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
