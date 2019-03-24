export const zeroOne = (value, range) =>
    (value - range.min) / (range.max - range.min);
export const minPlusOne = (value, range) => 2 * zeroOne(value, range) - 1;

export class NumberNormalization {
    min = Number.POSITIVE_INFINITY;
    max = Number.NEGATIVE_INFINITY;

    addItem(num) {
        this.min = Math.min(this.min, num);
        this.max = Math.max(this.max, num);
    }

    normalize(num) {
        return minPlusOne(num, { min: this.min, max: this.max });
    }
}
