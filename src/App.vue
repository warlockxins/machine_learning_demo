<template>
    <div id="app">
        <header-navigation v-on:learn="startLearning" v-on:reset="reset" :canLearn="canLearn"></header-navigation>

        <main role="main">
            <div class="container data-container" v-if="$store.state.dataset">
                <progress
                    v-if="isTraining"
                    class="progress is-info progress_fixed"
                    :value="progress"
                    max="100"
                >{{progress}}</progress>
                <data-table
                    ref="dataTable"
                    v-on:testRecord="testRecord"
                    v-on:validationChange="canLearn = $event"
                ></data-table>

                <node-graph
                    v-if="currentNetwork"
                    :network="currentNetwork"
                    :record="testRecordData"
                    :predictions="predictions"
                    :error="predictionError"
                    ref="graph"
                ></node-graph>
            </div>
            <index-page-component v-else></index-page-component>
        </main>
    </div>
</template>

<script>
import "./css/sticky-footer-navbar.css";
import HeaderNavigation from "./components/HeaderNavigation";
import DataTable from "./components/DataTable";
import NodeGraph from "./components/NodeGraph";
import IndexPageComponent from "./components/IndexPage";
import NeuralNetwork from "./utils/NeuralNetwork";
import { IS_INPUT } from "./utils/constants";

export default {
    name: "app",
    components: {
        HeaderNavigation,
        DataTable,
        NodeGraph,
        IndexPageComponent
    },
    data: () => {
        return {
            progress: 0,
            isTraining: false,
            canLearn: false,
            predictions: [],
            predictionError: 0,
            testRecordData: []
        };
    },
    computed: {
        currentNetwork: function() {
            try {
                return new NeuralNetwork(
                    this.$store.state.dataset,
                    this.$store.getters.usedHeaders
                );
            } catch (error) {
                return null;
            }
        }
    },
    methods: {
        reset: function() {
            this.isTraining = false;
            this.predictions = [];
            this.predictionError = 0;
            this.testRecordData = [];
        },
        startLearning: async function() {
            if (!this.canLearn || this.isTraining) {
                return;
            }

            this.isTraining = true;
            this.progress = 0;

            await this.currentNetwork.train(progress => {
                this.progress = progress;
            });

            this.isTraining = false;
            this.$refs.graph.drawNetwork();
        },
        testRecord(record) {
            const { results, error } = this.currentNetwork.predictRecord(
                record
            );

            this.predictions = results;
            this.predictionError = error;

            this.testRecordData = this.$store.getters.usedHeaders.reduce(
                (inputs, item) => {
                    if (item.isInput === IS_INPUT) {
                        inputs.push({
                            name: item.name,
                            value: record[item.index]
                        });
                    }
                    return inputs;
                },
                []
            );
        }
    }
};
</script>
