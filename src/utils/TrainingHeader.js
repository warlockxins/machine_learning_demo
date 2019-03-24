import { NumberNormalization } from "./normalize";

export class TrainingHeader {
    normalization = undefined;
    constructor(isNumber, index) {
        this.index = index;
        if (isNumber === true) {
            this.normalization = new NumberNormalization();
        }
    }
}
