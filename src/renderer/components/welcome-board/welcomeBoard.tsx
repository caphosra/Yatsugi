import * as React from 'react';
import { Button, Col, Container, Row } from "react-bootstrap";

import { Contents } from "../../root"
import keyEventManager from "../../keyEventManager";
import { SelectModePanel } from './selectModePanel';

export interface IWelcomeBoardProps {
    onContentsMove: (content: Contents) => void;
}

export interface IWelcomeBoardState {

}

export class WelcomeBoard extends React.Component<IWelcomeBoardProps, IWelcomeBoardState> {
    constructor(props: IWelcomeBoardProps) {
        super(props);
        this.state = { };

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
                        <SelectModePanel title="貸し出す" image_path="../assets/goout.png">
                            <Button onClick={() => this.props.onContentsMove(Contents.LENT_TOOL)} style={buttonStyle} variant="success">
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
                            <Button onClick={() => this.props.onContentsMove(Contents.GROUP_LIST)} style={buttonStyle} variant="primary">
                                団体リスト
                            </Button>
                            <Button style={buttonStyle} variant="primary">
                                器材リスト
                            </Button>
                        </SelectModePanel>
                    </Col>
                </Row></Container>
            </div>
        );
    }
}
