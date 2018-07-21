Vue.component("data-table", {
  template: "#table-template",
  computed: {
    headers: function() {
      return this.dataset.data[0];
    },
    data: function() {
      return this.dataset.data.slice(1, 5);
    }
  },
  props: ["dataset"]
});
