<template>
    <div class="table-responsive" v-if="datasetHeaders.length">
        <h3>Current data - {{errors.length === 0 ? "might be": "not"}} ready to Learn</h3>
        <div
            class="alert alert-success"
            role="alert"
            v-if="clickableRows"
        >You can now click on table rows and see preddiction in action</div>
        <table
            class="table table-striped table-sm table-bordered"
            :class="{'table-hover': clickableRows}"
        >
            <thead>
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
                        <div v-if="header.use" class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                type="radio"
                                :name="'header' + header.name"
                                :id="'fieldRadio1'+header.name"
                                :value="IS_INPUT"
                                checked
                                v-model="header.isInput"
                            >
                            <label class="form-check-label" :for="'fieldRadio1'+header.name">input</label>
                        </div>
                        <div v-if="header.use" class="form-check form-check-inline">
                            <input
                                class="form-check-input"
                                type="radio"
                                :name="'header' + header.name"
                                :id="'fieldRadio2'+header.name"
                                :value="IS_OUTPUT"
                                v-model="header.isInput"
                            >
                            <label class="form-check-label" :for="'fieldRadio2'+header.name">output</label>
                        </div>
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

        <!-- errors -->
        <ul class="list-group" v-if="errors.length">
            <li
                class="list-group-item list-group-item-warning"
                v-for="(item, key) in errors"
                :key="key"
            >{{item}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        inputData: Array,
        clickableRows: Boolean
    },
    data: function() {
        return {
            IS_INPUT: 0,
            IS_OUTPUT: 1,
            current: 0,
            dataset: this.inputData,
            datasetHeaders: []
        };
    },
    beforeMount() {
        if (!this.dataset) {
            return (this.datasetHeaders = []);
        }

        this.datasetHeaders = this.dataset[0].map((item, index) => {
            return {
                name: item,
                use: true,
                isInput: this.IS_INPUT,
                index: index
            };
        });
    },
    computed: {
        usedHeaders: function() {
            if (!this.datasetHeaders) return [];
            return this.datasetHeaders.filter(item => item.use === true);
        },
        pages: function() {
            if (this.dataset && this.dataset.length > 10) {
                return Math.floor(this.dataset.length / 10);
            }
            return 0;
        },
        previewData: function() {
            return this.dataset && this.dataset.slice(1, 5);
        },
        errors: function() {
            const errors = [];

            let headerCount = this.usedHeaders.filter(
                item => item.isInput === this.IS_INPUT
            ).length;
            if (headerCount === 0) {
                errors.push("Input node count cannot be 0");
            }

            headerCount = this.usedHeaders.filter(
                item => item.isInput === this.IS_OUTPUT
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