<template>
    <div v-if="datasetHeaders.length">
        <div
            class="notification"
            :class="{'is-primary': errors.length === 0, 'is-danger': errors.length > 0}"
        >
            <h3>Current data is {{errors.length === 0 ? "": "not"}} ready to Learn</h3>
            <!-- errors -->
            <div class="content">
                <ul class="list-group" v-if="errors.length">
                    <li v-for="(item, key) in errors" :key="key">{{item}}</li>
                </ul>
            </div>
        </div>

        <!-- data table -->
        <table class="table is-striped is-fullwidth" :class="{'is-hoverable': clickableRows}">
            <thead>
                <tr>
                    <th v-for="(header, index) in datasetHeaders" :key="index">
                        <div class="control">
                            <label class="checkbox" :for="'use'+ header.name">
                                <input
                                    type="checkbox"
                                    :id="'use'+ header.name"
                                    @change="$store.commit('setHeaderUsedMutation', {index, use: !header.use})"
                                    :checked="header.use"
                                >
                                {{ header.name }}
                            </label>
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
                            @change="$store.commit('setHeaderIsInputMutation', {index, isInput: $event})"
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
                        :class="{'has-text-grey-lighter': !datasetHeaders[cellIndex].use }"
                    >{{ cell }}</td>
                </tr>
            </tbody>
        </table>

        <nav aria-label="Page navigation" class="pagination" role="navigation">
            <a
                class="pagination-previous"
                href="#"
                v-if="hasPrevious"
                v-on:click.prevent.stop="current--"
                aria-label="Previous"
            >Previous</a>
            <a
                class="pagination-next"
                v-if="hasNext"
                v-on:click.prevent.stop="current++"
                aria-label="Next"
            >Next</a>
            <ul class="pagination-list">
                <li v-for="(item, index) in pageRegion" :key="index">
                    <a
                        class="pagination-link"
                        :class="{'is-current': item === current}"
                        href="#"
                        v-on:click.prevent.stop="current = item"
                    >{{ item + 1 }}</a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { IS_INPUT, IS_OUTPUT } from "../utils/constants";
import InputRadio from "./InputRadio";

export default {
    components: {
        InputRadio
    },
    props: {
        clickableRows: Boolean
    },
    data: function() {
        return {
            current: 0,
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
    computed: {
        datasetHeaders: function() {
            return this.$store.state.datasetHeaders;
        },
        pages: function() {
            return this.$store.state.dataset
                ? Math.floor(this.$store.state.dataset.length / 10)
                : 0;
        },
        errors: function() {
            const errors = [];

            // check input node count
            let headerCount = this.$store.getters.usedHeaders.filter(
                item => item.isInput === IS_INPUT
            ).length;
            if (headerCount === 0) {
                errors.push("Input node count cannot be 0");
            }

            // check output node count
            headerCount = this.$store.getters.usedHeaders.filter(
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
            return this.$store.state.dataset.slice(start, start + 10);
        }
    }
};
</script>