import * as React from "react";
import { Button, Card, InputGroup, FormControl } from "react-bootstrap";

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
    }

    toolNameRef: React.RefObject<HTMLInputElement>;

    saveButtonClicked = async () => {
        this.saveButtonClicked = async () => { };

        let tool = this.props.editTool;
        tool.name = this.toolNameRef.current?.value ?? "no name";
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
                    <InputGroup className="mb-3" contentEditable={false}>
                        <InputGroup.Prepend>
                            <InputGroup.Text>ID :</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            value={this.props.editTool.id}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Name :</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="器材名"
                            ref={this.toolNameRef}
                            defaultValue={this.props.editTool.name}
                        />
                    </InputGroup>
                    <Button onClick={this.saveButtonClicked}>
                        保存
                    </Button>
                    &nbsp;
                    <Button onClick={this.cancelButtonClicked}>
                        キャンセル
                    </Button>
                </Card>
            </div>
        );
    }
}
