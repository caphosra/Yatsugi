import { ipcRenderer } from "electron";

import { YatsugiGroup } from "../lib/yatsugiGroup";
import { YatsugiTool } from "../lib/yatsugiTool";

export class DataManager<T extends YatsugiGroup | YatsugiTool> {
    private data: T[] | undefined;
    private kind: "group" | "tool";

    constructor(kind: "group" | "tool") {
        this.kind = kind;
    }

    async update() {
        const item = await ipcRenderer.invoke(`database-get-all-${this.kind}s`) as T[];
        this.data = item.map((val) => this.convertFromJson(val));
        return this.data;
    }

    async gets() {
        if (this.data) {
            return this.data;
        }
        else {
            return await this.update();
        }
    }

    async findByID(id: string): Promise<T | null> {
        if (!this.data) {
            await this.gets();
            return await this.findByID(id);
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
        const isValid = await this.validLentItem(toolIDs);
        if (!isValid) {
            throw "もう既に貸出されている器材を貸し出そうとしています。";
        }
        for (const id of toolIDs) {
            const succeeded: boolean = await ipcRenderer.invoke("database-lent-tool", groupID, id);

            if (!succeeded) {
                await this.update();
                throw "器材貸出に失敗しました。\nファイルへのアクセス権限等を再度確認して下さい。";
            }
        }
        await this.update();
    }

    async returnItem(toolIDs: string[]) {
        const isValid = await this.validReturnItem(toolIDs);
        if (!isValid) {
            throw "もう既に返却されている器材を返却しようとしています。";
        }
        for (const id of toolIDs) {
            const succeeded: boolean = await ipcRenderer.invoke("database-return-tool", id);

            if (!succeeded) {
                await this.update();
                throw "器材返却に失敗しました。\nファイルへのアクセス権限等を再度確認して下さい。";
            }
        }
        await this.update();
    }

    async add(item: T) {
        const succeeded: boolean = await ipcRenderer.invoke(`database-add-${this.kind}`, item);

        if (!succeeded) {
            throw `コンテンツの追加に失敗しました。\n(Type:${this.kind} ID: ${item.id})`;
        }
        await this.update();
    }

    async delete(itemID: string) {
        const succeeded: boolean = await ipcRenderer.invoke(`database-delete-${this.kind}`, itemID);

        if (!succeeded) {
            throw `コンテンツの削除に失敗しました。\n(Type:${this.kind} ID: ${itemID})`;
        }
        await this.update();
    }

    private async validLentItem(toolIDs: string[]): Promise<boolean> {
        if (this.kind == "group") {
            throw "\"団体\"は貸し出し可能な\"器材\"ではありません。";
        }
        if (!this.data) {
            await this.update();
            return await this.validLentItem(toolIDs);
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

    private async validReturnItem(toolIDs: string[]): Promise<boolean> {
        if (this.kind == "group") {
            throw "\"団体\"は貸し出し可能な\"器材\"ではありません。";
        }
        if (!this.data) {
            await this.update();
            return await this.validReturnItem(toolIDs);
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
}

export const groupData = new DataManager<YatsugiGroup>("group");
export const toolData = new DataManager<YatsugiTool>("tool");
