import * as React from "react";
import { v4 as uuid } from "uuid";
import { Table } from "react-bootstrap";
import { remote } from "electron";

import { openQrCodeDialog } from "../../../lib/qrcodeGenerator";
import { ToolEditor } from "./toolEditor";
import { YatsugiGroup } from "../../../lib/yatsugiGroup";
import { YatsugiTool } from "../../../lib/yatsugiTool";
import { DataManager } from "../../dataManager";

export interface IToolListProps {

}

export interface IToolListState {
    editMode: boolean;
    editTool: YatsugiTool;

    groups: DataManager<YatsugiGroup>;
    tools: DataManager<YatsugiTool>;
}

export class ToolList extends React.Component<IToolListProps, IToolListState> {
    constructor(props: IToolListProps) {
        super(props);

        this.state = {
            editMode: false,
            editTool: new YatsugiTool({ id: "", name: "", records: [] }),
            tools: new DataManager<YatsugiTool>("tool"),
            groups: new DataManager<YatsugiGroup>("group")
        };
    }

    addToolButtonClicked = () => {
        this.setState({
            editMode: true,
            editTool: new YatsugiTool({ id: uuid(), name: "Untitled", records: [] })
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

    deleteToolButtonClicked = (id: string) => {
        const window = remote.getCurrentWindow();
        remote.dialog.showMessageBox(window, {
            type: "warning",
            title: "Yatsugi",
            message: "本当に削除しますか?\nもう戻って来ない事も理解していますよね? いたずらじゃないですよね? 開発者は責任を一切負いませんよ?",
            buttons: ["OK", "Cancel"]
        }).then((val) => {
            if (val.response == 0) {
                this.state.tools.delete(id)
                    .then(() => {
                        this.setState({
                            tools: this.state.tools
                        });
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        });
    }

    onEditModeFinished = (changed: boolean) => {
        this.setState({
            editMode: false,
            tools: this.state.tools
        });
    }

    render() {
        if (this.state.editMode) {
            return <ToolEditor editTool={this.state.editTool} tools={this.state.tools} onFinished={this.onEditModeFinished} />;
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
                                    <th>管理</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.tools.gets().map((val) => {
                                        return (
                                            <tr>
                                                <td>{val.name}</td>
                                                {
                                                    (() => {
                                                        const id = val.getGroup();
                                                        return (
                                                            id == null
                                                                ? <td style={{ textAlign: "center" }}>---</td>
                                                                : <td style={{ textAlign: "center", color: "red" }}>{this.state.groups.findByID(id)?.name}</td>
                                                        );
                                                    })()
                                                }
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
