import * as ml from "machine-learning";
import { zeroOne, minPlusOne } from "./normalize";

export default class NeuralNetwork {
    net = undefined;
    // input/output vals params,
    inputVals = [];
    outputVals = [];
    outputMap = {};
    dataset = [];
    normalized = false;

    constructor(dataset, inputHeaders, outputHeaders, hiddenNodeCount) {
        this.net = new ml.NeuralNet();
        this.inputVals.length = inputHeaders.length;
        this.outputVals.length = outputHeaders.length;
        this.dataset = dataset;

        this.inputHeaders = inputHeaders;
        this.outputHeaders = outputHeaders;

        this.net.setTopology(
            [
                inputHeaders.length,
                hiddenNodeCount,
                hiddenNodeCount,
                outputHeaders.length
            ],
            ml.transferFunction.tangent
        );
    }

    normalize() {
        const range = {
            min: Number.POSITIVE_INFINITY,
            max: Number.NEGATIVE_INFINITY
        };

        for (let i = 1; i < this.dataset.length - 1; i++) {
            range.min = Math.min(range.min, this.dataset[i][0]);
            range.max = Math.max(range.max, this.dataset[i][0]);
        }

        const normalised = [];
        for (let i = 1; i < this.dataset.length - 1; i++) {
            // normalised.push(zeroOne(this.dataset[i][0], range));
            normalised.push(minPlusOne(this.dataset[i][0], range));
        }

        // console.log("normalized", normalised);
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
            this.inputVals[i] = Number(record[this.inputHeaders[i].index]);
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
