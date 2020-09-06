import * as React from 'react';

import { LentTool } from "./components/lent-tool/lentTool";
import { WelcomeBoard } from "./components/welcome-board/welcomeBoard";
import { GroupList } from "./components/group-list/groupList";
import { ToolList } from "./components/tool-list/toolList";

export enum Contents {
    WELCOME_BOARD,
    LENT_TOOL,
    GROUP_LIST,
    TOOL_LIST
}

export interface IRootContentProps {

}

export interface IRootContentState {
    currentContent: Contents;
}

export class RootContent extends React.Component<IRootContentProps, IRootContentState> {
    constructor(props: IRootContentProps) {
        super(props);
        this.state = {
            currentContent: Contents.WELCOME_BOARD
        };
    }

    onContentsMove = (content: Contents) => {
        this.setState({
            currentContent: content
        });
    }

    render() {
        let content: React.ReactElement | null = null;

        switch (this.state.currentContent) {
            case Contents.WELCOME_BOARD:
                content = <WelcomeBoard onContentsMove={this.onContentsMove} />;
                break;
            case Contents.LENT_TOOL:
                content = <LentTool onContentsMove={this.onContentsMove} />;
                break;
            case Contents.GROUP_LIST:
                content = <GroupList />;
                break;
            case Contents.TOOL_LIST:
                content = <ToolList />;
                break;
            default:
                console.error("Unknown content requested.");
                break;
        }

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
                <div onClick={() => this.onContentsMove(Contents.WELCOME_BOARD)} style={iconStyle1}>
                    <i className="fas fa-home fa-2x"></i>
                </div>
                <div style={iconStyle2}>
                    <i className="fas fa-cog fa-2x"></i>
                </div>
                {content}
            </div>
        );
    }
}
