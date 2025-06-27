# 🔗 URL Shortener Web App – AffordMed Frontend Evaluation

A responsive, production-grade URL Shortener web application built using **React** and **Material UI**, as part of the Afford Medical Technologies Campus Hiring Evaluation.

## 🚀 Features

- ✂️ Shorten long URLs with optional custom shortcodes
- ⏱ Set expiry time for shortened URLs (defaults to 30 minutes)
- 📊 View URL analytics including:
  - Total clicks
  - Click timestamps
  - Referrer info
- 🔁 Redirection handling with expiry check
- 💾 Persistent data stored using `localStorage`
- 🧠 Custom Logging Middleware integrated with the test server
- 🎨 Responsive UI using **Material UI**
- 📍 Client-side routing using `react-router-dom`

---

## 🛠 Tech Stack

| Tool             | Purpose                                 |
|------------------|-----------------------------------------|
| React (Vite)     | Frontend framework                      |
| Material UI      | UI components and responsive layout     |
| localStorage     | Client-side data persistence            |
| react-router-dom | SPA routing and shortcode redirection   |
| Custom Logger    | Centralized event logging to test server|

---

## 📂 Folder Structure

```bash
AffordMed-Frontend/
├── frontend-test/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── public/
│   └── vite.config.js
├── logging-middleware/
│   └── logger.js
├── design.md
└── README.md
