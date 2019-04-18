<template>
    <div class="table-responsive" v-if="datasetHeaders.length">
        <h3>Current data - {{errors.length === 0 ? "might be": "not"}} ready to Learn</h3>
        <!-- errors -->
        <ul class="list-group" v-if="errors.length">
            <li
                class="list-group-item list-group-item-warning"
                v-for="(item, key) in errors"
                :key="key"
            >{{item}}</li>
        </ul>

        <!-- data table -->
        <table
            class="table table-striped table-sm table-bordered"
            :class="{'table-hover': clickableRows}"
        >
            <thead class="thead-light">
                <tr>
                    <th v-for="(header, index) in datasetHeaders" :key="index">
                        <div class="form-group form-check">
                            <input
                                type="checkbox"
                                class="form-check-input"
                                :id="'use'+ header.name"
                                v-model="header.use"
                            >
                            <label
                                class="form-check-label"
                                :class="{'text-muted': !header.use}"
                                :for="'use'+ header.name"
                            >{{ header.name }}</label>
                        </div>
                    </th>
                </tr>
                <!-- toggles for input/output -->
                <tr>
                    <th v-for="(header, index) in datasetHeaders" :key="index">
                        <input-radio
                            v-if="header.use"
                            :items="inputTypes"
                            :value="header.isInput"
                            @change="header.isInput = $event"
                            :name="header.name + 'inType'"
                        ></input-radio>
                    </th>
                </tr>
                <!-- toggles for numeric/lable -->
                <tr>
                    <th v-for="(header, index) in datasetHeaders" :key="index">
                        <input-radio
                            v-if="header.use"
                            :items="valueTypes"
                            :value="header.isNumber"
                            @change="header.isNumber = $event"
                            :name="header.name + 'valType'"
                        ></input-radio>
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="(row, index) in currentDataset"
                    :key="index"
                    v-on:click="clickableRows && $emit('testRecord', row)"
                >
                    <td
                        v-for="(cell, cellIndex) in row"
                        :key="cellIndex"
                        :class="{'text-body': datasetHeaders[cellIndex].use, 'text-muted': !datasetHeaders[cellIndex].use }"
                    >{{ cell }}</td>
                </tr>
            </tbody>
        </table>

        <nav aria-label="Page navigation">
            <ul class="pagination">
                <li class="page-item" v-if="hasPrevious">
                    <a
                        class="page-link"
                        href="#"
                        v-on:click.prevent.stop="current--"
                        aria-label="Previous"
                    >
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li
                    class="page-item"
                    :class="{'active': item === current}"
                    v-for="(item, index) in pageRegion"
                    :key="index"
                >
                    <a
                        class="page-link"
                        href="#"
                        v-on:click.prevent.stop="current = item"
                    >{{ item + 1 }}</a>
                </li>

                <li class="page-item" v-if="hasNext">
                    <a
                        class="page-link"
                        href="#"
                        v-on:click.prevent.stop="current++"
                        aria-label="Next"
                    >
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { IS_INPUT, IS_OUTPUT } from "../utils/constants";
import { TableHeader } from "../utils/tableHeader";
import InputRadio from "./InputRadio";

export default {
    components: {
        InputRadio
    },
    props: {
        inputData: Array,
        clickableRows: Boolean
    },
    data: function() {
        return {
            current: 0,
            dataset: this.inputData,
            datasetHeaders: [],
            valueTypes: [
                { label: "Numeric", value: true },
                { label: "Label", value: false }
            ],
            inputTypes: [
                { label: "Input", value: IS_INPUT },
                { label: "Output", value: IS_OUTPUT }
            ]
        };
    },
    beforeMount() {
        this.datasetHeaders = this.dataset[0].map(
            (name, index) => new TableHeader(name, true, IS_INPUT, true, index)
        );
    },
    computed: {
        usedHeaders: function() {
            return this.datasetHeaders.filter(item => item.use === true);
        },
        pages: function() {
            return this.dataset ? Math.floor(this.dataset.length / 10) : 0;
        },
        errors: function() {
            const errors = [];

            // check input node count
            let headerCount = this.usedHeaders.filter(
                item => item.isInput === IS_INPUT
            ).length;
            if (headerCount === 0) {
                errors.push("Input node count cannot be 0");
            }

            // check output node count
            headerCount = this.usedHeaders.filter(
                item => item.isInput === IS_OUTPUT
            ).length;

            if (headerCount === 0) {
                errors.push("Output node count cannot be 0");
            }

            this.$emit("validationChange", errors.length === 0);

            return errors;
        },
        pageRegion: function() {
            let start = Math.max(this.current - 5, 0);
            const end = Math.min(start + 11, this.pages);
            if (this.pages > 10 && end - 11 < start) {
                start = end - 11;
            }
            const region = [];
            region.length = end - start;
            for (let index = 0; index < end - start; index++) {
                region[index] = start + index;
            }
            return region;
        },
        hasNext: function() {
            return this.current < this.pages - 1;
        },
        hasPrevious: function() {
            return this.current > 0;
        },
        currentDataset: function() {
            const start = this.current * 10 + 1;
            return this.dataset.slice(start, start + 10);
        }
    }
};
</script>