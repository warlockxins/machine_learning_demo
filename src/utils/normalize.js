export const zeroOne = (value, min, max) => (value - min) / (max - min);

export const zeroOneRevert = (value, min, max) => value * (max - min) + min;

export const minPlusOne = (value, min, max) => 2 * zeroOne(value, min, max) - 1;
export const minPlusOneRevert = (value, min, max) =>
    (zeroOneRevert(value, min, max) + 1) / 2;

export class NumberNormalization {
    min = Number.POSITIVE_INFINITY;
    max = Number.NEGATIVE_INFINITY;
    length = 1;
    isLabel = false;

    addItem(num) {
        const n = Number(num);
        this.min = Math.min(this.min, n);
        this.max = Math.max(this.max, n);
    }

    normalize(num) {
        return minPlusOne(Number(num), this.min, this.max);
    }

    revert(num) {
        return minPlusOneRevert(num, this.min, this.max);
    }

    preprocess() {}
}

export class LabelNormalization {
    keys = [];
    vectors = {};
    length = 0;
    isLabel = true;

    addItem(value) {
        if (!this.vectors[value]) {
            this.vectors[value] = [];
        }
    }

    normalize(label) {
        return this.vectors[label];
    }

    revert = vals =>
        this.keys.map((item, index) => ({ key: item, value: vals[index] }));

    preprocess() {
        this.keys = Object.keys(this.vectors);
        this.length = this.keys.length;

        this.keys.forEach((key, index) => {
            this.vectors[key] = Array(this.length).fill(0);
            this.vectors[key][index] = 1;
        });
    }
}
