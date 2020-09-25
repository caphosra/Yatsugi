import { ipcRenderer, remote } from "electron";

async function saveQRCode(path: string, text: string) {
    const success: boolean = await ipcRenderer.invoke("qrcode-save", path, text);

    if (!success) {
        throw "Saving QR code failed";
    }
}

export async function openQrCodeDialog(id: string) {
    const window = remote.getCurrentWindow();
    const result = await remote.dialog.showSaveDialog(window, {
        defaultPath: "qrcode.png"
    });
    if (result.filePath) {
        await saveQRCode(result.filePath, id);
        return true;
    }
    else {
        return false;
    }
}
