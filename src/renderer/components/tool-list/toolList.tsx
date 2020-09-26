import * as React from "react";
import { v4 as uuid } from "uuid";
import { Table } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { showErrorDialog } from "../../showDialog";
import { openQrCodeDialog } from "../../../lib/qrcodeGenerator";
import { ToolEditor } from "./toolEditor";
import { toString } from "../../../lib/yatsugiTag";
import { YatsugiGroup } from "../../../lib/yatsugiGroup";
import { YatsugiTool } from "../../../lib/yatsugiTool";
import { groupData, toolData } from "../../dataManager";

export interface IToolListFilter {
    groupFilter: string | undefined;
}

export interface IToolListProps extends RouteComponentProps<IToolListFilter> {

}

export interface IToolListState {
    editMode: boolean;
    editTool: YatsugiTool;

    groups: YatsugiGroup[];
    tools: YatsugiTool[];
}

export class ToolList extends React.Component<IToolListProps, IToolListState> {
    constructor(props: IToolListProps) {
        super(props);

        this.state = {
            editMode: false,
            editTool: new YatsugiTool({ id: "", name: "", tag: 0, records: [] }),
            groups: [],
            tools: []
        };

        this.loadContents();
    }

    async loadContents() {
        this.setState({
            groups: await groupData.gets(),
            tools: await toolData.gets()
        });
    }

    addToolButtonClicked = () => {
        this.setState({
            editMode: true,
            editTool: new YatsugiTool({ id: uuid(), name: "Untitled", tag: 0, records: [] })
        });
    }

    editToolButtonClicked = (tool: YatsugiTool) => {
        this.setState({
            editMode: true,
            editTool: tool
        });
    }

    qrCodeButtonClicked = async (id: string) => {
        await openQrCodeDialog(id);
    };

    deleteToolButtonClicked = async (id: string) => {
        const result = await showErrorDialog(
            "本当に削除しますか?\nもう戻って来ない事も理解していますよね? いたずらじゃないですよね? 開発者は責任を一切負いませんよ?",
            ["OK", "Cancel"]
        );

        if (result.response == 0) {
            await toolData.delete(id);
            await this.loadContents();
        }
    }

    onEditModeFinished = (changed: boolean) => {
        this.setState({
            editMode: false
        });

        this.loadContents();
    }

    render() {
        if (this.state.editMode) {
            return <ToolEditor editTool={this.state.editTool} onFinished={this.onEditModeFinished} />;
        }
        else {
            const titleStyle: React.CSSProperties = {
                width: "60%",
                marginLeft: "20%",
                marginTop: 40,
                marginBottom: 40,
                fontSize: 30,

                color: "black"
            };

            const iconStyle: React.CSSProperties = {
                position: "fixed",
                top: 50,
                right: 10
            };

            const tableStyle: React.CSSProperties = {
                padding: 10
            };

            return (
                <div>
                    <h1 style={titleStyle}>
                        器材一覧
                    </h1>
                    <div onClick={this.addToolButtonClicked} style={iconStyle}>
                        <i className="fas fa-plus fa-2x"></i>
                    </div>
                    <div style={tableStyle}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>器材名</th>
                                    <th>貸出先</th>
                                    <th>タグ</th>
                                    <th>管理</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tools
                                        .filter((val) => this.props.match.params.groupFilter == undefined || val.getGroup() == this.props.match.params.groupFilter)
                                        .map((val) => {
                                            return (
                                                <tr>
                                                    <td>{val.name}</td>
                                                    {
                                                        (() => {
                                                            const id = val.getGroup();
                                                            if (id) {
                                                                const group = this.state.groups.find((idx) => idx.id == id);
                                                                if (group) {
                                                                    return (
                                                                        <td style={{ textAlign: "center", color: "red" }}>{group.name}</td>
                                                                    );
                                                                }
                                                                else {
                                                                    return (
                                                                        <td style={{ textAlign: "center", color: "red" }}>不明</td>
                                                                    );
                                                                }
                                                            }
                                                            else {
                                                                return (
                                                                    <td style={{ textAlign: "center" }}>---</td>
                                                                );
                                                            }
                                                        })()
                                                    }
                                                    <td>{toString(val.tag)}</td>
                                                    <td style={{ width: 150 }}>
                                                        <i className="fas fa-edit" onClick={() => this.editToolButtonClicked(val)}></i>
                                                        &nbsp;&nbsp;
                                                        <i className="fas fa-qrcode" onClick={() => this.qrCodeButtonClicked(val.id)}></i>
                                                        &nbsp;&nbsp;
                                                        <i className="fas fa-trash" onClick={() => this.deleteToolButtonClicked(val.id)}></i>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            );
        }
    }
}

export const ToolListWithRouter = withRouter(ToolList);
