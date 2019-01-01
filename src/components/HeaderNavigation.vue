<template>
    <header id="header">
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <a class="navbar-brand" href="#">Machine Learning</a>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarCollapse"
                aria-controls="navbarCollapse"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav mr-auto"></ul>
                <form class="form-inline mt-2 mt-md-0">
                    <input
                        v-if="!parsed"
                        ref="file"
                        class="form-control mr-sm-2"
                        type="file"
                        placeholder="Upload.csv"
                        aria-label="Upload"
                        accept=".csv"
                        id="file"
                        v-on:change="onFile"
                    >
                    <button
                        v-else
                        class="btn btn-outline-success my-2 my-sm-0"
                        type="button"
                        id="submit-learn"
                        v-on:click="$emit('learn')"
                        :disabled="!canLearn"
                    >Start Learning</button>
                    <button
                        v-if="selected"
                        class="btn btn-primary my-2 my-sm-0"
                        type="button"
                        id="submit-parse"
                        v-on:click="parseFile"
                    >Parse</button>
                    
                    <button
                        v-if="selected || parsed"
                        class="ml-1 btn btn-info my-2 my-sm-0"
                        type="button"
                        v-on:click="reset"
                    >Clear</button>
                </form>
            </div>
        </nav>
    </header>
</template>

<script>
import Papa from "papaparse";

export default {
    name: "header-navigation",
    props: ["canLearn"],
    data: function() {
        return {
            parsed: false,
            selected: false
        };
    },
    methods: {
        reset: function() {
            this.parsed = false;
            this.selected = false;
            if (this.$refs.file) {
                this.$refs.file.value = null;
            }
            this.$emit("reset");
        },
        parseFile: function() {
            var curFiles = this.$refs.file.files;
            if (curFiles.length === 0) {
                return;
            }
            var self = this;
            Papa.parse(curFiles[0], {
                complete: function(results) {
                    self.parsed = true;
                    self.selected = false;
                    self.$refs.file.value = null;
                    self.$emit("processed", results);
                }
            });
        },
        onFile: function() {
            var curFiles = this.$refs.file.files;
            if (curFiles.length > 0) {
                this.selected = true;
            }
        }
    }
};
</script>