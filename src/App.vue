<template>
    <div id="app">
        <header-navigation
            v-on:processed="setData"
            v-on:learn="startLearning"
            v-on:reset="reset"
            :canLearn="canLearn"
        ></header-navigation>
        <main role="main" class="container">
            <data-table
                ref="dataTable"
                v-if="dataset"
                :inputData="dataset"
                v-on:testRecord="testRecord"
                v-on:validationChange="validationChange"
                :clickableRows="finishedLearning"
            ></data-table>

            <div v-if="predictions.length">
                <div v-for="(item, key) in predictions" :key="key">{{item}}</div>
            </div>

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
            <node-graph v-if="finishedLearning" :network="currentNetwork.net"></node-graph>
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
            currentNetwork: undefined,
            progress: 0,
            isTraining: false,
            canLearn: false,
            finishedLearning: false,
            predictions: []
        };
    },
    methods: {
        reset: function() {
            this.dataset = undefined;
            this.currentNetwork = undefined;
            this.isTraining = false;
            this.finishedLearning = false;
            this.predictions = [];
        },
        setData: function(results) {
            if (!results) {
                return this.reset();
            }

            this.dataset = results.data;
        },
        validationChange(validation) {
            this.canLearn = validation;
        },
        startLearning: function() {
            if (!this.canLearn) {
                return;
            }

            const {
                inputHeaders,
                outputHeaders,
                hiddenNodeCount
            } = this.$refs.dataTable;

            this.currentNetwork = new NeuralNetwork(
                inputHeaders,
                outputHeaders,
                hiddenNodeCount
            );

            this.isTraining = true;
            this.$nextTick(async () => {
                await this.currentNetwork.train(this.dataset, progress => {
                    this.progress = progress;
                });
                this.$nextTick(() => {
                    this.isTraining = false;
                    this.finishedLearning = true;
                });
            });
        },
        testRecord(record) {
            this.predictions = this.currentNetwork.predictRecord(record);
        }
    }
};
</script>
