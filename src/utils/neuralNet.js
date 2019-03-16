import * as ml from "machine-learning";
import { zeroOne, minPlusOne } from "./normalize";

export default class NeuralNetwork {
    net = undefined;
    inputVals = [];
    outputVals = [];
    outputMap = {};
    dataset = [];
    normalized = false;

    constructor(dataset, usedHeaders) {
        this.net = new ml.NeuralNet();

        const IS_INPUT = 0,
            IS_OUTPUT = 1;

        this.inputHeaders = usedHeaders.filter(
            item => item.isInput === IS_INPUT
        );

        this.outputHeaders = usedHeaders.filter(
            item => item.isInput === IS_OUTPUT
        );

        this.inputVals.length = this.inputHeaders.length;
        this.outputVals.length = this.outputHeaders.length;
        this.dataset = dataset;

        const hiddenNodeCount = Math.ceil((usedHeaders.length * 2) / 3);

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
        const range = {
            min: Number.POSITIVE_INFINITY,
            max: Number.NEGATIVE_INFINITY
        };

        for (let i = 1; i < this.dataset.length - 1; i++) {
            range.min = Math.min(range.min, this.dataset[i][0]);
            range.max = Math.max(range.max, this.dataset[i][0]);
        }

        const normalisedData = [];
        for (let i = 1; i < this.dataset.length - 1; i++) {
            // normalised.push(zeroOne(this.dataset[i][0], range));
            normalisedData.push(minPlusOne(this.dataset[i][0], range));
        }

        console.log("normalized", normalisedData);
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
