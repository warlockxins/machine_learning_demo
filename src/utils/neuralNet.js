import * as ml from "machine-learning";
import { IS_INPUT } from "./constants";
import { TrainingHeader } from "./TrainingHeader";

export default class NeuralNetwork {
    net = undefined;
    inputVals = [];
    outputVals = [];
    dataset = [];

    inputHeaders = [];
    outputHeaders = [];

    chunks = [];

    constructor(dataset, usedHeaders) {
        this.dataset = dataset;
        let header;
        usedHeaders.forEach(item => {
            header = new TrainingHeader(item.isNumber, item.index);
            if (item.isInput === IS_INPUT) this.inputHeaders.push(header);
            else this.outputHeaders.push(header);
        });

        this.normalize();
        this.setup();
    }

    setup() {
        this.net = new ml.NeuralNet();

        this.inputVals.length = this.headerInputCount(this.inputHeaders);
        this.outputVals.length = this.headerInputCount(this.outputHeaders);
        const totalCount = this.inputVals.length + this.outputVals.length;
        const hiddenNodeCount = Math.ceil((totalCount * 2) / 3);

        if (!(this.inputHeaders.length && this.outputHeaders.length)) {
            throw "Invalid data";
        }
        // remember to allow HiddenNode count selection !!!!!!
        const topology = [
            this.inputVals.length,
            hiddenNodeCount,
            this.outputVals.length
        ];

        this.net.setTopology(topology, ml.transferFunction.tangent);
    }

    headerInputCount(header) {
        return header.reduce((accumulator, item) => {
            item.normalization.preprocess();
            return accumulator + item.normalization.length;
        }, 0);
    }

    normalize() {
        for (let i = 1; i < this.dataset.length - 1; i++) {
            const record = this.dataset[i];

            this.inputHeaders.forEach(item => {
                item.normalization.addItem(record[item.index]);
            });

            this.outputHeaders.forEach(item => {
                item.normalization.addItem(record[item.index]);
            });
        }
    }

    train(callback) {
        return new Promise(async resolve => {
            if (!this.chunks.length) {
                let i = 1;
                let nextI = 0;
                const step = 150;
                while (i < this.dataset.length - 1) {
                    nextI = Math.min(i + step, this.dataset.length - 1);
                    this.chunks.push({ start: i, end: nextI });
                    i += step;
                }
            }

            const repetitions = 5;
            const maxChunks = this.chunks.length * repetitions;

            for (let repeats = 0; repeats < repetitions; repeats++) {
                for (let i = 0; i < this.chunks.length; i++) {
                    await this.processChunk(this.chunks[i]);
                    callback(
                        Math.ceil(
                            ((repeats * this.chunks.length + i) / maxChunks) *
                                100
                        )
                    );
                }
            }
            resolve();
        });
    }

    processChunk(item) {
        return new Promise(resolveChunk => {
            for (let i = item.start; i < item.end; i++) {
                this.processRecord(this.dataset[i]);
                this.net.backProp(this.outputVals);
            }

            setTimeout(() => {
                resolveChunk();
            }, 50);
        });
    }

    processRecord(record) {
        this.recordToHeaders(record, this.inputHeaders, this.inputVals);
        this.recordToHeaders(record, this.outputHeaders, this.outputVals);

        this.net.feedForward(this.inputVals);
    }

    recordToHeaders(record, headerSet, valueSet) {
        let i = 0;
        let normalizedValue;
        headerSet.forEach(header => {
            normalizedValue = header.normalization.normalize(
                record[header.index]
            );
            if (header.normalization.isLabel) {
                valueSet.splice(
                    i,
                    header.normalization.length,
                    ...normalizedValue
                );
            } else {
                valueSet.splice(
                    i,
                    header.normalization.length,
                    normalizedValue
                );
            }
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
            const revertedVal = header.normalization.revert(val);
            if (revertedVal instanceof Array) {
                output.push(...revertedVal);
            } else {
                output.push(revertedVal);
            }
        });

        return {
            results: output,
            error: this.net.getRecentAverageError()
        };
    }
}
