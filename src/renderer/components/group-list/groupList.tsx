import * as React from "react";
import { v4 as uuid } from "uuid";
import { Table } from "react-bootstrap";

import { showErrorDialog } from "../../showDialog";
import { openQrCodeDialog } from "../../../lib/qrcodeGenerator";
import { GroupEditor } from "./groupEditor";
import { YatsugiGroup } from "../../../lib/yatsugiGroup";
import { toolData, groupData } from "../../dataManager";

export interface IGroupListProps {

}

export interface IGroupListState {
    editMode: boolean;
    editGroup: YatsugiGroup;
}

export class GroupList extends React.Component<IGroupListProps, IGroupListState> {
    constructor(props: IGroupListProps) {
        super(props);

        this.state = {
            editMode: false,
            editGroup: new YatsugiGroup({ id: "", name: "" })
        };
    }

    addGroupButtonClicked = () => {
        this.setState({
            editMode: true,
            editGroup: new YatsugiGroup({ id: uuid(), name: "Untitled" })
        });
    }

    editGroupButtonClicked = (group: YatsugiGroup) => {
        this.setState({
            editMode: true,
            editGroup: group
        });
    }

    qrCodeButtonClicked = async (id: string) => {
        await openQrCodeDialog(id);
    };

    deleteGroupButtonClicked = (id: string) => {
        showErrorDialog(
            "本当に削除しますか?\nもう戻って来ない事も理解していますよね? いたずらじゃないですよね? 開発者は責任を一切負いませんよ?",
            ["OK", "Cancel"]
        ).then((val) => {
            if (val.response == 0) {
                groupData.delete(id)
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
            return <GroupEditor editGroup={this.state.editGroup} onFinished={this.onEditModeFinished} />;
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
                        団体一覧
                    </h1>
                    <div onClick={this.addGroupButtonClicked} style={iconStyle}>
                        <i className="fas fa-plus fa-2x"></i>
                    </div>
                    <div style={tableStyle}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>団体名</th>
                                    <th>貸出中</th>
                                    <th>管理</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    groupData.gets().map((val) => {
                                        return (
                                            <tr>
                                                <td>{val.name}</td>
                                                {
                                                    (() => {
                                                        const item = val.getLentToolCount(toolData.gets());
                                                        return (
                                                            item == 0
                                                                ? <td style={{ textAlign: "center" }}>---</td>
                                                                : <td style={{ textAlign: "center", color: "red" }}>{item}</td>
                                                        );
                                                    })()
                                                }
                                                <td style={{ width: 150 }}>
                                                    <i className="fas fa-edit" onClick={() => this.editGroupButtonClicked(val)}></i>
                                                    &nbsp;&nbsp;
                                                    <i className="fas fa-qrcode" onClick={() => this.qrCodeButtonClicked(val.id)}></i>
                                                    &nbsp;&nbsp;
                                                    <i className="fas fa-trash" onClick={() => this.deleteGroupButtonClicked(val.id)}></i>
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
