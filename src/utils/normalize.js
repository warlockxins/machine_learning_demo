export const zeroOne = (value, range) =>
    (value - range.min) / (range.max - range.min);

export const zeroOneRevert = (value, range) =>
    (value - range.min) / (range.max - range.min);

export const minPlusOne = (value, range) => 2 * zeroOne(value, range) - 1;
export const minPlusOneRevert = (value, range) => zeroOne(value, range) / 2 + 1;

export class NumberNormalization {
    min = Number.POSITIVE_INFINITY;
    max = Number.NEGATIVE_INFINITY;
    length = 1;

    addItem(num) {
        this.min = Math.min(this.min, num);
        this.max = Math.max(this.max, num);
    }

    normalize(num) {
        return minPlusOne(Number(num), { min: this.min, max: this.max });
    }

    revert(num) {
        return 1;
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

    normalize = label => this.vectors[label];

    preprocess() {
        let arr;
        this.labels.forEach(item => {
            arr = Array(self.labelArray.length).fill(0);
            arr[self.labelArray.indexOf(item)] = 1;
            this.vectors[item] = arr;
        });

        this.length = this.labels.length;
    }
}
