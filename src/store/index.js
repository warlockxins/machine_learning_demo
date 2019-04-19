import Vue from "vue";
import Vuex from "vuex";
import Papa from "papaparse";

import { MAX_FILE_SIZE } from "../utils/constants.js";
import { TableHeader } from "../utils/tableHeader";
import { IS_INPUT } from "../utils/constants";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        dataset: undefined,
        datasetHeaders: undefined
    },
    mutations: {
        setDatasetMutation(state, { data, headers }) {
            state.dataset = data;
            state.datasetHeaders = headers;
        }
    },
    actions: {
        deleteDataset({ commit }) {
            commit("setDatasetMutation", {
                data: undefined,
                datasetHeaders: undefined
            });
        },
        createDatasetFromFile({ commit }, file) {
            return new Promise((resolve, reject) => {
                if (!file || file.size > MAX_FILE_SIZE) {
                    return reject();
                }

                Papa.parse(file, {
                    complete: results => {
                        commit("setDatasetMutation", {
                            data: results.data,
                            headers: createDatasetHeaders(results.data)
                        });
                        resolve();
                    }
                });
            });
        }
    }
});

const createDatasetHeaders = dataset => {
    return dataset[0].map(
        (name, index) => new TableHeader(name, true, IS_INPUT, true, index)
    );
};
