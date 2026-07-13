// ============================================================
// GOOGLE APPS SCRIPT — Deploy this in Google Apps Script editor
// (This file is for reference only, not used by the website)
// ============================================================
//
// SETUP STEPS:
// 1. Go to https://script.google.com and open your project
// 2. Delete all code in Code.gs and paste this entire script
//    (Do NOT nest inside function myFunction — keep at top level)
// 3. Save (Cmd+S)
// 4. Verify function dropdown shows: doGet, doPost, getOrCreateSheet
// 5. Deploy > Manage deployments > pencil > Version: New version > Deploy
// 6. Authorize when prompted (now includes Gmail permission for sending emails)
//
// UPDATE: On registration, an automatic confirmation email is sent
// with workshop details, speaker background, and preparation steps.
// ============================================================

var SHEET_NAME = 'Workshop Registrations';

// ── UPDATE THESE FOR EACH WORKSHOP ──
var ZOOM_LINK = 'https://us06web.zoom.us/j/7987024723?pwd=9GKaBgbtKFmuOWJ8xwGWb0gyyFDcCX.1&omn=83307645538';
var WORKSHOP_PAGE = 'https://frixadata68.github.io/interview-rubric-workshop/';
var ADMIN_EMAIL = 'jfrix01@gmail.com';

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

