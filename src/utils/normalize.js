export const zeroOne = (value, range) =>
    (value - range.min) / (range.max - range.min);
export const minPlusOne = (value, range) => 2 * zeroOne(value, range) - 1;
