import * as React from "react";
import { Card, Image } from "react-bootstrap";
import { ipcRenderer } from "electron";

export interface ISelectModePanelProps {
    title: string;
    imagePath: string;
}

export interface ISelectModePanelState {
    imageContent: string;
}

export class SelectModePanel extends React.Component<ISelectModePanelProps, ISelectModePanelState> {
    constructor(props: ISelectModePanelProps) {
        super(props);
        this.state = {
            imageContent: ""
        };

        this.loadImage();
    }

    async loadImage() {
        const content = await ipcRenderer.invoke("load-image", this.props.imagePath);
        this.setState({
            imageContent: content
        });
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
                    <Image style={imageStyle} src={`data:image/png;base64,${this.state.imageContent}`} />
                    {this.props.children}
                </Card.Body>
            </Card>
        );
    }
}
