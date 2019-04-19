<template>
    <table class="box node-graph">
        <thead>
            <tr>
                <td>Inputs</td>
                <td>Neural Network</td>
                <td>Outputs with Error {{ Math.ceil(error * 10000)/100 }}%</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>some inputs</td>
                <td>
                    <canvas ref="canvas">Your browser does not support the HTML5 canvas tag.</canvas>
                </td>
                <td>
                    <div v-for="(item, key) in predictions" :key="key" class="output-val">
                        <span
                            v-if="(item instanceof Object)"
                            :style="{opacity: valueOpacity(item.value)}"
                        >{{ item.key }}: {{ item.value }}</span>
                        <span v-else>{{ item }}</span>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
const pi2 = 2 * Math.PI;
export default {
    props: {
        network: Object,
        predictions: Array,
        error: Number
    },
    data: function() {
        return {
            ctx: null,
            circleSize: 20,
            offsetX: 60 * 2 + 40,
            offsetY: 40 * 2
        };
    },
    mounted() {
        this.ctx = this.$refs.canvas.getContext("2d");
        this.calculateDimensions();
    },
    methods: {
        calculateDimensions() {
            let maxCount = 0;
            this.network.m_layers.forEach(layer => {
                maxCount = Math.max(maxCount, layer.length);
            });

            this.$refs.canvas.width =
                this.network.m_layers.length * this.offsetX;
            this.$refs.canvas.height = maxCount * this.offsetY;
        },
        drawNetwork: function() {
            this.ctx.clearRect(
                0,
                0,
                this.$refs.canvas.width,
                this.$refs.canvas.height
            );

            this.network.m_layers.forEach((layer, indexX) => {
                this.drawLayer(
                    layer,
                    indexX,
                    this.network.m_layers[indexX + 1]
                );
            });
        },
        drawLayer: function(layer, indexX, layerTo) {
            let x = 0;
            let y = 0;
            let lineToX = 0;

            layer.forEach((node, indexY) => {
                x = this.circleSize * 2 + indexX * this.offsetX;
                y = this.circleSize + indexY * this.offsetY + 10;

                this.ctx.beginPath();
                this.ctx.arc(x, y, this.circleSize, 0, pi2);
                this.ctx.fillStyle = "#00d1b2";
                this.ctx.fill();

                if (!layerTo) {
                    return;
                }

                x += this.circleSize;
                lineToX = (indexX + 1) * this.offsetX + this.circleSize;
                this.ctx.lineWidth = 2;

                node.m_outputWeights.forEach((lineConnection, indexLine) => {
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y);
                    this.ctx.lineTo(
                        lineToX,
                        indexLine * this.offsetY + this.circleSize + 10
                    );

                    this.ctx.strokeStyle = this.weigthColor(lineConnection.w);
                    this.ctx.stroke();
                });
            });
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