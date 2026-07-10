// ============================================================
// GOOGLE APPS SCRIPT — Deploy this in Google Apps Script editor
// (This file is for reference only, not used by the website)
// ============================================================
//
// SETUP STEPS:
// 1. Go to https://script.google.com and create a new project
// 2. Delete any code in the editor and paste this entire script
// 3. Click "Deploy" > "New deployment"
// 4. Select type: "Web app"
// 5. Set "Execute as": Me
// 6. Set "Who has access": Anyone
// 7. Click "Deploy" and authorize when prompted
// 8. Copy the Web App URL and paste it into index.html and registrations.html
//    (replace YOUR_GOOGLE_APPS_SCRIPT_URL_HERE)
//
// A new Google Sheet will be created automatically on first submission.
// ============================================================

var SHEET_NAME = 'Workshop Registrations';
var SPREADSHEET_ID = null; // Will be set after first run

function getOrCreateSheet() {
  var files = DriveApp.getFilesByName(SHEET_NAME);
  var ss;
  if (files.hasNext()) {
    ss = SpreadsheetApp.open(files.next());
  } else {
    ss = SpreadsheetApp.create(SHEET_NAME);
    var sheet = ss.getActiveSheet();
    sheet.appendRow(['Timestamp', 'First Name', 'Last Name', 'Email', 'Background']);
    sheet.getRange(1, 1, 1, 5).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return ss;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = getOrCreateSheet();
    var sheet = ss.getActiveSheet();

    sheet.appendRow([
      new Date().toISOString(),
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.background || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Registration saved' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  try {
    var ss = getOrCreateSheet();
    var sheet = ss.getActiveSheet();
    var data = sheet.getDataRange().getValues();

    var headers = data[0];
    var rows = [];
    for (var i = 1; i < data.length; i++) {
      var row = {};
      for (var j = 0; j < headers.length; j++) {
        row[headers[j]] = data[i][j];
      }
      rows.push(row);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', data: rows }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
