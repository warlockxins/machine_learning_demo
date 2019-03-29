<template>
    <div id="app">
        <header-navigation
            v-on:processed="setData"
            v-on:learn="startLearning"
            v-on:reset="reset"
            :canLearn="canLearn"
            :finishedLearning="finishedLearning"
        >
            <div v-if="isTraining" class="progress">
                <div
                    class="progress-bar"
                    role="progressbar"
                    :style="{width: `${progress}%`}"
                    :aria-valuenow="progress"
                    aria-valuemin="0"
                    aria-valuemax="100"
                ></div>
            </div>
        </header-navigation>
        <main role="main" class="container">
            <data-table
                ref="dataTable"
                v-if="dataset"
                :inputData="dataset"
                v-on:testRecord="testRecord"
                v-on:validationChange="canLearn = $event"
                :clickableRows="finishedLearning"
            ></data-table>
            <div v-if="predictions.length">
                <div v-for="(item, key) in predictions" :key="key">{{item}}</div>
                <div>Error: {{ predictionError }}</div>
            </div>

            <node-graph
                v-if="currentNetwork && currentNetwork.net"
                :network="currentNetwork.net"
                ref="graph"
            ></node-graph>
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
            predictions: [],
            predictionError: 0
        };
    },
    methods: {
        reset: function() {
            this.dataset = undefined;
            this.currentNetwork = undefined;
            this.isTraining = false;
            this.finishedLearning = false;
            this.predictions = [];
            this.predictionError = 0;
        },
        setData: function(results) {
            if (!results) {
                return this.reset();
            }

            this.dataset = results.data;
        },
        startLearning: async function() {
            if (!this.canLearn || this.isTraining) {
                return;
            }

            this.finishedLearning = false;

            const { usedHeaders } = this.$refs.dataTable;

            if (!this.currentNetwork) {
                this.currentNetwork = new NeuralNetwork(
                    this.dataset,
                    usedHeaders
                );
            }

            this.isTraining = true;
            this.progress = 0;

            this.$nextTick(async () => {
                await this.currentNetwork.train(progress => {
                    this.progress = progress;
                });

                this.isTraining = false;
                this.finishedLearning = true;
                this.$nextTick(() => {
                    this.$refs.graph.drawNetwork();
                });
            });
        },
        testRecord(record) {
            const { results, error } = this.currentNetwork.predictRecord(
                record
            );
            this.predictions = results;
            this.predictionError = error;
        }
    }
};
</script>
