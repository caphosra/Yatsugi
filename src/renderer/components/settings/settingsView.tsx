import * as React from "react";
import { ipcRenderer } from "electron";
import { Button, Form, Card } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { YatsugiSettings } from "../../../lib/yatsugiSettings";
import { ToolTag, toString } from "../../../lib/yatsugiTag";

export interface ISettingsViewProps extends RouteComponentProps {

}

export interface ISettingsViewState {
    settings: YatsugiSettings | undefined;
}

export class SettingsView extends React.Component<ISettingsViewProps, ISettingsViewState> {
    constructor(props: ISettingsViewProps) {
        super(props);
        this.state = {
            settings: undefined
        };

        this.loadSettings();

        for (let counter = 0; counter < 6; counter++) {
            this.lendingLimit.push(React.createRef());
        }
    }

    lendingLimit: React.RefObject<HTMLInputElement>[] = [];

    async loadSettings() {
        const settings: YatsugiSettings = await ipcRenderer.invoke("settings-load");
        this.setState({
            settings: settings
        });
    }

    async saveSettings() {
        await ipcRenderer.invoke("settings-save", this.state.settings);
    }

    updateSettings() {
        this.setState({
            settings: {
                lendingLimit: this.lendingLimit.map((v) => Number.parseInt(v.current?.value ?? "1"))
            }
        });

        this.saveSettings();
    }

    render() {
        if (!this.state.settings) {
            return (
                <div>Now loading...</div>
            );
        }

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
                    設定
                </h1>
                <Card style={bodyStyle} body>
                    <Form>
                        <Form.Label>貸出上限</Form.Label>
                        <Form.Group>
                            {
                                Array.from(Array(6).keys()).map((_, val) => {
                                    const tag: ToolTag = val;
                                    return (
                                        <div>
                                            <Form.Label style={{ fontSize: 15 }}>{toString(tag)}</Form.Label>
                                            <Form.Control type="range"
                                                ref={this.lendingLimit[val]}
                                                onChange={() => this.updateSettings()}
                                                defaultValue={this.state.settings?.lendingLimit[val]}
                                                step={1} min={1} max={10} />
                                            <Form.Text>
                                                {this.state.settings?.lendingLimit[val]}
                                            </Form.Text>
                                        </div>
                                    )
                                })
                            }
                        </Form.Group>
                        <Form.Group>
                            <Button>
                                保存
                            </Button>
                            &nbsp;
                            <Button>
                                キャンセル
                            </Button>
                        </Form.Group>
                    </Form>
                </Card>
            </div>
        );
    }
}

export const SettingsViewWithRouter = withRouter(SettingsView);
