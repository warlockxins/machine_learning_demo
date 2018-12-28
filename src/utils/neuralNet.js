import * as ml from "machine-learning";

export default class NeuralNetwork {
  net = undefined;
  // input/output vals params,
  inputVals = [];
  outputVals = [];
  outputMap = {};

  constructor(inputHeaders, outputHeaders, hiddenNodeCount) {
    this.net = new ml.NeuralNet();
    this.inputVals.length = inputHeaders.length;
    this.outputVals.length = outputHeaders.length;

    this.inputHeaders = inputHeaders;
    this.outputHeaders = outputHeaders;

    this.net.setTopology(
      [inputHeaders.length, hiddenNodeCount, outputHeaders.length],
      ml.transferFunction.tangent
    );
  }

  train(dataset, callback) {
    return new Promise(resolve => {
      //parse inputs
      let stepCounter = 0;
      for (let i = 1; i < dataset.length - 1; i++) {
        this.processRecord(dataset[i]);

        stepCounter++;
        if (stepCounter > 5) {
          stepCounter = 0;
          callback(Math.ceil((i / dataset.length) * 100));
        }
      }
      resolve();
    });
  }
  processRecord(record) {
    let val;
    let i = 0;
    for (; i < this.inputHeaders.length; i++) {
      this.inputVals[i] = Number(record[this.inputHeaders[i].index]);
    }
    //parse outputs
    for (i = 0; i < this.outputHeaders.length; i++) {
      val = record[this.outputHeaders[i].index];
      if (isNaN(val)) {
        if (!this.outputMap[val])
          this.outputMap[val] = Object.keys(this.outputMap).length + 1;
        this.outputVals[i] = this.outputMap[val];
      } else {
        this.outputVals[i] = Number(val);
      }
    }
    this.net.feedForward(this.inputVals);
    this.net.backProp(this.outputVals);
  }
  predictRecord(record) {
    this.processRecord(record);
    return this.net.getResults();
  }
}
