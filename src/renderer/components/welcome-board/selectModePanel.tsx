import * as React from 'react';
import { Card, Image } from "react-bootstrap";

export interface ISelectModePanelProps {
    title: string;
    image_path: string;
}

export interface ISelectModePanelState {

}

export class SelectModePanel extends React.Component<ISelectModePanelProps, ISelectModePanelState> {
    constructor(props: ISelectModePanelProps) {
        super(props);
        this.state = { };
    }

    render() {
        const cardStyle: React.CSSProperties = {
            textAlign: "center"
        };

        const imageStyle: React.CSSProperties = {
            width: "80%",
            marginLeft: "10%",
            marginRight: "10%",
            padding: 30
        };

        return (
            <Card style={cardStyle}>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Image style={imageStyle} src={this.props.image_path} />
                    {this.props.children}
                </Card.Body>
            </Card>
        );
    }
}
