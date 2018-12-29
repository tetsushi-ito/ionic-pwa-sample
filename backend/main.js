function createJsonOutput(json) {
  return ContentService.createTextOutput(JSON.stringify(json)).setMimeType(ContentService.MimeType.TEXT);
}

function loadTasks() {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getActiveSheet();

  var lastRowIndex = sheet.getLastRow();

  if (lastRowIndex > 0) {
    var data = sheet.getRange(1, 1, lastRowIndex, 3).getValues();

    return createJsonOutput(data.map(function(item) {
      return {
        id: item[0],
        title: item[1],
        description: item[2],
      };
    }));
  } else {
    return createJsonOutput([]);
  }
}

function createTask(data) {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getActiveSheet();

  var values = [
    "id-" + (new Date()).getTime().toString() + "-" + Math.ceil(Math.random() * 10000).toString(),
    data.title,
    data.description,
  ];

  sheet.appendRow(values);

  return createJsonOutput({ message: 'Added!' });
}

function removeTask(data) {
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getActiveSheet();

  var id = data.id;
  var database = sheet.getDataRange().getValues();

  for(var i = 0; i < database.length; i++) {
    if(database[i][0] === id) {
      sheet.deleteRow(i + 1);
      return createJsonOutput({ message: 'Removed!' });
    }
  }

  return createJsonOutput({ message: 'Record Not Found.' });
}

function doPost(e) {
  if (e == null || e.postData == null || e.postData.contents == null) {
    return;
  }

  var requestJSON = e.postData.contents;
  var requestObj = JSON.parse(requestJSON);

  switch(requestObj.action) {
    case 'LOAD_TASKS':
      return loadTasks();
    case 'CREATE_TASK':
      return createTask(requestObj);
    case 'REMOVE_TASK':
      return removeTask(requestObj);
    default:
      return createJsonOutput({ message: 'Action Not Found.' });
  }
}