function sendConfirmationEmail(firstName, email) {
  var subject = 'You\'re Registered — The Pivot Point Network Workshop: Monday, July 13';

  var htmlBody = '<!DOCTYPE html><html><head><style>' +
    'body { font-family: Arial, Helvetica, sans-serif; background: #f7f5f0; margin: 0; padding: 20px; color: #1a1a18; }' +
    '.container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e0ddd6; }' +
    '.header { background: linear-gradient(160deg, #0f1424 0%, #1a2a4a 60%, #0d1a3a 100%); padding: 32px 28px; }' +
    '.header h1 { font-size: 22px; color: #f5f2ec; margin: 0 0 6px; }' +
    '.header p { font-size: 14px; color: rgba(245,242,236,0.7); margin: 0; }' +
    '.tag { display: inline-block; font-size: 11px; font-weight: bold; letter-spacing: 0.08em; text-transform: uppercase; color: #7db8d4; background: rgba(125,184,212,0.12); border: 1px solid rgba(125,184,212,0.3); padding: 3px 10px; border-radius: 12px; margin-bottom: 14px; }' +
    '.body { padding: 28px; }' +
    '.body p { font-size: 14px; line-height: 1.7; color: #4a4a46; margin: 0 0 16px; }' +
    '.body h2 { font-size: 17px; color: #1a1a18; margin: 24px 0 10px; }' +
    '.body h3 { font-size: 15px; color: #1a2a4a; margin: 20px 0 8px; }' +
    '.detail-row { display: flex; margin-bottom: 8px; }' +
    '.detail-label { font-size: 13px; font-weight: bold; color: #1a1a18; width: 80px; flex-shrink: 0; }' +
    '.detail-value { font-size: 13px; color: #4a4a46; }' +
    '.speaker-box { background: #f0f3f8; border-radius: 10px; padding: 18px; margin: 16px 0; }' +
    '.speaker-name { font-size: 16px; font-weight: bold; color: #1a1a18; margin-bottom: 4px; }' +
    '.speaker-role { font-size: 13px; color: #6b6b67; margin-bottom: 10px; }' +
    '.speaker-bio { font-size: 13px; color: #4a4a46; line-height: 1.65; }' +
    '.stat { display: inline-block; font-size: 11px; font-weight: bold; color: #0d2040; background: #c8ddef; padding: 3px 10px; border-radius: 10px; margin: 3px 3px 3px 0; }' +
    '.checklist { list-style: none; padding: 0; margin: 0; }' +
    '.checklist li { font-size: 14px; color: #2a2a26; padding: 8px 0; border-bottom: 1px solid #f0ede6; line-height: 1.55; }' +
    '.checklist li:last-child { border-bottom: none; }' +
    '.check { color: #1a5a9a; font-weight: bold; margin-right: 8px; }' +
    '.btn { display: inline-block; background: #2d5a8f; color: #ffffff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-size: 15px; font-weight: bold; margin: 8px 0; }' +
    '.footer { padding: 20px 28px; border-top: 1px solid #e0ddd6; text-align: center; font-size: 12px; color: #888780; line-height: 1.7; }' +
    'a { color: #1a5a9a; }' +
    '</style></head><body>' +

    '<div class="container">' +

    // Header
    '<div class="header">' +
    '<div class="tag">Confirmed Registration</div>' +
    '<h1>Interview Rubric Creator: AI-Powered Tools for Landing Your Next Role</h1>' +
    '<p>The Pivot Point Network Virtual Workshop</p>' +
    '</div>' +

    // Body
    '<div class="body">' +
    '<p>Hi ' + firstName + ',</p>' +
    '<p>You\'re confirmed for tomorrow\'s workshop! Here\'s everything you need.</p>' +

    // Event details
    '<h2>Event Details</h2>' +
    '<div class="detail-row"><span class="detail-label">Date:</span><span class="detail-value">Monday, July 13, 2026</span></div>' +
    '<div class="detail-row"><span class="detail-label">Time:</span><span class="detail-value">11:00 AM – 12:00 PM PST</span></div>' +
    '<div class="detail-row"><span class="detail-label">Where:</span><span class="detail-value">Live via Zoom</span></div>' +
    '<div class="detail-row"><span class="detail-label">Zoom:</span><span class="detail-value"><a href="' + ZOOM_LINK + '">' + ZOOM_LINK + '</a></span></div>' +
    '<div class="detail-row"><span class="detail-label">Host:</span><span class="detail-value">Jeff Frix, Moderator — The Pivot Point Network</span></div>' +

    // Speaker
    '<h2>Your Guest Speaker</h2>' +
    '<div class="speaker-box">' +
    '<div class="speaker-name">Bakari Holmes</div>' +
    '<div class="speaker-role">Software Engineer · Educator · Founder, Interview Rubric Creator</div>' +
    '<div class="speaker-bio">' +
    'Bakari is a full-stack software engineer with dual degrees in Physics and Software Engineering. He\'s worked at <strong>23andMe</strong>, <strong>Roblox</strong>, <strong>Course Hero</strong>, and <strong>Accenture</strong>, and was a <strong>STEM Master Teacher</strong> in Palo Alto before entering industry. His graduate research in authentic assessment led him to build <a href="https://interviewrubric.com">InterviewRubric.com</a> — an AI-powered tool that transforms job descriptions into structured interview rubrics. He currently teaches at <strong>CodePath</strong> (Georgia State University), mentors through <strong>App Academy</strong>, and writes the "Tech and AI Real Talk" newsletter. He\'s also a <strong>7× award-winning soul and jazz vocalist</strong>.' +
    '</div>' +
    '<div style="margin-top: 10px;">' +
    '<span class="stat">23andMe · Roblox · Accenture</span>' +
    '<span class="stat">STEM Master Teacher</span>' +
    '<span class="stat">CodePath Instructor</span>' +
    '<span class="stat">7× Award-Winning Musician</span>' +
    '</div>' +
    '</div>' +

    // Agenda
    '<h2>What You\'ll Learn</h2>' +
    '<ol style="font-size: 14px; color: #4a4a46; line-height: 1.7; padding-left: 20px; margin: 0 0 16px;">' +
    '<li><strong>The problem Bakari set out to solve</strong> — why most interview processes are broken</li>' +
    '<li><strong>From classroom to codebase</strong> — how his education background gave him a unique framework</li>' +
    '<li><strong>Live demo of Interview Rubric Creator</strong> — hands-on walkthrough of the tool</li>' +
    '<li><strong>Practical tips for your next interview</strong> — actionable strategies for engineers in transition</li>' +
    '<li><strong>Live Q&A</strong> — bring your best questions for Bakari</li>' +
    '</ol>' +

    // Prep steps
    '<h2>How to Prepare (Action Items)</h2>' +
    '<ul class="checklist">' +
    '<li><span class="check">&#10003;</span> Visit <a href="https://interviewrubric.com">InterviewRubric.com</a> and try generating a rubric from a job description you\'re interested in.</li>' +
    '<li><span class="check">&#10003;</span> Have a job description handy (yours or one you\'re targeting) so you can follow along during the live demo.</li>' +
    '<li><span class="check">&#10003;</span> Come with <strong>3 thoughtful, insightful questions</strong> prepared for Bakari — the more specific, the better.</li>' +
    '<li><span class="check">&#10003;</span> Review <a href="https://www.linkedin.com/in/bakariholmes/">Bakari\'s LinkedIn profile</a> to familiarize yourself with his background.</li>' +
    '</ul>' +

    '<div style="text-align: center; margin: 28px 0 8px;">' +
    '<a href="' + ZOOM_LINK + '" class="btn">Join the Zoom Meeting</a>' +
    '</div>' +

    '<p style="font-size: 13px; color: #888780; text-align: center;">See you tomorrow at 11:00 AM PST!</p>' +
    '</div>' +

    // Footer
    '<div class="footer">' +
    'Hosted by <strong>Jeff Frix</strong> · Moderator, The Pivot Point Network<br>' +
    'A Zoom community of experienced software engineers & developers in career transition<br>' +
    '<a href="' + WORKSHOP_PAGE + '">View the full workshop page</a>' +
    '</div>' +

    '</div></body></html>';

  MailApp.sendEmail({
    to: email,
    subject: subject,
    htmlBody: htmlBody
  });
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = getOrCreateSheet();
    var sheet = ss.getActiveSheet();

    var firstName = data.firstName || '';
    var email = data.email || '';

    sheet.appendRow([
      new Date().toISOString(),
      firstName,
      data.lastName || '',
      email,
      data.background || ''
    ]);

    // Send confirmation email to registrant
    if (email) {
      sendConfirmationEmail(firstName, email);
    }

    // Notify admin of new registration
    MailApp.sendEmail({
      to: ADMIN_EMAIL,
      subject: 'New Workshop Registration: ' + firstName + ' ' + (data.lastName || ''),
      htmlBody: '<p><strong>New registration for the July 13 workshop:</strong></p>' +
        '<ul>' +
        '<li><strong>Name:</strong> ' + firstName + ' ' + (data.lastName || '') + '</li>' +
        '<li><strong>Email:</strong> ' + email + '</li>' +
        '<li><strong>Background:</strong> ' + (data.background || 'Not specified') + '</li>' +
        '<li><strong>Time:</strong> ' + new Date().toLocaleString() + '</li>' +
        '</ul>' +
        '<p><a href="' + WORKSHOP_PAGE + 'registrations.html">View all registrations</a></p>'
    });

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Registration saved and email sent' }))
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
