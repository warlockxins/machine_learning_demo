import Vue from "vue";
import Vuex from "vuex";
import Papa from "papaparse";

import { MAX_FILE_SIZE } from "../utils/constants.js";
import { TableColumn } from "../utils/TableColumn";
import { IS_INPUT } from "../utils/constants";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        dataset: undefined,
        datasetHeaders: undefined
    },
    getters: {
        usedHeaders(state) {
            return state.datasetHeaders.filter(item => item.use === true);
        }
    },
    mutations: {
        setDatasetMutation(state, { data, headers }) {
            state.dataset = data;
            state.datasetHeaders = headers;
        },
        setHeaderIsInputMutation(state, { index, isInput }) {
            state.datasetHeaders[index].isInput = isInput;
        },
        setHeaderUsedMutation(state, { index, use }) {
            state.datasetHeaders[index].use = use;
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
        (name, index) => new TableColumn(name, true, IS_INPUT, true, index)
    );
};
