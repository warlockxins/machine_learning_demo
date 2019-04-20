<template>
    <section class="hero is-medium is-light">
        <div class="container">
            <div class="hero-body columns">
                <div class="column">
                    <h1 class="title">Machine Learning</h1>
                    <h2 class="subtitle">A simple Neural Network in action</h2>
                </div>
                <div class="column">
                    <div class="field">
                        <div class="file is-medium is-boxed is-centered" ref="fileDrop">
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
                                    <span class="file-label">Upload Your .CSV</span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
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