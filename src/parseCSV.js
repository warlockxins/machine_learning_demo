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
});

function createTable(results) {
  emptyTable();
  createHeaders(results.data);
  createBody(results.data);
}

function createHeaders(data) {
  var headers = data[0];
  var $headers = $("<thead></thead>");
  var $row = $headers.append("<tr></tr>");
  for (var i = 0; i < headers.length; i++) {
    $row.append("<th>" + headers[i] + "</th>");
  }
  $("#dataTable").append($headers);
}

function createBody(data) {
  var $body = $("<tbody></tbody>");

  var length = Math.min(data.length, 10);
  for (var i = 1; i < length; i++) {
    var $row = $("<tr></tr>");
    for (var j = 0; j < data[i].length; j++) {
      $row.append("<td>" + data[i][j] + "</td>");
    }
    $body.append($row);
  }
  $("#dataTable").append($body);
}

function emptyTable() {
  $("#dataTable").empty();
  $(".collapse").collapse("hide");
}
