import { remote } from "electron";

export async function showInfoDialog(text: string, buttons: string[] = ["OK"]) {
    const window = remote.getCurrentWindow();
    return await remote.dialog.showMessageBox(window, {
        type: "info",
        title: "Yatsugi",
        message: text,
        buttons: buttons
    });
}

export async function showWarningDialog(text: string, buttons: string[] = ["OK"]) {
    const window = remote.getCurrentWindow();
    return await remote.dialog.showMessageBox(window, {
        type: "warning",
        title: "Yatsugi",
        message: text,
        buttons: buttons
    });
}

export async function showErrorDialog(text: string, buttons: string[] = ["OK"]) {
    const window = remote.getCurrentWindow();
    return await remote.dialog.showMessageBox(window, {
        type: "error",
        title: "Yatsugi",
        message: text,
        buttons: buttons
    });
}
