<template>
    <div>
        <section class="hero is-medium is-light">
            <div class="container">
                <div class="hero-body columns">
                    <div class="column">
                        <h1 class="title">Machine Learning</h1>
                        <h2 class="subtitle">A simple Neural Network in action</h2>
                    </div>
                    <div class="column">
                        <div class="field">
                            <div class="file is-large is-boxed is-centered" ref="fileDrop">
                                <label class="file-label">
                                    <input
                                        class="file-input"
                                        type="file"
                                        name="resume"
                                        v-on:change="onFileInput"
                                    >
                                    <span class="file-cta">
                                        <span class="file-icon">
                                            <img src="@/assets/upload.svg">
                                        </span>
                                        <span class="file-label">Upload Your .CSV data</span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- text description -->
        <div class="container">
            <section class="section">
                <h1 class="title is-1">About</h1>
                <p>
                    What is
                    <b>Machine learning</b>, what is
                    <b>Neural Network</b>?
                </p>
                <p>These days we hear all about fancy face recognition technologies, or impressive Artificial intelligence for dog and human like robots. So is is hard to understand how all of it really works.</p>
                <p>
                    Most of current
                    <b>Machine learning</b> tutorials are also centered around coding in
                    <a
                        rel="nofollow"
                        href="https://www.python.org/"
                    >python</a> and specifically
                    <a rel="nofollow" href="https://www.numpy.org/">numpy</a> which is the preferred way. But how can a beginner learn and use it to it immediately and understand data all together?
                </p>
                <p>
                    <b>This</b> project is aimed to teach beginners such as
                    <b>myself</b> to quickly grasp the main aspect of Machine learning -
                    <b>Data.</b>
                </p>
                <br>
                <h4 class="title is-4">Data</h4>
                <p>To start off you have to decide the area you want to learn about and make proper predictions on.</p>
                <p>You will have to understand the area/topic of interest.</p>
                <p>
                    The traditional dataset to train on is
                    <a
                        rel="nofollow"
                        href="https://en.wikipedia.org/wiki/Iris_flower_data_set"
                    >Iris flower dataset</a>
                </p>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    mounted() {
        const { fileDrop } = this.$refs;
        this.dragAndDropCapable = this.isDragAndDropCapable();
        if (this.dragAndDropCapable) {
            [
                "drag",
                "dragstart",
                "dragend",
                "dragover",
                "dragenter",
                "dragleave",
                "drop"
            ].forEach(event => {
                document.body.addEventListener(event, e => {
                    e.preventDefault();
                    e.stopPropagation();
                });
            });
            fileDrop.addEventListener("drop", this.dropEvent);
        }
    },
    beforeDestroy() {
        const { fileDrop } = this.$refs;
        fileDrop.removeEventListener("drop", this.dropEvent);
    },
    methods: {
        dropEvent(e) {
            const files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.onFileChanged(files[0]);
        },
        onFileInput(ev) {
            if (ev.target.files) {
                this.onFileChanged(ev.target.files[0]);
            }
        },
        onFileChanged(file) {
            this.$store.dispatch("createDatasetFromFile", file);
        },
        isDragAndDropCapable() {
            const { fileDrop } = this.$refs;
            return (
                ("draggable" in fileDrop ||
                    ("ondragstart" in fileDrop && "ondrop" in fileDrop)) &&
                "FormData" in window &&
                "FileReader" in window
            );
        }
    }
};
</script>