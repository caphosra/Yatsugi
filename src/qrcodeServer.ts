import { ipcMain } from "electron";
import QRCode from "qrcode";

export function initQRcodeServer() {
    ipcMain.handle("qrcode-save", async (e, path: string, text: string) => {
        try {
            await QRCode.toFile(path, text);
            return true;
        }
        catch (err) {
            return false;
        }
    });
}
