new Vue({
  el: "#app",
  data: {
    data: undefined,
    dataHeaders: undefined
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

      this.data = results.data.slice(1, 5);
    },
    startLearning: function() {
      var net = new neuralNet.NeuralNet();
      console.log("net", net);
    }
  }
});
