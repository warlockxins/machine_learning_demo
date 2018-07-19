$(function() {
  $("#submit-parse").click(function() {
    var curFiles = $("#file")[0].files;
    if (curFiles.length === 0) {
      emptyTable();
      //TODO - hide parse button
      return;
    }
    Papa.parse(curFiles[0], {
      complete: createTable
    });
  });

  $("#submit-learn").click(function() {
    var typeValue = checkIO("sepal_length");
    console.log("value", typeValue);
  });
});

function checkIO(id) {
  return $("input[name='io" + id + "']:checked").val();
}

// console.log("last value is: ", checkIO("species"));
