import { ipcRenderer } from "electron";

class KeyEventManager {
    eventList: ((e: KeyboardEvent) => void)[] = [];

    constructor() {
        document.addEventListener("keydown", this.call);
    }

    private call = (e: KeyboardEvent) => {
        if (e.key == "F12") {
            ipcRenderer.invoke("opendev");
        }

        for (const eventHandler of this.eventList) {
            eventHandler(e);
        }
    }
}

const keyEventManager: KeyEventManager = new KeyEventManager();
export default keyEventManager;
