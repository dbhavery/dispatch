# Dispatch

Multi-tenant fleet management SaaS with 6 role-based portals, real-time tracking, and financial modeling -- a full-stack platform for franchise fleet networks.

## Why I Built This

Fleet management for franchise networks requires fundamentally different views for different roles. A holdings admin needs territory-level KPIs and financial rollups. A franchise owner needs their fleet's P&L and driver performance. A driver needs a tablet interface with GPS-triggered mode switching. These aren't different features in one app -- they're different applications sharing a data layer. I built Dispatch to prove I could architect a multi-portal SaaS with role-based routing, secondary auth gates, and real-time WebSocket updates across all of them.

## What It Does

- **6 portals serving 9 access tiers** -- Holdings Admin, Franchise Owner, Manager, Driver, Customer, Employer, Employee, Investor, SBA Lender; each role sees a different application
- **Real-time fleet tracking** -- Socket.IO with sub-second position updates, room-based event routing, automatic dashboard refresh
- **Financial modeling sandbox** -- adjustable variables (drivers, subscriptions, fuel costs, wages) with scenario presets (low/base/high) for franchise planning
- **Block-based CMS** -- drag-and-drop website editor with version history and publish/unpublish workflow for franchise websites
- **Driver tablet interface** -- auto-transitions between Dashboard/Driver/Delivery modes based on GPS speed and proximity, with SOP checklist enforcement

## Key Technical Decisions

- **Monorepo with independent Vite packages over monolithic app** -- each portal (auth, portal, design-system, landing) deploys independently. Different teams can own different packages without merge conflicts. A bug in the CMS doesn't block a driver portal deploy.
- **React + CSS Modules over component library** -- the industrial dark theme with glossy gradients and fuel-type color coding doesn't map to Material UI or Chakra. Custom design system with CSS custom properties gives full control without fighting library defaults.
- **JWT with role-based redirect over session auth** -- a single auth gateway (`packages/auth`) validates credentials and redirects to the correct portal based on role. Secondary auth gates protect sensitive sections (Finance, Dev Console) with 15-minute inactivity timeout.
- **Socket.IO rooms over broadcast** -- each franchise gets its own event room. A driver position update in Territory A doesn't trigger re-renders in Territory B. Scales linearly with territory count instead of quadratically with connection count.

## Quick Start

Each package is standalone:

```bash
# Portal (HQ Dashboard)
cd packages/portal && npm install && npm run dev    # localhost:5174

# Auth Gateway
cd packages/auth && npm install && npm run dev      # localhost:5170

# Design System Showcase
cd packages/design-system && npm install && npm run dev

# Environment
echo "VITE_API_URL=http://localhost:3001/api" > packages/portal/.env
echo "VITE_WS_URL=http://localhost:3001" >> packages/portal/.env
```

## Lessons Learned

**Multi-tenant auth is the hardest part of SaaS.** Role hierarchy (admin > owner > manager > driver), portal routing (which app does this user see?), and secondary auth gates (re-authenticate for finance data) required more engineering than any feature. The auth gateway went through 3 iterations: first attempt used route guards per page, second used a middleware pattern, third (current) uses a dedicated auth package with role-to-portal mapping and `SecondaryAuthGate` as a wrapper component. Each iteration simplified the mental model but required rethinking the redirect flow.

**Real-time WebSocket at scale needs connection management.** Naive "broadcast everything to everyone" works with 5 users. At 50+, you need heartbeat monitoring, reconnection with exponential backoff, and room-based event routing. I implemented all three after watching the dashboard freeze during load testing because disconnected clients were never cleaned up.

## Tests

7 test files across 3 packages (auth, portal, design-system) covering component rendering, auth flows, API service mocking, and dashboard data hooks. Run per-package:

```bash
cd packages/portal && npm test
cd packages/auth && npm test
```

---

MIT License. See [LICENSE](LICENSE).
