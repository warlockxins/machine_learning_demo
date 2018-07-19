new Vue({
  el: "#header",
  data: {
    parsed: false,
    selected: false
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
