new Vue({
  el: "#app",
  data: {
    data: undefined,
    dataHeaders: undefined
  },
  computed: {
    usedHeaders: function() {
      if (!this.dataHeaders) return [];

      return this.dataHeaders.filter(function(item) {
        return item.use === true;
      });
    },
    inputHeaders: function() {
      return this.getNodes("in");
    },
    outputHeaders: function() {
      return this.getNodes("out");
    },
    previewData: function() {
      return this.data && this.data.slice(1, 5);
    },
    hiddenNodeCount: function() {
      return Math.ceil(
        ((this.inputHeaders.length + this.outputHeaders.length) * 2) / 3
      );
    },
    validation: function() {
      if (this.inputHeaders.length === 0) {
        return {
          valid: false,
          message: "input node count cannot be 0"
        };
      }

      if (this.outputHeaders.length === 0) {
        return {
          valid: false,
          message: "output node count cannot be 0"
        };
      }

      return {
        valid: true
      };
    }
  },
  methods: {
    setData: function(results) {
      this.dataHeaders = results.data[0].map(function(item, index) {
        return {
          name: item,
          use: true,
          select: "in", //out
          index: index
        };
      });

      this.data = results.data;
    },
    getNodes: function(isInput) {
      return this.usedHeaders.filter(function(item) {
        return item.select == isInput;
      });
    },
    startLearning: function() {
      if (!this.validation.valid) {
        return;
      }
      console.log("input headers", this.inputHeaders);
      console.log("output headers", this.outputHeaders);
      var net = new ml.NeuralNet();
      net.setTopology(
        [
          this.inputHeaders.length,
          this.hiddenNodeCount,
          this.outputHeaders.length
        ],
        ml.transferFunction.tangent
      );
      console.log("net", net);
      //drawNetwork(net);

      var inputVals = [];
      inputVals.length = this.inputHeaders.length;

      var outputVals = [];
      outputVals.length = this.outputHeaders.length;

      // iterators
      var k = 0,
        j = 0;

      var outputMap = {};
      let val;
      for (var i = 41; i < 60; i++) {
        //parse inputs
        //for (var i = 1; i < this.data.length; i++) {
        for (j = 0; j < this.inputHeaders.length; j++) {
          inputVals[j] = Number(this.data[i][this.inputHeaders[j].index]);
        }
        //parse outputs
        for (k = 0; k < this.outputHeaders.length; k++) {
          val = this.data[i][this.outputHeaders[k].index];
          if (isNaN(val)) {
            if (!outputMap[val])
              outputMap[val] = Object.keys(outputMap).length + 1;
            outputVals[k] = outputMap[val];
          } else {
            outputVals[k] = Number(this.data[i][this.outputVals[k].index]);
          }
        }
        console.log("input vals", inputVals);
        console.log("output vals", outputVals);
        net.feedForward(inputVals);
        net.backProp(outputVals);
      }
    }
  }
});
