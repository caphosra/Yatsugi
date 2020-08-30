import { ipcRenderer, remote } from "electron";
import QRCode from "qrcode";

function saveQRCode(path: string, text: string) {
    return new Promise<void>((resolve, reject) => {
        ipcRenderer.send("qrcode-save", path, text);
        ipcRenderer.on("qrcode-save-reply", (e, success) => {
            if (success) {
                resolve();
            }
            else {
                reject("Saving QR code failed");
            }
        });
    });
}

export function openQrCodeDialog(id: string) {
    return new Promise<boolean>((resolve, reject) => {
        const window = remote.getCurrentWindow();
        remote.dialog.showSaveDialog(window, {
            defaultPath: "qrcode.png"
        })
            .then((val) => {
                if (val.filePath) {
                    console.log(QRCode);
                    saveQRCode(val.filePath, id)
                        .then(() => {
                            resolve(true);
                        })
                        .catch((err) => {
                            console.error(err);
                            reject(err);
                        });
                }
                else {
                    resolve(false);
                }
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            });
    });
}
