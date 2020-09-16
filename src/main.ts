import { app, BrowserWindow, ipcMain, Menu } from "electron";
import * as path from "path";
import * as fs from "fs";
import * as process from "process";

import { initDatabase } from "./dataServer";
import { initQRcodeServer } from "./qrcodeServer";

const assetDir = app.isPackaged
    ? path.join(process.resourcesPath, "assets")
    : path.join(__dirname, "../assets");

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        icon: path.join(assetDir, "goout.png"),
        webPreferences: {
            // Forgive me... I will fix it.
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    mainWindow.loadURL(`file://${path.join(__dirname, "../html/index.html")}`);

    Menu.setApplicationMenu(null);

    if (process.env.NODE_ENV == "development") {
        mainWindow.webContents.openDevTools();
    }

    ipcMain.on("assetfolder", e => {
        e.returnValue = assetDir;
    });

    ipcMain.on("load-image", (e, imagePath) => {
        const buffer = fs.readFileSync(path.join(assetDir, imagePath));
        e.returnValue = buffer.toString("base64");
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
    createWindow();

    app.on("activate", function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length == 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform != "darwin") {
        app.quit();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

initDatabase();
initQRcodeServer();
