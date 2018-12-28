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
    // network: Object
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
  }
  // watch: {
  //   network: function(net) {
  //     this.ctx.clearRect(
  //       0,
  //       0,
  //       this.$refs.canvas.width,
  //       this.$refs.canvas.height
  //     );
  //     const self = this;
  //     net.m_layers.forEach(function(layer, indexX) {
  //       layer.forEach(function(node, indexY) {
  //         self.ctx.beginPath();
  //         self.ctx.arc(
  //           self.offsetX + indexX * self.offsetX,
  //           self.offsetY + indexY * self.offsetY,
  //           self.circleSize,
  //           0,
  //           2 * Math.PI
  //         );
  //         self.ctx.stroke();
  //       });
  //     });
  //   }
  // }
};
</script>