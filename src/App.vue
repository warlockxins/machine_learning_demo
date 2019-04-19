<template>
    <div id="app">
        <header-navigation v-on:learn="startLearning" v-on:reset="reset" :canLearn="canLearn"></header-navigation>
        <progress
            v-if="isTraining"
            class="progress is-small"
            :value="progress"
            max="100"
        >{{progress}}</progress>
        <main role="main" class="container">
            <template v-if="$store.state.dataset">
                <data-table
                    ref="dataTable"
                    v-on:testRecord="testRecord"
                    v-on:validationChange="canLearn = $event"
                    :clickableRows="finishedLearning"
                ></data-table>

                <node-graph
                    v-if="currentNetwork && currentNetwork.net"
                    :network="currentNetwork.net"
                    :predictions="predictions"
                    :error="predictionError"
                    ref="graph"
                ></node-graph>
            </template>
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
            this.currentNetwork = undefined;
            this.isTraining = false;
            this.finishedLearning = false;
            this.predictions = [];
            this.predictionError = 0;
        },
        startLearning: async function() {
            if (!this.canLearn || this.isTraining) {
                return;
            }

            this.finishedLearning = false;

            if (!this.currentNetwork) {
                this.currentNetwork = new NeuralNetwork(
                    this.$store.state.dataset,
                    this.$store.getters.usedHeaders
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
