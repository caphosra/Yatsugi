export enum ToolTag {
    SAW,
    FILE,
    HAMMER,
    TAPE_MEASURE,
    MEASURE,
    NAIL_PULLER
}

export function toString(tag: ToolTag) {
    switch(tag) {
        case ToolTag.SAW: {
            return "のこぎり";
        }
        case ToolTag.FILE: {
            return "やすり";
        }
        case ToolTag.HAMMER: {
            return "かなづち";
        }
        case ToolTag.TAPE_MEASURE: {
            return "メジャー";
        }
        case ToolTag.MEASURE: {
            return "さしがね";
        }
        case ToolTag.NAIL_PULLER: {
            return "くぎぬき";
        }
        default: {
            return "Unknown";
        }
    }
}
