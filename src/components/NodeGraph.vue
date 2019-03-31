<template>
    <div class="table-responsive">
        <table class="bg-secondary node-graph">
            <thead>
                <tr>
                    <td>Inputs</td>
                    <td>Resulting NN</td>
                    <td>Outputs with Error {{Math.ceil(error * 10000)/100}}%</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>some inputs</td>
                    <td>
                        <canvas ref="canvas">Your browser does not support the HTML5 canvas tag.</canvas>
                    </td>
                    <td>
                        <div v-for="(item, key) in predictions" :key="key">{{item}}</div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
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
            circleSize: 30,
            offsetX: 60 * 2 + 40,
            offsetY: 50 * 2 + 10
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
            layer.forEach((node, indexY) => {
                let x = this.circleSize * 2 + indexX * this.offsetX;
                const y = this.circleSize + indexY * this.offsetY;

                this.ctx.beginPath();
                this.ctx.arc(x, y, this.circleSize, 0, pi2);
                this.ctx.strokeStyle = "#cdb79e";
                this.ctx.lineWidth = 5;
                this.ctx.stroke();

                if (!layerTo) {
                    return;
                }

                x += this.circleSize;
                const lineToX = (indexX + 1) * this.offsetX + this.circleSize;
                this.ctx.lineWidth = 2;

                node.m_outputWeights.forEach((lineConnection, indexLine) => {
                    this.ctx.beginPath();
                    this.ctx.moveTo(x, y);
                    this.ctx.lineTo(
                        lineToX,
                        indexLine * this.offsetY + this.circleSize
                    );

                    const r = Math.floor((lineConnection.w + 1) * 255);
                    this.ctx.strokeStyle = `rgb(${r}, ${r}, 0)`;
                    this.ctx.stroke();
                });
            });
        }
    }
};
</script>