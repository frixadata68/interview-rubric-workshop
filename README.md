# Pivot Point Network — Workshop Builder Guide

A step-by-step playbook for building the next Pivot Point Network virtual workshop landing page. Follow this guide to go from "we have a speaker" to "registrations are open" — target completion by **July 20, 2026**.

---

## What You'll Need Before Starting

- [ ] **Guest speaker confirmed** — name, title/role, and their agreement to present
- [ ] **Date and time** — day, start/end time, timezone
- [ ] **Speaker background** — LinkedIn profile, career history, notable roles/achievements
- [ ] **Product or project** — what the speaker has built (URL, description, key features)
- [ ] **Speaker photo** — save a high-quality image (PNG or JPG) to your Downloads folder
- [ ] **Registration code** — pick a 5-digit code attendees will enter to register
- [ ] **Google account access** — for the Google Apps Script backend
- [ ] **Zoom link** — the meeting URL for the workshop
- [ ] **Admin email** — where registration notifications are sent (currently jfrix01@gmail.com)

---

## Step-by-Step Build Process

### 1. Create the Landing Page

Open Claude Code in your `~/Downloads` directory and provide:

```
Create the next Pivot Point Network workshop:
- Date: [date and time]
- Guest speaker: [name]
- They built [product/project URL]
- Registration code: [code]
```

Claude will:
- Research the speaker and their product
- Generate `index.html` using the established design system (Lora + DM Sans fonts, dark hero, card layout, registration form)
- Shift the color palette to give the new workshop its own identity
- Tailor the agenda, prerequisites, and speaker bio to the topic

### 2. Add the Speaker Photo

1. Save the speaker's photo to the project folder (e.g., `SpeakerNamePhoto.png`)
2. Tell Claude the filename — it will embed it in the speaker card
3. Ask Claude to adjust the size if needed

### 3. Set Up the Google Sheets Backend

You can **reuse the existing Google Apps Script** or create a new one per workshop.

#### Option A: Reuse Existing Script (Recommended)

The Google Apps Script from Workshop 2 is already deployed. The registration data goes to a Google Sheet called **"Workshop Registrations"** in your Google Drive. If you want to keep all workshops in one sheet, just use the same script URL.

Current working script URL:
```
https://script.google.com/macros/s/AKfycbzYyQPQOOj37s4UwiTg55ItRjlZNn8MMsCYsMrcadt6YLNxwChI7o5AYrzh4U1Uk2IzGA/exec
```

#### Option B: Create a New Script (Separate Sheet per Workshop)

