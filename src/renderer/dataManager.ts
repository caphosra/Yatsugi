import { ipcRenderer } from "electron";

import { YatsugiGroup } from "../lib/yatsugiGroup";
import { YatsugiTool } from "../lib/yatsugiTool";

export class DataManager<T extends YatsugiGroup | YatsugiTool> {
    private data: T[] | undefined;
    private kind: "group" | "tool";

    constructor(kind: "group" | "tool") {
        this.kind = kind;
    }

    update() {
        const item = ipcRenderer.sendSync(`database-get-all-${this.kind}s`) as T[];
        this.data = item.map((val) => this.convertFromJson(val));
        return this.data;
    }

    gets() {
        if (this.data) {
            return this.data;
        }
        else {
            return this.update();
        }
    }

    findByID(id: string): T | null {
        if (!this.data) {
            this.gets();
            return this.findByID(id);
        }
        else {
            for (const item of this.data) {
                if (item.id == id) {
                    return item;
                }
            }
            return null;
        }
    }

    async lentItem(groupID: string, toolIDs: string[]) {
        if (!this.validLentItem(toolIDs)) {
            throw "もう既に貸出されている器材を貸し出そうとしています。";
        }
        for (const id of toolIDs) {
            const succeeded = await this.sendRequest<boolean>("database-lent-tool", groupID, id);

            if (!succeeded) {
                this.update();
                throw "器材貸出に失敗しました。\nファイルへのアクセス権限等を再度確認して下さい。";
            }
        }
        this.update();
    }

    async returnItem(toolIDs: string[]) {
        if (!this.validReturnItem(toolIDs)) {
            throw "もう既に返却されている器材を返却しようとしています。";
        }
        for (const id of toolIDs) {
            const succeeded = await this.sendRequest<boolean>("database-return-tool", id);

            if (!succeeded) {
                this.update();
                throw "器材返却に失敗しました。\nファイルへのアクセス権限等を再度確認して下さい。";
            }
        }
        this.update();
    }

    async add(item: T) {
        const succeeded = await this.sendRequest<boolean>(`database-add-${this.kind}`, item);

        if (!succeeded) {
            throw `コンテンツの追加に失敗しました。\n(Type:${this.kind} ID: ${item.id})`;
        }
        this.update();
    }

    async delete(itemID: string) {
        const succeeded = await this.sendRequest<boolean>(`database-delete-${this.kind}`, itemID);

        if (!succeeded) {
            throw `コンテンツの削除に失敗しました。\n(Type:${this.kind} ID: ${itemID})`;
        }
        this.update();
    }

    private validLentItem(toolIDs: string[]): boolean {
        if (this.kind == "group") {
            throw "\"団体\"は貸し出し可能な\"器材\"ではありません。";
        }
        if (!this.data) {
            this.update();
            return this.validLentItem(toolIDs);
        }
        else {
            for (const item of this.data) {
                if (toolIDs.includes(item.id)) {
                    const tool = item as YatsugiTool;
                    if (tool.getGroup()) {
                        return false;
                    }
                }
            }
            return true;
        }
    }

    private validReturnItem(toolIDs: string[]): boolean {
        if (this.kind == "group") {
            throw "\"団体\"は貸し出し可能な\"器材\"ではありません。";
        }
        if (!this.data) {
            this.update();
            return this.validReturnItem(toolIDs);
        }
        else {
            for (const item of this.data) {
                if (toolIDs.includes(item.id)) {
                    const tool = item as YatsugiTool;
                    if (!tool.getGroup()) {
                        return false;
                    }
                }
            }
            return true;
        }
    }

    private convertFromJson(item: T) {
        if (this.kind == "group") {
            return new YatsugiGroup(item as YatsugiGroup) as T;
        }
        else {
            return new YatsugiTool(item as YatsugiTool) as T;
        }
    }

    private sendRequest<Return>(channel: string, ...args: any[]) {
        return new Promise<Return>((resolve, reject) => {
            switch (args.length) {
                case 0:
                    ipcRenderer.send(channel);
                    break;
                case 1:
                    ipcRenderer.send(channel, args[0]);
                    break;
                case 2:
                    ipcRenderer.send(channel, args[0], args[1]);
                    break;
                default:
                    throw `引数を${args.length}個とるリクエストはありません。`;
            }
            ipcRenderer.on(`${channel}-reply`, (e, ret) => {
                resolve(ret);
            });
        });
    }
}

export const groupData = new DataManager<YatsugiGroup>("group");
export const toolData = new DataManager<YatsugiTool>("tool");
