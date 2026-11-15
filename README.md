# Mansala (මංසල) - Open Educational Platform & LMS Prototype

> **Faculty of Science Students' Union &bull; University of Ruhuna, Sri Lanka**  
> Free Educational Support, Interactive Quizzes, Cohort Mentorship & Outreach Platform for G.C.E. O/L & A/L Students.

---

## 📌 Executive Summary for the LMS Engineering Team

This repository contains the complete, production-ready frontend prototype of the **Mansala Educational Platform**. The user-facing public portals, interactive study modules, and staff management dashboards are fully styled, verified, and integrated with a client-side mock database layer (`localStorage`).

Your team's mission is to **transform this prototype into a full-scale Learning Management System (LMS)** by connecting the existing UI components and workflows to a real backend API, relational/document database, authentication service, and cloud asset storage.

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org) (v14.0 or higher recommended) **OR** [Python 3](https://python.org)

### Option 1: Standard Node.js / npm (Recommended for all platforms)
```bash
# 1. Clone or extract the repository
cd "Mansala Web"

# 2. Start the local server
npm start
```
The server will boot instantly on port `8080`.

### Option 2: Windows Batch Script
Simply double-click `start-local-preview.bat` in the root folder. It will release port 8080 if previously held, boot `server.js`, and automatically launch your default browser to `http://localhost:8080/login.html`.

### Option 3: Python Fallback
```bash
python -m http.server 8080
```

---

## 🔑 Default Staff Credentials

Staff authentication is handled on the login portal at [`login.html`](http://localhost:8080/login.html):

| Role | Username / Email | Password | Access Level & Permissions |
| :--- | :--- | :--- | :--- |
| **Lead Administrator** | `admin` | `admin` | Full system control: user/coordinator management, content moderation, quiz editor, enquiry inbox, charity projects, and platform analytics. |
| **Science Coordinator** | `cordinator1` | `cordinator1` | Academic Coordinator: upload & manage Science resources, question bank moderation, subject student queries. |
| **Maths Coordinator** | `cordinator2` | `cordinator2` | Mathematics Coordinator: upload & manage Maths resources, question bank moderation, subject student queries. |

> **Note for LMS Engineers:** Authentication is currently managed via `MansalaAuth` inside `js/dashboard-db.js` using browser `localStorage` and `sessionStorage`. For the LMS, replace this with secure backend sessions or JWTs with bcrypt/argon2 hashed passwords.

---

## 🌐 Application Architecture & Pages

```
Mansala Web/
├── assets/
│   └── images/                     # Official logos (dark, light, transparent PNGs)
├── css/
│   └── styles.css                  # Unified responsive design system (~9,174 lines)
├── js/
│   ├── dashboard-db.js             # Mock DB, seed data & auth layer (localStorage)
│   ├── lang.js                     # Dynamic English <-> Sinhala translation engine
│   └── lucide.js                   # Offline standalone Lucide icon library
├── about.html                      # Mansala initiative background, advisory board & mission
├── admin-dashboard.html            # Complete back-office CMS & administration portal
├── contact.html                    # Help desk, coordinator directory & bilingual FAQs
├── coordinator-dashboard.html      # Academic staff workspace for uploading & managing content
├── index.html                      # Public landing page & platform showcase
├── login.html                      # Staff authentication entry point
├── mentorship.html                 # 1:5 cohort mentorship details & intake application
├── projects.html                   # Community outreach, laboratory donations & relief tracking
├── quizzes.html                    # Interactive timed quiz engine with review mode & solutions
├── resources.html                  # Study hub with subject, grade & type filters
├── package.json                    # Node.js project manifest & scripts
├── README.md                       # Comprehensive technical handover documentation
├── server.js                       # Lightweight zero-dependency Node.js HTTP server
└── start-local-preview.bat         # 1-click Windows startup script
```

---

## 💡 Core Features & Technical Implementation

### 1. Interactive Timed Quiz Engine (`quizzes.html`)
- **Subject Categorization**: Science, Mathematics, History, Sinhala, English, and Commerce.
- **Timer & Progress Bar**: Real-time countdown timer with automated submission on timeout.
- **Instant Result & Scoring**: Detailed score breakdown, accuracy percentage, and grade status.
- **Step-by-Step Worked Solutions**: Comprehensive review screen showing correct answers, user choices (with distinct badges), and pedagogical explanations for every option.
- **Bilingual Question Rendering**: Supports full Sinhala and English question stems and answer keys.

### 2. Comprehensive Resource Study Hub (`resources.html`)
- Over 25+ curated past papers, model answers, revision packs, and syllabi.
- Client-side multi-parameter filtering: Subject, Grade (O/L Grade 10 & 11, A/L), and Resource Type (Past Paper, Revision Note, Model Paper, Syllabus).
- Real-time text search with debounce across resource titles and tags.

### 3. Student Mentorship Application (`mentorship.html`)
- Explains the 1:5 undergraduate-to-school-student mentorship cohort model.
- Interactive dual-path application form (apply as a Volunteer Mentor or Mentee Student) with field validation, district dropdowns, and submission feedback.

### 4. Bilingual Translation System (`js/lang.js`)
- Instant toggle between English (`en`) and Sinhala (`si`).
- State is preserved across page navigations in `localStorage.getItem('mansala_lang')`.
- All UI strings, buttons, descriptions, placeholders, and form labels contain `data-lang-key` or `data-en` / `data-si` attributes.

### 5. Staff CMS & Role-Based Access Control (`admin-dashboard.html` & `coordinator-dashboard.html`)
- Protected route guards redirecting unauthorized visitors to `login.html?auth=required`.
- CRUD operations for learning resources, practice quizzes, and charity projects.
- Inbound enquiry triage system (mark as New, In Progress, or Resolved).
- Coordinator provisioning: Admins can create and delete coordinator accounts.

---

## 🛠️ LMS Backend Migration Roadmap

When connecting this frontend to your production backend (e.g., Node.js/Express, Python/FastAPI/Django, or PHP/Laravel), prioritize the following milestones:

### Step 1: Replace Mock Data Layer with REST / GraphQL Endpoints
Currently, `js/dashboard-db.js` exposes:
- `MansalaDB.getResources()` / `saveResource()` / `deleteResource()`
- `MansalaDB.getQuizzes()` / `saveQuiz()` / `deleteQuiz()`
- `MansalaDB.getEnquiries()` / `saveEnquiry()` / `deleteEnquiry()`
- `MansalaDB.getProjects()` / `saveProject()`
- `MansalaDB.getUsers()` / `saveUser()` / `deleteUser()`

👉 **Action**: Replace these internal calls with asynchronous `fetch('/api/v1/...')` API requests to your database models.

### Step 2: Database Schema Design
Recommended relational tables / collections:
- `users`: `id`, `username`, `email`, `password_hash`, `role` (`'admin' | 'coordinator' | 'student' | 'mentor'`), `name`, `created_at`
- `learning_materials`: `id`, `title_en`, `title_si`, `subject`, `grade`, `type`, `file_url`, `file_size_kb`, `downloads_count`, `uploader_id`, `status`
- `quizzes`: `id`, `title_en`, `title_si`, `subject`, `grade`, `time_limit_mins`, `total_marks`, `created_by`
- `quiz_questions`: `id`, `quiz_id`, `question_en`, `question_si`, `options_json`, `correct_index`, `explanation_en`, `explanation_si`
- `quiz_submissions`: `id`, `student_id`, `quiz_id`, `score`, `total_questions`, `answers_json`, `time_spent_secs`, `submitted_at`
- `mentorship_registrations`: `id`, `applicant_type`, `full_name`, `email`, `phone`, `school_or_faculty`, `district`, `status`
- `enquiries`: `id`, `sender_name`, `sender_email`, `subject`, `category`, `message`, `status`, `assigned_to`
- `outreach_projects`: `id`, `title`, `description`, `target_lkr`, `collected_lkr`, `status`, `photos_json`

### Step 3: Implement Secure Authentication
- Replace plaintext comparison with `bcrypt` or `argon2id` password hashing.
- Issue secure, `HttpOnly`, `SameSite=Strict` session cookies or JSON Web Tokens (JWT).
- Add server-side authorization middleware verifying user permissions before executing admin/coordinator mutations.

### Step 4: Real File Storage (PDFs & Documents)
- Hook the file upload modals in the dashboards to a cloud storage bucket (AWS S3, Google Cloud Storage, or MinIO).
- Generate signed, expiring download URLs or stream files through an authenticated download proxy to track analytics.

---

## 🎨 Styling & Design Guidelines
- Primary Brand Colour: Amber / Deep Orange (`#F58220` / `--clr-accent`)
- Deep Brand Navy: Slate Black (`#0F172A` / `--clr-dark`)
- Background Warm Neutral: Cream Tint (`#FAF8F5` / `--clr-bg-alt`)
- Card & Container Styles: Unified border radius (`--radius-lg: 16px`), subtle drop shadows (`0 4px 20px rgba(0,0,0,0.06)`).
- Typography: System font stack with full Sinhala Unicode font fallback support (`Noto Sans Sinhala`, `Iskoola Pota`).

---

## 🤝 Support & Handover Contact
For questions regarding the initial prototype designs, logic, or educational content taxonomy:
- **Faculty of Science Students' Union**, University of Ruhuna, Matara, Sri Lanka.
- Web & Technical Initiative: Mansala Programme Coordination Team.
"# Mansala-Web" 
