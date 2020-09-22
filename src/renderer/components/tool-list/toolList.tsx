import * as React from "react";
import { v4 as uuid } from "uuid";
import { Table } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { showErrorDialog } from "../../showDialog";
import { openQrCodeDialog } from "../../../lib/qrcodeGenerator";
import { ToolEditor } from "./toolEditor";
import { YatsugiTool } from "../../../lib/yatsugiTool";
import { groupData, toolData } from "../../dataManager";

export interface IToolListProps extends RouteComponentProps {

}

export interface IToolListState {
    editMode: boolean;
    editTool: YatsugiTool;
}

export class ToolList extends React.Component<IToolListProps, IToolListState> {
    constructor(props: IToolListProps) {
        super(props);

        this.state = {
            editMode: false,
            editTool: new YatsugiTool({ id: "", name: "", tag: 0, records: [] })
        };
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

    deleteToolButtonClicked = (id: string) => {
        showErrorDialog(
            "本当に削除しますか?\nもう戻って来ない事も理解していますよね? いたずらじゃないですよね? 開発者は責任を一切負いませんよ?",
            ["OK", "Cancel"]
        ).then((val) => {
            if (val.response == 0) {
                toolData.delete(id)
                    .then(() => {
                        this.forceUpdate();
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        });
    }

    onEditModeFinished = (changed: boolean) => {
        this.setState({
            editMode: false
        });
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
                                    <th>管理</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    toolData.gets().map((val) => {
                                        return (
                                            <tr>
                                                <td>{val.name}</td>
                                                {
                                                    (() => {
                                                        const id = val.getGroup();
                                                        if (id) {
                                                            const name = groupData.findByID(id)?.name;
                                                            if (name) {
                                                                return (
                                                                    <td style={{ textAlign: "center", color: "red" }}>{name}</td>
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
