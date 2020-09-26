import * as React from 'react';
import { Switch, Route, Link } from "react-router-dom";

import { SettingsViewWithRouter } from "./components/settings/settingsView";
import { LentToolWithRouter } from "./components/lent-tool/lentTool";
import { ReturnToolWithRouter } from "./components/return-tool/returnTool";
import { WelcomeBoardWithRouter } from "./components/welcome-board/welcomeBoard";
import { GroupListWithRouter } from "./components/group-list/groupList";
import { ToolListWithRouter } from "./components/tool-list/toolList";

export interface IRootContentProps {

}

export interface IRootContentState {

}

export class RootContent extends React.Component<IRootContentProps, IRootContentState> {
    constructor(props: IRootContentProps) {
        super(props);
        this.state = { };
    }

    render() {
        const iconStyle1: React.CSSProperties = {
            position: "fixed",
            top: 10,
            left: 10
        };
        const iconStyle2: React.CSSProperties = {
            position: "fixed",
            top: 10,
            left: 70
        };

        return (
            <div>
                <Link to="/">
                    <div style={iconStyle1}>
                        <i className="fas fa-home fa-2x"></i>
                    </div>
                </Link>
                <Link to="/settings">
                    <div style={iconStyle2}>
                        <i className="fas fa-cog fa-2x"></i>
                    </div>
                </Link>
                <Switch>
                    <Route path="/settings" component={SettingsViewWithRouter} />
                    <Route path="/lent" component={LentToolWithRouter} />
                    <Route path="/return" component={ReturnToolWithRouter} />
                    <Route path="/group/list" component={GroupListWithRouter} />
                    <Route path="/tool/list/:groupFilter" component={ToolListWithRouter} />
                    <Route path="/tool/list" component={ToolListWithRouter} />
                    <Route component={WelcomeBoardWithRouter} />
                </Switch>
            </div>
        );
    }
}
