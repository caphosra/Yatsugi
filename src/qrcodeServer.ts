import { ipcMain } from "electron";
import QRCode from "qrcode";

export function initQRcodeServer() {
    ipcMain.on("qrcode-save", (e, path, text) => {
        QRCode.toFile(path, text)
            .then(() => {
                e.sender.send("qrcode-save-reply", true);
            })
            .catch(() => {
                e.sender.send("qrcode-save-reply", false);
            });
    });
}
