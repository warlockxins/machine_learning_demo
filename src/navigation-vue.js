Vue.component("header-navigation", {
  template: "#header-template",
  data() {
    return {
      parsed: false,
      selected: false
    };
  },
  methods: {
    parseFile: function() {
      var curFiles = this.$refs.file.files;
      if (curFiles.length === 0) {
        return;
      }
      var self = this;
      Papa.parse(curFiles[0], {
        complete: function(results) {
          self.parsed = true;
          self.selected = false;
          self.$refs.file.value = null;
          createTable(results);
        }
      });
    },
    onFile: function() {
      var curFiles = this.$refs.file.files;
      if (curFiles.length > 0) {
        this.selected = true;
      }
    }
  }
});

new Vue({
  el: "#app"
});
