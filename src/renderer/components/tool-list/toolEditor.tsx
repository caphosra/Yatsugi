import * as React from "react";
import { Button, Card, Form } from "react-bootstrap";

import { ToolTag, toString } from "../../../lib/yatsugiTag";
import { YatsugiTool } from "../../../lib/yatsugiTool";
import { toolData } from "../../dataManager";

export interface IToolEditorProps {
    editTool: YatsugiTool;
    onFinished: (changed: boolean) => void;
}

export interface IToolEditorState {

}

export class ToolEditor extends React.Component<IToolEditorProps, IToolEditorState> {
    constructor(props: IToolEditorProps) {
        super(props);

        this.state = { };

        this.toolNameRef = React.createRef();
        this.tagRef = React.createRef();
    }

    toolNameRef: React.RefObject<HTMLInputElement>;
    tagRef: React.RefObject<HTMLSelectElement>;

    saveButtonClicked = async () => {
        this.saveButtonClicked = async () => { };

        let tool = this.props.editTool;
        tool.name = this.toolNameRef.current?.value ?? "no name";
        tool.tag = Number.parseInt(this.tagRef.current?.value ?? "0");
        try {
            await toolData.add(tool);
            this.props.onFinished(true);
        }
        catch (err) {
            console.error(err);
        }
    };

    cancelButtonClicked = () => {
        this.props.onFinished(false);
    };

    render() {
        const titleStyle: React.CSSProperties = {
            width: "60%",
            marginLeft: "20%",
            marginTop: 40,
            marginBottom: 40,
            fontSize: 30,

            color: "black"
        };

        const bodyStyle: React.CSSProperties = {
            margin: 10
        };

        return (
            <div>
                <h1 style={titleStyle}>
                    器材一覧
                </h1>
                <Card style={bodyStyle} body>
                    <Form>
                        <Form.Group>
                            <Form.Label>ID</Form.Label>
                            <Form.Control type="text" value={this.props.editTool.id} readOnly />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" ref={this.toolNameRef} defaultValue={this.props.editTool.name} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tag</Form.Label>
                            <Form.Control as="select" ref={this.tagRef}>
                                {
                                    Array.from(Array(6).keys()).map((_, val) => {
                                        const tag: ToolTag = val;
                                        return (
                                            <option value={val}>{toString(tag)}</option>
                                        )
                                    })
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Button onClick={this.saveButtonClicked}>
                                保存
                            </Button>
                            &nbsp;
                            <Button onClick={this.cancelButtonClicked}>
                                キャンセル
                            </Button>
                        </Form.Group>
                    </Form>
                </Card>
            </div>
        );
    }
}
