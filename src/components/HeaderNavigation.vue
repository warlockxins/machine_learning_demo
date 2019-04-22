<template>
    <nav class="navbar is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
        <div class="container">
            <div class="navbar-brand">
                <a class="navbar-item">
                    <img src="@/assets/header-logo.png">
                    Machine Learning
                </a>
                <a
                    v-if="$store.state.dataset"
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

            <div
                id="navbar"
                v-if="$store.state.dataset"
                class="navbar-menu"
                :class="{'is-active': menuExpanded}"
            >
                <div class="navbar-start">
                    <a class="navbar-item" href="#" type="button" v-on:click="reset">
                        <span class="icon has-text-primary">
                            <img src="@/assets/rotate-ccw.svg">
                        </span>
                        <span href="#">Clear Dataset</span>
                    </a>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="field is-grouped">
                            <button
                                class="button is-primary"
                                type="button"
                                id="submit-learn"
                                v-on:click="$emit('learn')"
                                :disabled="!canLearn"
                            >Learn</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "header-navigation",
    props: ["canLearn"],
    data: function() {
        return {
            menuExpanded: true
        };
    },
    methods: {
        reset: function() {
            this.$emit("reset");
            this.$store.dispatch("deleteDataset");
        }
    }
};
</script>