import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ipcRenderer } from "electron";
import { BrowserRouter } from "react-router-dom";

import { RootContent } from "./root";

console.log(`Assets folder: ${ipcRenderer.sendSync("assetfolder")}`);

ReactDOM.render(
    <BrowserRouter>
        <RootContent />
    </BrowserRouter>,
    document.getElementById('main')
);
