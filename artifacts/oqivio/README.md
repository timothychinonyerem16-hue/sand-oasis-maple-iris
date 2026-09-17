# OQIVIO

**Your Campus. One Place.**

Modern digital campus companion for university students.  
First campus: **University of Nigeria, Nsukka (UNN)**.

## MVP Features

- Student onboarding & profile (university / faculty / department / level)
- Interactive campus map (Leaflet + OpenStreetMap)
- Location search & walking distance estimates
- Food finder with sample menus & prices
- Water points with community availability reporting
- Basic timetable & assignment tracker
- Campus announcements
- Bottom navigation: Home · Map · Campus · Study · Profile

## Tech Stack

- **Next.js 15** (App Router) + TypeScript
- **Tailwind CSS** – modern, clean UI
- **Leaflet / react-leaflet** – campus map
- **Zustand** – client state (profile, timetable, assignments)
- Sample data for UNN (expandable multi-university architecture)

## Getting Started

```bash
cd oqivio
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Architecture Notes

- Locations are currently seeded in `src/data/locations.ts`.
- Designed so a real database (Prisma + Postgres / SQLite) can replace the sample data without changing UI.
- University → Campus → Location hierarchy is ready for multi-university expansion.
- Auth is client-side for MVP; ready to plug NextAuth or similar.

## Brand

- **Name**: OQIVIO (Oh-kee-vee-oh)
- **Tagline**: Your Campus. One Place.
- **Colors**: Deep Navy + Electric Blue
- **Feel**: Modern Nigerian tech startup + premium student app

## Roadmap (from product spec)

- V2: Vendor profiles, live water status, events, GPA calculator
- V3: Marketplace, food ordering, AI campus assistant
- V4+: Multi-university rollout

---

Built as a functional product foundation, not a static mockup.
