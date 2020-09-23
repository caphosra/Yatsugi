export class YatsugiSettings {
    lendingLimit: number[];

    constructor(item: { lendingLimit: number[] }) {
        this.lendingLimit = item.lendingLimit;
    }
}
