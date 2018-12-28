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

      <div v-if="isTraining" class="progress">
        <div
          class="progress-bar"
          role="progressbar"
          :style="{width: `${progress}%`}"
          :aria-valuenow="progress"
          aria-valuemin="0"
          aria-valuemax="100"
        >{{progress}}%</div>
      </div>
      <!-- <node-graph :network="currentNetwork"></node-graph> -->
      <!-- <node-graph></node-graph> -->
    </main>
  </div>
</template>

<script>
import "./css/sticky-footer-navbar.css";
import HeaderNavigation from "./components/HeaderNavigation";
import DataTable from "./components/DataTable";
import NodeGraph from "./components/NodeGraph";
import NeuralNetwork from "./utils/neuralNet";

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
      currentNetwork: undefined,
      progress: 0,
      isTraining: false
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
      this.isTraining = false;
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

      this.currentNetwork = new NeuralNetwork(
        this.inputHeaders,
        this.outputHeaders,
        this.hiddenNodeCount
      );

      this.isTraining = true;
      this.$nextTick(async () => {
        await this.currentNetwork.train(this.dataset, progress => {
          this.progress = progress;
        });
        this.$nextTick(() => {
          this.isTraining = false;
        });
      });
    },
    testRecord(record) {
      const res = this.currentNetwork.predictRecord(record);
      console.log("record", record, "prediction", res);
    }
  }
};
</script>
