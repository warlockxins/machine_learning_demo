new Vue({
  el: "#app",
  data: {
    data: undefined
  },
  methods: {
    setData: function(results) {
      this.data = results;
    }
  }
});
