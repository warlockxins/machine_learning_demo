<template>
    <canvas
        ref="canvas"
        width="400"
        height="400"
        style="border:1px solid #d3d3d3;"
    >Your browser does not support the HTML5 canvas tag.</canvas>
</template>

<script>
const pi2 = 2 * Math.PI;
export default {
    props: {
        network: Object
    },
    data: function() {
        return {
            ctx: null,
            circleSize: 30,
            offsetX: 60 * 2 + 40,
            offsetY: 60 * 2 + 10
        };
    },
    mounted() {
        this.ctx = this.$refs.canvas.getContext("2d");
        this.drawNetwork();
    },
    methods: {
        drawNetwork: function() {
            this.ctx.clearRect(
                0,
                0,
                this.$refs.canvas.width,
                this.$refs.canvas.height
            );

            for (
                let indexX = 0;
                indexX < this.network.m_layers.length;
                indexX++
            ) {
                const layer = this.network.m_layers[indexX];
                let layerTo;
                if (indexX !== this.network.m_layers.length - 1) {
                    layerTo = this.network.m_layers[indexX + 1];
                }
                this.drawLayer(layer, indexX, layerTo);
            }
        },
        drawLayer: function(layer, indexX, layerTo) {
            layer.forEach((node, indexY) => {
                const x = this.offsetX + indexX * this.offsetX;
                const y = this.offsetY + indexY * this.offsetY;

                this.ctx.beginPath();
                this.ctx.arc(x, y, this.circleSize, 0, pi2);
                this.ctx.stroke();

                if (!layerTo) {
                    return;
                }

                const layerToX = x + this.circleSize;
                layerTo.forEach((lineNode, indexLine) => {
                    this.ctx.beginPath();
                    this.ctx.moveTo(layerToX, y);
                    this.ctx.lineTo(
                        this.offsetX +
                            (indexX + 1) * this.offsetX -
                            this.circleSize,
                        this.offsetY + indexLine * this.offsetY
                    );
                    this.ctx.stroke();
                });
            });
        }
    }
};
</script>