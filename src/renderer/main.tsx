import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ipcRenderer } from "electron";

import { RootContent } from "./root";

document.addEventListener("keydown", (e) => {
    if (e.key == "F11") {
        ipcRenderer.send("opendev");
    }
});

ReactDOM.render(
    <RootContent />,
    document.getElementById('main')
);
