export const zeroOne = (value, range) =>
    (value - range.min) / (range.max - range.min);

export const zeroOneRevert = (value, range) =>
    value * (range.max - range.min) + range.min;

export const minPlusOne = (value, range) => 2 * zeroOne(value, range) - 1;
export const minPlusOneRevert = (value, range) =>
    (zeroOneRevert(value, range) + 1) / 2;

export class NumberNormalization {
    min = Number.POSITIVE_INFINITY;
    max = Number.NEGATIVE_INFINITY;
    length = 1;

    addItem(num) {
        const n = Number(num);
        this.min = Math.min(this.min, n);
        this.max = Math.max(this.max, n);
    }

    normalize(num) {
        return minPlusOne(Number(num), { min: this.min, max: this.max });
    }

    revert(num) {
        return minPlusOneRevert(num, { min: this.min, max: this.max });
    }

    preprocess() {}
}

export class LabelNormalization {
    labels = [];
    vectors = {};
    length = 0;

    addItem(value) {
        if (this.labels.indexOf(value) === -1) {
            this.labels.push(value);
        }
    }

    normalize(label) {
        return this.vectors[label];
    }
    revert(vals) {
        return vals;
    }

    preprocess() {
        let arr;
        this.labels.forEach((item, index) => {
            arr = Array(this.labels.length).fill(0);
            arr[index] = 1;
            this.vectors[item] = arr;
        });

        this.length = this.labels.length;
    }
}
