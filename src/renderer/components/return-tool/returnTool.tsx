import * as React from 'react';
import { Button, Card, Table } from "react-bootstrap";

import { showInfoDialog, showErrorDialog } from "../../showDialog"
import { Contents } from "../../root";
import keyEventManager from "../../keyEventManager";
import { YatsugiTool } from "../../../lib/yatsugiTool";
import { toolData } from "../../dataManager";

export interface IReturnToolProps {
    onContentsMove: (content: Contents) => void;
}

export interface IReturnToolState {
    tools: YatsugiTool[];
}

export class ReturnTool extends React.Component<IReturnToolProps, IReturnToolState> {
    constructor(props: IReturnToolProps) {
        super(props);
        this.state = {
            tools: []
        };

        keyEventManager.eventList.push(this.onKeyDown);
    }

    currentText: string = "";

    onKeyDown = (e: KeyboardEvent) => {
        if (e.key == "Enter") {
            const id = this.currentText;
            this.currentText = "";

            const toolLoaded = toolData.findByID(id);
            if (toolLoaded) {
                const tools = this.state.tools.filter((tool) => {
                    return tool.id != toolLoaded.id;
                });
                tools.push(toolLoaded);

                this.setState({
                    tools: tools
                });
                return;
            }

            showErrorDialog("読み込みに失敗しました。\nもう一度試してみてください。");
        }
        else if (e.key == "F5") {
            this.setState({
                tools: toolData.gets()
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

    async returnButtonClicked() {
        try {
            await toolData.returnItem(this.state.tools.map(tool => tool.id));
            await showInfoDialog("返却完了しました。");
            this.props.onContentsMove(Contents.WELCOME_BOARD);
        }
        catch (err) {
            await showErrorDialog(err);
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
                    器材の返却
                </h1>
                <Card style={cardStyle}>
                    <Card.Title>返却器材</Card.Title>
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
                <Button onClick={() => this.returnButtonClicked()} style={buttonStyle} variant="primary">
                    返却する
                </Button>
            </div>
        );
    }
}