1. Go to [script.google.com](https://script.google.com) and create a new project
2. Delete all code in `Code.gs` and paste the contents of `google-apps-script.js`
   - **Important:** Functions must be at the **top level** — do NOT nest them inside `function myFunction() {}`
3. Save (Cmd+S)
4. Verify the function dropdown shows: `doGet`, `doPost`, `getOrCreateSheet`, `sendConfirmationEmail`
5. Deploy > New deployment > Web app > Execute as: Me > Who has access: **Anyone**
6. Authorize when prompted
7. Copy the Web App URL and give it to Claude

#### Common Google Apps Script Pitfalls

| Problem | Cause | Fix |
|---------|-------|-----|
| "Script function not found: doGet" | Functions nested inside `myFunction()` | Delete all code, re-paste at top level, verify dropdown shows `doGet` |
| "Script function not found: doGet" after fix | Deployed old version | Deploy > Manage deployments > pencil > Version: **New version** > Deploy |
| Redirects to Google login | Access set to "Only myself" | Edit deployment > Who has access: **Anyone** (not "Anyone with Google account") |
| Still broken after all fixes | Deployment stuck on old code | Create entirely **new deployment** (Deploy > New deployment), use the new URL |

### 4. Email Notifications

The Google Apps Script automatically sends two emails on each registration:

1. **To the registrant** — a styled confirmation email with:
   - Event details (date, time, Zoom link)
   - Speaker bio and background
   - Agenda / what they'll learn
   - How to prepare (action items)
   - "Join the Zoom Meeting" button

2. **To the admin (jfrix01@gmail.com)** — a notification with:
   - Registrant's name, email, and background
   - Link to the registrations viewer page

To update these for a new workshop, edit these variables at the top of `google-apps-script.js`:
- `ZOOM_LINK` — the Zoom meeting URL
- `ADMIN_EMAIL` — where admin notifications are sent
- Update the email body content (speaker name, date, agenda, etc.)

**Important:** After updating the script, you must create a **New deployment** in Apps Script and update the script URL in `index.html` and `registrations.html`.

### 5. Create the Registrations Viewer

Ask Claude to create `registrations.html` — it will build a styled admin page that pulls from the Google Sheet and displays attendees in a table with stats.

### 6. Deploy to GitHub Pages

Tell Claude to deploy. It will:

1. Create a new GitHub repo (e.g., `workshop-name`)
2. Copy `index.html`, `registrations.html`, and the speaker photo
3. Push to GitHub and enable GitHub Pages
4. Give you the public URLs

Alternatively, create the repo yourself:
```bash
mkdir workshop-name
cp index.html registrations.html SpeakerPhoto.png workshop-name/
cd workshop-name
git init
git add .
git commit -m "Add workshop landing page"
gh repo create workshop-name --public --source=. --push
gh api repos/YOUR_USERNAME/workshop-name/pages -X POST -f "build_type=legacy" -f "source[branch]=main" -f "source[path]=/"
```

Your site will be live at: `https://YOUR_USERNAME.github.io/workshop-name/`

### 7. Test Everything

- [ ] Open the landing page — verify speaker photo, bio, agenda, and date are correct
- [ ] Submit a test registration with the correct code
- [ ] Confirm the test appears on the registrations page
- [ ] Check your Google Sheet — the row should be there
- [ ] Check your email (jfrix01@gmail.com) — you should receive an admin notification
- [ ] Check the registrant's email — they should receive a styled confirmation with Zoom link
- [ ] Try an incorrect registration code — verify it's rejected

---

## Project Structure

```
workshop-name/
  index.html              # Landing page with speaker info, agenda, and registration form
  registrations.html      # Admin view of registered attendees (pulls from Google Sheet)
  SpeakerPhoto.png        # Speaker headshot
  google-apps-script.js   # Reference copy of the Google Apps Script backend code
```

---

## Design System Reference

| Element | Value |
|---------|-------|
| Heading font | Lora (serif) |
| Body font | DM Sans (sans-serif) |
| Background | `#f7f5f0` |
| Hero section | Dark gradient, changes per workshop |
| Cards | White, `0.5px` border, `14px` border-radius |
| Speaker photo | `88px` circle with `object-fit: cover` |
| Registration | Dark card matching hero palette |
| Responsive | Breakpoint at `520px` |

Each workshop gets its own **color palette** to distinguish it:
- Workshop 1 (Gamaliel/Lew Cirne): Green — `#1a3a24`, `#7dd4a0`
- Workshop 2 (Interview Rubric/Bakari Holmes): Blue — `#1a2a4a`, `#7db8d4`
- Workshop 3: Pick a new accent (e.g., amber, purple, coral)

---

## Workshop History

| # | Title | Speaker | Date | Repo | Code |
|---|-------|---------|------|------|------|
| 1 | The Gamaliel Project: AI, Faith & the Future of Bible Study | Lew Cirne | Mar 30, 2026 | `gamaliel_workshop_landing.html` (local) | 47291 |
| 2 | Interview Rubric Creator: AI-Powered Tools for Landing Your Next Role | Bakari Holmes | Jul 13, 2026 | [interview-rubric-workshop](https://github.com/frixadata68/interview-rubric-workshop) | 11111 |
| 3 | TBD | TBD | TBD (before Jul 20, 2026) | TBD | TBD |

---

## Quick Start for Workshop 3

1. Confirm speaker, date, and registration code
2. Open Claude Code in `~/Downloads`
3. Say: "Create the next Pivot Point Network workshop" and provide the details
4. Save the speaker photo and tell Claude the filename
5. Reuse the existing Google Apps Script URL or set up a new one
6. Update the Zoom link and email content in the Google Apps Script
7. Ask Claude to deploy to GitHub Pages
8. Test registration end-to-end (landing page, Google Sheet, admin notification, registrant confirmation email)
9. Share the public URL with the Pivot Point Network community
