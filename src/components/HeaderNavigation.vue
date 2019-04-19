<template>
    <nav
        class="navbar is-dark is-fixed-top has-shadow"
        role="navigation"
        aria-label="main navigation"
    >
        <div class="container">
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
                <div class="navbar-start">
                    <a
                        href="#"
                        class="navbar-item has-text-primary"
                        v-if="selected || parsed"
                        type="button"
                        v-on:click="reset"
                    >Clear dataset</a>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="field is-grouped">
                            <div class="control" v-if="!parsed">
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
                            <button
                                v-else
                                class="button is-primary"
                                type="button"
                                id="submit-learn"
                                v-on:click="$emit('learn')"
                                :disabled="!canLearn"
                            >Learn</button>
                            <button
                                v-if="selected"
                                class="button is-primary"
                                type="button"
                                id="submit-parse"
                                v-on:click="parseFile"
                            >Parse</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import Papa from "papaparse";
import { MAX_FILE_SIZE } from "../utils/constants.js";

export default {
    name: "header-navigation",
    props: ["canLearn"],
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
            if (this.$refs.file.files[0].size > MAX_FILE_SIZE) {
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