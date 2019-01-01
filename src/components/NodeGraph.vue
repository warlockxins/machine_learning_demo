<template>
    <canvas
        ref="canvas"
        width="400"
        height="400"
        style="border:1px solid #d3d3d3;"
    >Your browser does not support the HTML5 canvas tag.</canvas>
</template>

<script>
export default {
    props: {
        network: Object
    },
    data: function() {
        return {
            ctx: null,
            circleSize: 30,
            offsetX: 30 * 2 + 40,
            offsetY: 30 * 2 + 10
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
            this.network.m_layers.forEach((layer, indexX) => {
                this.drawLayer(layer, indexX);
            });
        },
        drawLayer: function(layer, indexX) {
            layer.forEach((node, indexY) => {
                this.ctx.beginPath();
                this.ctx.arc(
                    this.offsetX + indexX * this.offsetX,
                    this.offsetY + indexY * this.offsetY,
                    this.circleSize,
                    0,
                    2 * Math.PI
                );
                this.ctx.stroke();
            });
        },
        drawLayerConnections: function() {}
    }
};
</script>