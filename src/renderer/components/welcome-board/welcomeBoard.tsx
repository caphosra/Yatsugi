import * as React from "react";
import { ipcRenderer } from "electron";
import { Button, Col, Container, Row } from "react-bootstrap";
import { RouteComponentProps, Link, withRouter } from "react-router-dom";

import keyEventManager from "../../keyEventManager";
import { SelectModePanel } from './selectModePanel';

export interface IWelcomeBoardProps extends RouteComponentProps {

}

export interface IWelcomeBoardState {
    lending: boolean;
}

export class WelcomeBoard extends React.Component<IWelcomeBoardProps, IWelcomeBoardState> {
    constructor(props: IWelcomeBoardProps) {
        super(props);
        this.state = {
            lending: ipcRenderer.sendSync("database-lending")
        };

        keyEventManager.eventList = [];
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
                    Yatsugi - 文化祭器材管理システム
                </h1>
                <Container><Row>
                    <Col>
                        <SelectModePanel title="貸し出す" imagePath="goout.png">
                            <Link to="/lent">
                                <Button style={buttonStyle} variant="success">
                                    開始
                                </Button>
                            </Link>
                        </SelectModePanel>
                    </Col>
                    <Col>
                        <SelectModePanel title="返却する" imagePath="back.png">
                            <Link to="/return">
                                <Button style={buttonStyle} variant="danger">
                                    開始
                                </Button>
                            </Link>
                            {this.state.lending ? <p style={{ color: "red" }}>貸出器材あり</p> : undefined}
                        </SelectModePanel>
                    </Col>
                    <Col>
                        <SelectModePanel title="管理" imagePath="manage.png">
                            <Link to="/group/list">
                                <Button style={buttonStyle} variant="primary">
                                    団体リスト
                                </Button>
                            </Link>
                            <Link to="/tool/list">
                                <Button style={buttonStyle} variant="primary">
                                    器材リスト
                                </Button>
                            </Link>
                        </SelectModePanel>
                    </Col>
                </Row></Container>
            </div>
        );
    }
}

export const WelcomeBoardWithRouter = withRouter(WelcomeBoard);
