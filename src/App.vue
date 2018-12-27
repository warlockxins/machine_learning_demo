<template>
  <div id="app">
    <header-navigation v-on:processed="setData" v-on:learn="startLearning"></header-navigation>
    <main role="main" class="container">
      <h1 class="mt-5">Train Neural Network with parsed CSV</h1>

      <data-table v-if="previewData" :dataset="previewData" :headers="datasetHeaders"></data-table>

      <node-graph :network="currentNetwork"></node-graph>
    </main>
  </div>
</template>

<script>
import "./css/sticky-footer-navbar.css";
import * as ml from "machine-learning";
import HeaderNavigation from "./components/HeaderNavigation.vue";
import DataTable from "./components/DataTable.vue";
import NodeGraph from "./components/NodeGraph";

export default {
  name: "app",
  components: {
    HeaderNavigation,
    DataTable,
    NodeGraph
  },
  data: function() {
    return {
      dataset: undefined,
      dataHeaders: undefined,
      currentNetwork: undefined
    };
  },
  computed: {
    usedHeaders: function() {
      if (!this.datasetHeaders) return [];

      return this.datasetHeaders.filter(function(item) {
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
      return this.dataset && this.dataset.slice(1, 5);
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
      this.datasetHeaders = results.data[0].map(function(item, index) {
        return {
          name: item,
          use: true,
          select: "in", //out
          index: index
        };
      });

      this.dataset = results.data;
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

      const net = new ml.NeuralNet();
      this.currentNetwork = net;

      net.setTopology(
        [
          this.inputHeaders.length,
          this.hiddenNodeCount,
          this.outputHeaders.length
        ],
        ml.transferFunction.tangent
      );

      // drawNetwork(net);

      let inputVals = [];
      inputVals.length = this.inputHeaders.length;

      let outputVals = [];
      outputVals.length = this.outputHeaders.length;

      // iterators
      let k = 0,
        j = 0;

      let outputMap = {};
      let val;
      //parse inputs
      for (let i = 1; i < this.dataset.length; i++) {
        for (j = 0; j < this.inputHeaders.length; j++) {
          inputVals[j] = Number(this.dataset[i][this.inputHeaders[j].index]);
        }
        //parse outputs
        for (k = 0; k < this.outputHeaders.length; k++) {
          val = this.dataset[i][this.outputHeaders[k].index];
          if (isNaN(val)) {
            if (!outputMap[val])
              outputMap[val] = Object.keys(outputMap).length + 1;
            outputVals[k] = outputMap[val];
          } else {
            outputVals[k] = Number(this.dataset[i][this.outputVals[k].index]);
          }
        }
        console.log("input vals", inputVals);
        console.log("output vals", outputVals);
        net.feedForward(inputVals);
        net.backProp(outputVals);
      }
    }
  }
};
</script>
