import * as React from 'react';
import { Button, Col, Container, Row } from "react-bootstrap";

import keyEventManager from "../../keyEventManager";
import { SelectModePanel } from '../welcome-board/selectModePanel';

export interface ILentToolProps {

}

export interface ILentToolState {
    group: string;
}

export class LentTool extends React.Component<ILentToolProps, ILentToolState> {
    constructor(props: ILentToolProps) {
        super(props);
        this.state = {
            group: ""
        };

        keyEventManager.eventList.push(this.onKeyDown);
    }

    currentText: string = "";

    onKeyDown = (e: KeyboardEvent) => {
        if (e.key == "Enter") {
            console.log("text: " + this.currentText);
            this.setState({
                group: this.currentText
            });
            this.currentText = "";
        }
        else {
            this.currentText += e.key;
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
                <Container><Row>
                    <Col>
                        <SelectModePanel title="貸し出す" image_path="../assets/goout.png">
                            <Button style={buttonStyle} variant="success">
                                開始
                            </Button>
                        </SelectModePanel>
                    </Col>
                    <Col>
                        <SelectModePanel title="返却する" image_path="../assets/back.png">
                            <Button style={buttonStyle} variant="danger">
                                開始
                            </Button>
                        </SelectModePanel>
                    </Col>
                    <Col>
                        <SelectModePanel title="管理" image_path="../assets/manage.png">
                            <Button style={buttonStyle} variant="primary">
                                団体リスト
                            </Button>
                        </SelectModePanel>
                    </Col>
                </Row></Container>
                <Button style={buttonStyle} variant="primary">
                    貸し出す
                </Button>
            </div>
        );
    }
}
