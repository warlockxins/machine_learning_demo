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
    $row.append(
      '<th id="' +
        headers[i] +
        '">' +
        headers[i] +
        createCheckBox("use" + headers[i], "Use") +
        createFieldType(headers[i]) +
        "</th>"
    );
  }
  $("#dataTable").append($headers);
}
function createCheckBox(id, text) {
  return (
    '<div class="form-group form-check">' +
    '<input type="checkbox" class="form-check-input" id="' +
    id +
    '">' +
    '<label class="form-check-label" for="' +
    id +
    '">' +
    text +
    "</label>" +
    "</div>"
  );
}

function createFieldType(name) {
  //https://www.tutorialrepublic.com/codelab.php?topic=faq&file=jquery-get-selected-radio-button-value
  return (
    '<div class="form-check form-check-inline">' +
    '<input class="form-check-input" type="radio" name="io' +
    name +
    '" id="fieldRadio1" value="in">' +
    '<label class="form-check-label" for="fieldRadio1">input</label>' +
    "</div>" +
    '<div class="form-check form-check-inline">' +
    '<input class="form-check-input" type="radio" name="io' +
    name +
    '" id="fieldRadio2" value="out">' +
    '<label class="form-check-label" for="fieldRadio2">output</label>' +
    "</div>"
  );
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
