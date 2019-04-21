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
                        <div class="field" id="upload_field">
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
                                        <span class="file-label">200 KB MAX</span>
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
                    <b>Data</b>. The data that you feel is important and want to make decisions on.
                </p>
                <br>
                <h4 class="title is-4">The Data</h4>
                <p>So to start off you have to decide the area you want to learn about and make proper predictions on.</p>
                <p>
                    You will have to understand the area/topic of interest. Just to have a proof of concept lets have the
                    <b>following example</b>.
                </p>
                <p>
                    The traditional dataset to train on is
                    <a
                        rel="nofollow"
                        href="https://en.wikipedia.org/wiki/Iris_flower_data_set"
                    >Iris flower dataset</a>. Its relevant data is available in CSV format
                    <a
                        rel="nofollow"
                        href="/test-data/iris.csv"
                    >Here</a> (right click and download).
                </p>

                <br>
                <h4 class="title is-4">The Learning</h4>
                <p>
                    Once the dataset is decided, it's time to put it to test.
                    <a
                        href="#upload_field"
                    >Upload the csv by dropping it on the box</a> waay up - here we'll use the
                    <a rel="nofollow" href="/test-data/iris.csv">Iris CSV</a>. On the new screen you will see CSVs data, and notice that in the presented table you should select specific coulumns as
                    <b>output/label</b> as displayed below.
                </p>

                <br>
                <img class="box" src="@/assets/tutorial/tut1.png" alt="Select data inputs/outputs">
                <br>

                <p>
                    Now when the data is setup, press Lean button in top right corner. This will only have a few learning steps done in the background.
                    <br>At this point you can observe the Graph below the Table, and already test the Neural Network by clicking on any Tables record and see if the output/prediction is anyway similar to expected output.
                    <br>If current prediction is off, then keep clicking on that "Learn" button and test outputs, also observing as Prediction error decreases (hopefully).
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