# 🧩 Design Document – URL Shortener Web App

This document outlines the architectural and design choices made during the development of the URL Shortener frontend application, developed in React as part of a campus hiring evaluation.

---

## 📌 Key Design Decisions

- **Framework**: Chose **React (with Vite)** for its modern build speed and modular component structure.
- **UI Library**: Used **Material UI** to ensure a clean, responsive, production-grade design with minimal styling effort.
- **Persistence**: Leveraged `localStorage` for all URL, analytics, and metadata persistence—no backend or database used as per test constraints.
- **Routing**: Used `react-router-dom` to handle redirection via dynamic routes (e.g., `/abc123`) and for multi-page SPA navigation (`/`, `/stats`).
- **Logging**: Created a reusable logger module integrated with the given Test Server logging API, initialized at app startup using a Bearer token.

---

## 💾 Data Modeling (Client-side Persistence)

### URL Object

```json
{
  "shortcode": "abc123",
  "originalUrl": "https://example.com",
  "createdAt": "2025-06-27T12:00:00Z",
  "expiresAt": "2025-06-27T12:30:00Z",
  "clicks": [
    {
      "timestamp": "2025-06-27T12:10:00Z",
      "referrer": "Direct",
      "location": "Unknown"
    }
  ]
}
