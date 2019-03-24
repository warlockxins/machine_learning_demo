import * as ml from "machine-learning";
import { IS_INPUT } from "./constants";
import { TrainingHeader } from "./TrainingHeader";

export default class NeuralNetwork {
    net = undefined;
    inputVals = [];
    outputVals = [];
    dataset = [];
    normalized = false;

    inputHeaders = [];
    outputHeaders = [];

    constructor(dataset, usedHeaders) {
        this.dataset = dataset;
        usedHeaders.map(item => {
            const header = new TrainingHeader(item.isNumber, item.index);
            if (item.isInput === IS_INPUT) this.inputHeaders.push(header);
            else this.outputHeaders.push(header);
        });
        this.setup();
    }

    setup() {
        this.net = new ml.NeuralNet();

        // maybe later
        // this.inputVals.length = this.inputHeaders.length;
        // this.outputVals.length = this.outputHeaders.length;

        const totalCount = this.inputHeaders.length + this.outputHeaders.length;
        const hiddenNodeCount = Math.ceil((totalCount * 2) / 3);

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
        for (let i = 1; i < this.dataset.length - 1; i++) {
            const record = this.dataset[i];

            this.inputHeaders.forEach(item => {
                item.normalization.addItem(Number(record[item.index]));
            });

            this.outputHeaders.forEach(item => {
                item.normalization.addItem(Number(record[item.index]));
            });
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
            // let stepCounter = 0;
            for (let i = 1; i < this.dataset.length - 1; i++) {
                this.processRecord(this.dataset[i]);
                this.net.backProp(this.outputVals);

                // stepCounter++;
                // if (stepCounter > 5) {
                //     stepCounter = 0;
                //     callback(Math.ceil((i / this.dataset.length) * 100));
                // }
            }
            resolve();
        });
    }
    processRecord(record) {
        this.inputVals = [];
        this.inputHeaders.forEach(header => {
            this.inputVals.push(
                header.normalization.normalize(record[header.index])
            );
        });
        // parse outputs
        this.outputVals = [];
        this.outputHeaders.forEach((header, index) => {
            this.outputVals[index] = header.normalization.normalize(
                record[header.index]
            );
        });

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
