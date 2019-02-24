const randArray = () => {
    const arr = [];
    for (let index = 0; index < 20; index++) {
        arr.push(index - 10);
    }

    return arr;
};

const minMax = arr => {
    let min = arr[0];
    let max = arr[0];
    arr.forEach(element => {
        min = Math.min(min, element);
        max = Math.max(max, element);
    });
    return {
        min: min,
        max: max
    };
};

export const testNormalization = () => {
    const arr = randArray();
    const range = minMax(arr);

    const normArray = [];
    arr.forEach(element => {
        normArray.push((element - range.min) / (range.max - range.min));
    });

    console.log(normArray);
};
