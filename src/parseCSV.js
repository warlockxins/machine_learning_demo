$(function() {
  $("#submit-parse").click(function() {
    var curFiles = $("#file")[0].files;
    if (curFiles.length === 0) {
      return;
    }
    Papa.parse(curFiles[0], {
      complete: function(results) {
        console.log("Finished:", results.data);
      }
    });
  });
});
