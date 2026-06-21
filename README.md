Road Warrior — Rider Data Collection System

Built for Bharat Riders | 72-Hour Technical Challenge Submission

A multilingual rider registration platform that collects delivery rider data, tags leads automatically, runs a referral and points program, and gives the business a live admin view of every signup.

Live App: https://bharat-riders-ev-warrior-git-main-bharat-riders.vercel.app/
Form: /form · Rider Score Lookup: /score · Admin Dashboard: /admin


The Problem

95% of Bharat Riders' delivery rider base runs on petrol or diesel, and the company has no structured data on them — no visibility into their vehicle, spend, challenges, insurance status, or openness to switching to EV. This system closes that gap.

What This System Does


Collects rider data through a fast, mobile-first, multilingual form (English + Hindi)
Stores every submission in a structured Postgres database with automatic lead tagging
Runs a referral program — every rider gets a unique code, earns points for each successful referral
Sends a WhatsApp confirmation message on submission (see WhatsApp Integration below)
Gives the business a live admin dashboard with segmentation, leaderboards, and insurance leads



Tech Stack

LayerTechnologyWhyFrontendNext.js 15, TypeScriptSingle framework for frontend + backend, fast to shipStylingInline styles (dark theme)Kept dependency-light for a 72-hour buildBackendNext.js API RoutesCo-located with frontend, no separate server neededDatabaseSupabase (PostgreSQL)Free tier, instant setup, real relational databaseIconsLucide ReactLightweight, tree-shakeableDeploymentVercelZero-config deploys directly from GitHubVersion ControlGitHub—


Architecture

app/
├── form/page.tsx        → 6-step multilingual rider registration form
├── score/page.tsx        → Rider score & referral lookup by phone number
├── admin/page.tsx        → Password-gated analytics dashboard
└── api/
    ├── submit/route.ts   → Validates, tags, and saves a new rider; triggers WhatsApp
    ├── score/route.ts    → Looks up a rider's points and referral history
    └── admin/route.ts    → Returns aggregated stats for the dashboard

components/                → One component per form section (A–F)
lib/
├── supabase.ts            → Database client (browser + server)
├── referral.ts            → Referral code generation, points logic
├── leadTagger.ts           → Petrol / EV / Swing classification
└── whatsapp.ts             → Confirmation message builder + sender

locales/                   → en.json, hi.json, kn.json translation files

Database Schema

riders — one row per submission: profile, vehicle, challenges, insurance, EV interest, referral code, points, lead tag, and timestamp.

referrals — tracks every referral event: who referred whom, points awarded, and milestone hits, kept separate from riders for a clean audit trail.

Full column-level schema is documented in docs/EV_WARRIOR_DOCS.md.


Key Features

Multilingual Form

English and Hindi are fully supported on the core profile and vehicle sections, with a simple language toggle. Translation files are plain JSON, so adding Kannada or any other language is a matter of adding a new locale file — no library required.

Lead Segmentation

Every rider is automatically tagged as Petrol, EV, or Swing (currently on petrol but open to switching) based on their vehicle type and stated EV interest. Riders missing accidental or health insurance are separately flagged as insurance leads.

Referral & Points Engine

Each rider receives a unique code (e.g. RW-4821) and starts with 10 points. When a new rider signs up using someone else's code, the referrer automatically earns +5 points, and the event is logged in the referrals table. Riders can check their live point total and referral count on the /score page.

Duplicate Detection

Phone numbers are unique at the database level — a second submission with the same WhatsApp number is rejected before insertion, preventing duplicate or fraudulent entries.

Admin Dashboard

A password-protected view showing total riders, segment breakdown, city-wise distribution, a top-referrers leaderboard, recent registrations, and a filterable full rider table — giving the business an immediate, actionable view of incoming leads.


WhatsApp Integration

The WhatsApp confirmation flow is fully built and triggers automatically on every submission — message composition, multilingual templates, and the trigger logic all run as part of the submit pipeline.

The actual outbound send is currently mocked (logged server-side and surfaced in the UI) rather than wired to a live WhatsApp Business API. Verified business numbers on providers like Meta's Cloud API, 360dialog, or Twilio typically take longer to approve than this challenge's 72-hour window allows.

The sendWhatsAppMessage() function in lib/whatsapp.ts is provider-agnostic by design — swapping the mock for a real API call is a contained change to a single function, with no changes needed anywhere else in the codebase.


Running Locally

bashgit clone https://github.com/V-i-shal/bharat-riders-ev-warrior.git
cd bharat-riders-ev-warrior
npm install

Create a .env.local file with:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
ADMIN_PASSWORD=your_chosen_admin_password
NEXT_PUBLIC_APP_URL=http://localhost:3000

Then run:

bashnpm run dev

The app will be available at http://localhost:3000.


What I'd Add With One More Week


A real WhatsApp Business API integration (architecture is already provider-agnostic)
Full Kannada translation across all six form sections
A unique QR code per rider for offline sharing at traffic lights and rider hubs
Proper authentication for the admin panel instead of a single shared password
Automated tests for the referral and lead-tagging logic



Author

Vishal — B.Sc. Data Science & Statistics, Christ University, Bengaluru