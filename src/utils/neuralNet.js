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
    }

    headerInputCount(header) {
        return header.reduce((accumulator, item) => {
            item.normalization.preprocess();
            return accumulator + item.normalization.length;
        }, 0);
    }
    setup() {
        this.net = new ml.NeuralNet();

        this.inputVals.length = this.headerInputCount(this.inputHeaders);
        this.outputVals.length = this.headerInputCount(this.outputHeaders);
        const totalCount = this.inputVals.length + this.outputVals.length;
        const hiddenNodeCount = Math.ceil((totalCount * 2) / 3);

        // remember to allow HiddenNode count selection
        this.net.setTopology(
            [
                this.headerInputCount(this.inputHeaders),
                hiddenNodeCount,
                hiddenNodeCount,
                this.headerInputCount(this.outputHeaders)
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
            if (!this.normalized) {
                this.normalize();
                this.setup();
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
        this.recordToHeaders(record, this.inputHeaders, this.inputVals);
        this.recordToHeaders(record, this.outputHeaders, this.outputVals);

        this.net.feedForward(this.inputVals);
    }

    recordToHeaders(record, headerSet, valueSet) {
        let i = 0;
        headerSet.forEach(header => {
            valueSet.splice(
                i,
                header.normalization.length,
                header.normalization.normalize(record[header.index])
            );
            i += header.normalization.length;
        });
    }

    predictRecord(record) {
        this.processRecord(record);
        const res = this.net.getResults();

        const output = [];
        let i = 0;
        let val;
        this.outputHeaders.forEach(header => {
            val = res.slice(i, i + header.normalization.length);
            i += header.normalization.length;
            output.push(header.normalization.revert(val));
        });

        return {
            results: output,
            error: this.net.getRecentAverageError()
        };
    }
}
