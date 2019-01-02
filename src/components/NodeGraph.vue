<template>
    <canvas
        ref="canvas"
        width="800"
        height="600"
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
                const x = this.circleSize + indexX * this.offsetX;
                const y = this.circleSize + indexY * this.offsetY;

                this.ctx.beginPath();
                this.ctx.arc(x, y, this.circleSize, 0, pi2);
                this.ctx.strokeStyle = "#000000";
                this.ctx.stroke();

                if (!layerTo) {
                    return;
                }

                const layerToX = x + this.circleSize;
                layerTo.forEach((lineNode, indexLine) => {
                    this.ctx.beginPath();
                    this.ctx.moveTo(layerToX, y);
                    this.ctx.lineTo(
                            (indexX + 1) * this.offsetX,
                        indexLine * this.offsetY + this.circleSize
                    );

                    const color = Math.random() > 0.5 ? "red" : "blue";
                    this.ctx.strokeStyle = color;
                    this.ctx.stroke();
                });
                
            });
        }
    }
};
</script>