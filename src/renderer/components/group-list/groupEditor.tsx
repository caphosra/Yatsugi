import * as React from "react";
import { Button, Card, InputGroup, FormControl } from "react-bootstrap";

import { YatsugiGroup } from "../../../lib/yatsugiGroup";
import { groupData } from "../../dataManager";

export interface IGroupEditorProps {
    editGroup: YatsugiGroup;
    onFinished: (changed: boolean) => void;
}

export interface IGroupEditorState {

}

export class GroupEditor extends React.Component<IGroupEditorProps, IGroupEditorState> {
    constructor(props: IGroupEditorProps) {
        super(props);

        this.state = { };

        this.groupNameRef = React.createRef();
    }

    groupNameRef: React.RefObject<HTMLInputElement>;

    saveButtonClicked = () => {
        let group = this.props.editGroup;
        group.name = this.groupNameRef.current?.value ?? "no name";
        groupData.add(group)
            .then(() => {
                this.props.onFinished(true);
            })
            .catch((err) => {
                console.error(err);
            });
        this.saveButtonClicked = () => { };
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
                    団体一覧
                </h1>
                <Card style={bodyStyle} body>
                    <InputGroup className="mb-3" contentEditable={false}>
                        <InputGroup.Prepend>
                            <InputGroup.Text>ID :</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            value={this.props.editGroup.id}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Name :</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="団体名"
                            ref={this.groupNameRef}
                            defaultValue={this.props.editGroup.name}
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
