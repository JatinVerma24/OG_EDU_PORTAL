// ============================================================================
// Team OG — Recruitment Form Backend (Google Apps Script)
// ----------------------------------------------------------------------------
// SETUP:
//   1. Open your Google Sheet > Extensions > Apps Script.
//   2. Delete any boilerplate, paste this whole file, and Save.
//   3. Deploy > New deployment > type "Web app".
//        - Execute as: Me
//        - Who has access: Anyone
//   4. Copy the Web app URL (ends in /exec) into recruitment/.env as
//      VITE_APPS_SCRIPT_URL=...
//
// The header row is created automatically the first time a submission arrives,
// so you don't have to set it up by hand. Rows are always written to the
// "Responses" tab (created if it doesn't exist yet).
// ============================================================================

// The Google Sheet that stores submissions. This ID is the long part of your
// Sheet URL: https://docs.google.com/spreadsheets/d/<THIS_ID>/edit
var SHEET_ID = '11fRZC7U8JiFscpm7QLCIh6NwFOnDrvXazBB3s2IsBr4';

// Name of the tab that stores submissions (matches recruitment/README.md).
var SHEET_NAME = 'Responses';

// Header row order. Must stay in sync with the appendRow() call below and with
// the field names the website form sends.
var HEADERS = [
  'Timestamp', 'Name', 'Phone', 'Email', 'City',
  'Role', 'Portfolio Link', 'Experience', 'Why Join'
];

// Simple health-check so visiting the URL in a browser confirms it's live.
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'success', message: 'API is ready. Send POST requests.' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Returns the "Responses" sheet, creating it (with headers) if missing.
function getResponsesSheet_() {
  // Open the sheet by ID (works whether the script is bound or standalone).
  // Falls back to the active spreadsheet if SHEET_ID is left blank.
  var ss = SHEET_ID
    ? SpreadsheetApp.openById(SHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

  // Add the header row once, on a fresh/empty sheet.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    // The website posts JSON as text/plain to avoid a CORS preflight, so parse
    // the raw request body here.
    var data = JSON.parse(e.postData.contents);
    var sheet = getResponsesSheet_();

    sheet.appendRow([
      new Date(),
      data.name,
      data.phone,
      data.email,
      data.city,
      data.role,
      data.portfolio,
      data.experience,
      data.whyJoin
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Application submitted successfully!' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: (error && error.message) || 'Submission failed.' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
