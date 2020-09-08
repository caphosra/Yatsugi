import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ipcRenderer } from "electron";
import { BrowserRouter } from "react-router-dom";

import { RootContent } from "./root";


document.addEventListener("keydown", (e) => {
    if (e.key == "F11") {
        ipcRenderer.send("opendev");
    }
});

ReactDOM.render(
    <BrowserRouter>
        <RootContent />
    </BrowserRouter>,
    document.getElementById('main')
);
