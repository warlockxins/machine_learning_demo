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
      var net = new neuralNet.NeuralNet();
      net.setTopology([
        this.inputHeaders.length,
        this.hiddenNodeCount,
        this.outputHeaders.length
      ]);
      console.log("net", net);
    }
  }
});
