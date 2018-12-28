<template>
  <div id="app">
    <header-navigation v-on:processed="setData" v-on:learn="startLearning" v-on:reset="reset"></header-navigation>
    <main role="main" class="container">
      <data-table
        v-if="dataset"
        :dataset="dataset"
        :headers="datasetHeaders"
        v-on:testRecord="testRecord"
      ></data-table>
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
  data: () => {
    return {
      dataset: undefined,
      datasetHeaders: undefined,
      currentNetwork: undefined
    };
  },
  computed: {
    usedHeaders: function() {
      if (!this.datasetHeaders) return [];

      return this.datasetHeaders.filter(item => item.use === true);
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
    reset: function() {
      this.dataset = undefined;
      this.datasetHeaders = undefined;
      this.currentNetwork = undefined;
    },
    setData: function(results) {
      if (!results) {
        return this.reset();
      }

      this.datasetHeaders = results.data[0].map((item, index) => {
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
      return this.usedHeaders.filter(item => item.select == isInput);
    },
    startLearning: function() {
      if (!this.validation.valid) {
        return;
      }

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
        let record = this.dataset[i];
        for (j = 0; j < this.inputHeaders.length; j++) {
          inputVals[j] = Number(record[this.inputHeaders[j].index]);
        }
        //parse outputs
        for (k = 0; k < this.outputHeaders.length; k++) {
          val = record[this.outputHeaders[k].index];
          if (isNaN(val)) {
            if (!outputMap[val])
              outputMap[val] = Object.keys(outputMap).length + 1;
            outputVals[k] = outputMap[val];
          } else {
            outputVals[k] = Number(val);
          }
        }
        // console.log("input vals", inputVals);
        // console.log("output vals", outputVals);
        net.feedForward(inputVals);
        net.backProp(outputVals);
      }
    },
    testRecord(record) {
      console.log("record", record);
    }
  }
};
</script>
