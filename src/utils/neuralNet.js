import * as ml from "machine-learning";
import { minPlusOne } from "./normalize";
import { IS_INPUT, IS_OUTPUT } from "./constants";

export default class NeuralNetwork {
    net = undefined;
    inputVals = [];
    outputVals = [];
    outputMap = {};
    dataset = [];
    normalized = false;

    usedHeaders = [];

    inputNormalization = {};

    constructor(dataset, usedHeaders) {
        this.dataset = dataset;
        this.usedHeaders = usedHeaders;
        this.setup();
    }

    setup() {
        this.net = new ml.NeuralNet();

        this.inputHeaders = this.usedHeaders.filter(
            item => item.isInput === IS_INPUT
        );

        this.outputHeaders = this.usedHeaders.filter(
            item => item.isInput === IS_OUTPUT
        );

        // Todo specify Normalization function According to number/lable choice
        // const labels = this.usedHeaders.filter(item => {
        //     console.log(item.isNumber);
        //     return item.isNumber == "false";
        // });

        this.inputVals.length = this.inputHeaders.length;
        this.outputVals.length = this.outputHeaders.length;

        const hiddenNodeCount = Math.ceil((this.usedHeaders.length * 2) / 3);

        // remember to allow HiddenNode count selection
        this.net.setTopology(
            [
                this.inputHeaders.length,
                hiddenNodeCount,
                hiddenNodeCount,
                this.outputHeaders.length
            ],
            ml.transferFunction.tangent
        );
    }

    normalize() {
        let j = 0;

        for (; j < this.inputHeaders.length; j++) {
            this.inputNormalization[j] = {
                min: Number.POSITIVE_INFINITY,
                max: Number.NEGATIVE_INFINITY
            };
        }

        for (let i = 1; i < this.dataset.length - 1; i++) {
            const record = this.dataset[i];

            for (j = 0; j < this.inputHeaders.length; j++) {
                this.inputNormalization[j].min = Math.min(
                    this.inputNormalization[j].min,
                    Number(record[this.inputHeaders[j].index])
                );
                this.inputNormalization[j].max = Math.max(
                    this.inputNormalization[j].max,
                    Number(record[this.inputHeaders[j].index])
                );
            }
        }

        this.normalized = true;
    }

    train(callback) {
        return new Promise(resolve => {
            //normalize
            if (!this.normalized) {
                this.normalize();
            }
            //parse inputs
            let stepCounter = 0;
            for (let i = 1; i < this.dataset.length - 1; i++) {
                this.processRecord(this.dataset[i]);
                this.net.backProp(this.outputVals);

                stepCounter++;
                if (stepCounter > 5) {
                    stepCounter = 0;
                    callback(Math.ceil((i / this.dataset.length) * 100));
                }
            }
            resolve();
        });
    }
    processRecord(record) {
        let i = 0;
        //parse inputs
        for (; i < this.inputHeaders.length; i++) {
            this.inputVals[i] = minPlusOne(
                Number(record[this.inputHeaders[i].index]),
                this.inputNormalization[i]
            );
        }
        // parse outputs
        for (i = 0; i < this.outputHeaders.length; i++) {
            this.outputVals[i] = Number(record[this.outputHeaders[i].index]);
        }
        this.net.feedForward(this.inputVals);
    }
    predictRecord(record) {
        this.processRecord(record);
        return {
            results: this.net.getResults(),
            error: this.net.getRecentAverageError()
        };
    }
}
