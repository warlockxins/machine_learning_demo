import { NumberNormalization, LabelNormalization } from "./normalize";

export class TrainingHeader {
    normalization = undefined;
    constructor(isNumber, index) {
        this.index = index;

        this.normalization =
            isNumber === true
                ? new NumberNormalization()
                : new LabelNormalization();
    }
}
