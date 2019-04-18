<template>
    <nav class="navbar is-light is-fixed-top" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item">Machine Learning</a>
            <a
                role="button"
                class="navbar-burger burger"
                :class="{'is-active': menuExpanded}"
                aria-label="menu"
                aria-expanded="false"
                data-target="navbar"
                @click="menuExpanded = !menuExpanded"
            >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbar" class="navbar-menu" :class="{'is-active': menuExpanded}">
            <div class="navbar-start"></div>
            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="buttons">
                        <div class="field" v-if="!parsed">
                            <div class="control">
                                <input
                                    ref="file"
                                    class="input is-primary"
                                    type="file"
                                    placeholder="Upload.csv"
                                    aria-label="Upload"
                                    accept=".csv"
                                    id="file"
                                    v-on:change="onFile"
                                >
                            </div>
                        </div>
                        <button
                            v-else
                            class="button is-primary"
                            type="button"
                            id="submit-learn"
                            v-on:click="$emit('learn')"
                            :disabled="!canLearn"
                        >{{ finishedLearning ? "Another GO!" : "Learn"}}</button>
                        <button
                            v-if="selected"
                            class="button is-primary"
                            type="button"
                            id="submit-parse"
                            v-on:click="parseFile"
                        >Parse</button>

                        <button
                            v-if="selected || parsed"
                            class="button is-light"
                            type="button"
                            v-on:click="reset"
                        >Clear</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import Papa from "papaparse";
const maxSize = 200285; // 200 kB

export default {
    name: "header-navigation",
    props: ["canLearn", "finishedLearning"],
    data: function() {
        return {
            menuExpanded: true,
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
            if (this.$refs.file.files.length === 0) {
                return;
            }
            if (this.$refs.file.files[0].size > maxSize) {
                alert("Sorry this File is too big!");
                this.reset();
                return;
            }

            Papa.parse(this.$refs.file.files[0], {
                complete: results => {
                    this.parsed = true;
                    this.selected = false;
                    this.$refs.file.value = null;
                    this.$emit("processed", results);
                }
            });
        },
        onFile: function() {
            this.selected = this.$refs.file.files.length !== 0;
        }
    }
};
</script>