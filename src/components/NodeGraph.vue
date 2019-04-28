<template>
    <div class="box node-graph">
        <table>
            <thead>
                <tr>
                    <td>Inputs</td>
                    <td>Neural Network</td>
                    <td>Outputs with Error {{ Math.ceil(error * 10000)/100 }}%</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <div
                            v-for="(item, key) in record"
                            :key="key"
                            class="node-graph__row node-graph__row_right"
                        >
                            <!-- simple form field -->
                            <div class="field is-horizontal">
                                <div class="field-label is-small">
                                    <label class="label">{{item.name}}</label>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <p class="control">
                                            <input
                                                class="input"
                                                type="text"
                                                placeholder="Text input"
                                                :value="item.value"
                                                disabled
                                            >
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <!-- End simple form field -->
                        </div>
                    </td>
                    <td>
                        <canvas ref="canvas">Your browser does not support the HTML5 canvas tag.</canvas>
                    </td>
                    <td>
                        <div
                            v-for="(item, key) in predictions"
                            :key="key"
                            class="node-graph__row node-graph__row_left"
                        >
                            <span
                                v-if="(item instanceof Object)"
                                :style="{opacity: valueOpacity(item.value)}"
                            >
                                {{ item.key }}:
                                {{ Math.ceil(item.value * 1000)/1000 }}
                            </span>
                            <span v-else>{{ Math.ceil(item * 1000)/1000 }}</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
const pi2 = 2 * Math.PI;
const circleSize = 20;
const offsetX = 100;

export default {
    props: {
        network: Object,
        predictions: Array,
        error: Number,
        record: Array
    },
    data: function() {
        return {
            ctx: null
        };
    },
    mounted() {
        this.ctx = this.$refs.canvas.getContext("2d");
        this.calculateDimensions();
        this.drawNetwork();
    },
    watch: {
        network: function() {
            this.calculateDimensions();
            this.drawNetwork();
        }
    },
    methods: {
        calculateDimensions() {
            let maxCount = 0;
            this.network.net.m_layers.forEach(layer => {
                maxCount = Math.max(maxCount, layer.length);
            });

            this.$refs.canvas.width =
                this.network.net.m_layers.length * offsetX;
            this.$refs.canvas.height = this.yCoord(maxCount);
        },
        drawNetwork: function() {
            this.ctx.clearRect(
                0,
                0,
                this.$refs.canvas.width,
                this.$refs.canvas.height
            );

            this.network.net.m_layers.forEach((layer, indexX) => {
                this.drawLayer(
                    layer,
                    indexX,
                    this.network.net.m_layers[indexX + 1]
                );
            });
        },
        drawLayer: function(layer, indexX, layerTo) {
            let x = 0;
            let y = 0;
            let lineToX = 0;

            layer.forEach((node, indexY) => {
                x = circleSize * 2 + indexX * offsetX;
                y = this.yCoord(indexY);

                this.ctx.beginPath();
                this.ctx.arc(x, y, circleSize, 0, pi2);
                this.ctx.fillStyle = "#00d1b2";
                this.ctx.fill();

                if (!layerTo) {
                    return;
                }

                x += circleSize;
                lineToX = (indexX + 1) * offsetX + circleSize;
                this.ctx.lineWidth = 2;

                node.m_outputWeights.forEach((lineConnection, indexLine) => {
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y);
                    this.ctx.lineTo(lineToX, this.yCoord(indexLine));

                    this.ctx.strokeStyle = this.weigthColor(lineConnection.w);
                    this.ctx.stroke();
                });
            });
        },
        yCoord(index) {
            // Needs to align with `.node-graph .node-graph__row`
            return (circleSize * 2 + 10) * index + circleSize;
        },
        weigthColor: function(value) {
            const r = Math.floor((value + 1) * 255);
            return `rgb(${r}, ${r / 2}, 0)`;
        },
        valueOpacity: function(value) {
            return Math.max(0.3, value);
        }
    }
};
</script>