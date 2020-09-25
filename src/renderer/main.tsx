import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";

import { RootContent } from "./root";

ReactDOM.render(
    <BrowserRouter>
        <RootContent />
    </BrowserRouter>,
    document.getElementById('main')
);
