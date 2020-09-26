import * as React from "react";
import { ipcRenderer } from "electron";
import { Button, Card, Table } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { showInfoDialog, showErrorDialog } from "../../showDialog";
import keyEventManager from "../../keyEventManager";
import { YatsugiTool } from "../../../lib/yatsugiTool";
import { YatsugiGroup } from "../../../lib/yatsugiGroup";
import { YatsugiSettings } from "../../../lib/yatsugiSettings";
import { groupData, toolData } from "../../dataManager";

export interface ILentToolProps extends RouteComponentProps {

}

export interface ILentToolState {
    group: YatsugiGroup | undefined;
    tools: YatsugiTool[];
}

export class LentTool extends React.Component<ILentToolProps, ILentToolState> {
    constructor(props: ILentToolProps) {
        super(props);
        this.state = {
            group: undefined,
            tools: []
        };

        keyEventManager.eventList.push(this.onKeyDown);
    }

    currentText: string = "";

    onKeyDown = async (e: KeyboardEvent) => {
        if (e.key == "Enter") {
            const id = this.currentText;
            this.currentText = "";

            const groupLoaded = await groupData.findByID(id);
            if (groupLoaded) {
                this.setState({
                    group: groupLoaded
                });
                return;
            }

            const toolLoaded = await toolData.findByID(id);
            if (toolLoaded && this.state.group) {
                const tools = this.state.tools.filter((tool) => {
                    return tool.id != toolLoaded.id;
                });
                tools.push(toolLoaded);

                const settings: YatsugiSettings = await ipcRenderer.invoke("settings-load");
                const valid = await toolData.isValidLending(this.state.group.id, tools.map(tool => tool.id), settings);
                if (valid) {
                    this.setState({
                        tools: tools
                    });
                }
                return;
            }

            showErrorDialog("読み込みに失敗しました。\nもう一度試してみてください。");
        }
        else if (e.key == "F5") {
            this.setState({
                group: (await groupData.gets())[0],
                tools: await toolData.gets()
            });
        }
        else {
            this.currentText += e.key;
        }
    }

    deleteButtonClicked(id: string) {
        const tools = this.state.tools.filter((tool) => {
            return tool.id != id;
        });

        this.setState({
            tools: tools
        });
    }

    async lentButtonClicked() {
        if (this.state.group) {
            try {
                await toolData.lentItem(this.state.group.id, this.state.tools.map(tool => tool.id));
                await showInfoDialog("貸出完了しました。");
                this.props.history.push("/");
            }
            catch (err) {
                await showErrorDialog(err);
            }
        }
        else {
            await showErrorDialog("どの団体に貸し出すかハッキリさせましょう!");
        }
    }

    render() {
        const titleStyle: React.CSSProperties = {
            width: "60%",
            marginLeft: "20%",
            marginTop: 40,
            marginBottom: 40,
            fontSize: 30,

            color: "black"
        };

        const cardStyle: React.CSSProperties = {
            margin: 20,
            padding: 20
        };

        const buttonStyle: React.CSSProperties = {
            width: "80%",
            marginLeft: "10%",
            marginRight: "10%",
            marginTop: 10,
            marginBottom: 10
        };

        return (
            <div>
                <h1 style={titleStyle}>
                    器材の貸出
                </h1>
                <Card style={cardStyle}>
                    <Card.Title>貸出団体</Card.Title>
                    <Card.Body>
                        <p style={{ textAlign: "center", fontSize: 15 }}>
                            {this.state.group?.name ?? "Waiting..."}
                        </p>
                    </Card.Body>
                </Card>
                <Card style={cardStyle}>
                    <Card.Title>貸出器材</Card.Title>
                    <Card.Body>
                        <Table striped bordered hover><tbody>
                        {
                            this.state.tools.map((tool) => {
                                return (
                                    <tr>
                                        <td>{tool.name}</td>
                                        <td>
                                            <i className="fas fa-trash" onClick={() => this.deleteButtonClicked(tool.id)}></i>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        </tbody></Table>
                    </Card.Body>
                </Card>
                <Button onClick={() => this.lentButtonClicked()} style={buttonStyle} variant="primary">
                    貸し出す
                </Button>
            </div>
        );
    }
}

export const LentToolWithRouter = withRouter(LentTool);
