# Dispatch

[![CI](https://github.com/dbhavery/dispatch/actions/workflows/ci.yml/badge.svg)](https://github.com/dbhavery/dispatch/actions/workflows/ci.yml)

**A multi-tenant fleet management SaaS platform with real-time dispatch, route optimization, franchise management, and role-based portals.**

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React_18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite_5-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?logo=socket.io&logoColor=white)
![Leaflet](https://img.shields.io/badge/Leaflet-199900?logo=leaflet&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## Overview

Dispatch is a full-stack SaaS platform for managing a franchise fleet network. It handles everything from HQ-level network operations down to individual driver tablet interfaces, with role-based access control, real-time WebSocket updates, and a custom industrial design system.

### Key Features

- **Network Command Center** -- 3-column dashboard with live Leaflet map, KPI tracking, territory overview, fleet health monitoring, and system alerts across all franchise territories
- **Real-time Fleet Tracking** -- Socket.IO-powered live updates for driver locations, delivery status changes, and safety alerts with automatic dashboard refresh
- **Franchise Management** -- Health scoring, performance tracking, compliance monitoring, and pipeline management for franchise territories with search/filter/sort
- **Market Analysis Sandbox** -- Interactive financial modeling tool with adjustable variables (drivers, subscriptions, fuel costs, wages) and scenario presets (low/base/high) for franchise planning
- **Multi-Portal Architecture** -- Role-based portals for Holdings Admin (HQ), Franchise Owner, Driver (tablet-mounted with GPS auto-mode-switching), and Customer
- **Secondary Authentication Gates** -- Password-protected access for sensitive sections (Finance, Dev Console, Site Editor) with 15-minute inactivity timeout
- **Legal & Compliance Center** -- Permit tracking, incident reports, scheduled audits, and compliance scoring by category (95% automated)
- **Marketing Command Center** -- Campaign tracking across platforms (Meta, Google, LinkedIn, TikTok), lead scoring, channel performance analytics, and automation health monitoring
- **Franchise Sales Pipeline** -- CRM-style lead tracking with stage-based pipeline (Lead -> Discovery -> Qualification -> FDD Review -> Discovery Day -> Contract), territory availability, and prospect scoring
- **Built-in CMS** -- Block-based website editor with drag-and-drop canvas, properties panel, version history, and publish/unpublish workflow
- **Driver Tablet Interface** -- Auto-transitioning modes (Dashboard/Driver/Delivery) based on GPS speed and proximity, with SOP checklist enforcement and AI camera supervision
- **Financial Analytics** -- Revenue overview, royalty collection, franchise P&L, invoice tracking, and transaction history with period filtering
- **Custom Design System** -- Dark industrial theme with glossy gradients, CSS custom properties, progress bars, status indicators, and responsive card layouts

---

## Architecture

```
dispatch/
├── packages/
│   ├── portal/           React dashboard — HQ command center, franchise
│   │   │                 management, finance, marketing, compliance,
│   │   │                 driver portal, owner portal, market sandbox,
│   │   │                 website editor
│   │   ├── src/
│   │   │   ├── components/    Reusable UI (PortalLayout, SecondaryAuthGate,
│   │   │   │                  MarketSandbox, SiteEditor)
│   │   │   ├── hooks/         Custom hooks (useDashboardData, useLiveFleetData,
│   │   │   │                  useKPIData, useTrendsData)
│   │   │   ├── pages/         Route pages (Dashboard, Finance, FranchiseMonitor,
│   │   │   │                  FranchiseSales, Marketing, LegalCompliance,
│   │   │   │                  DriverPortal, OwnerPortal, WebsiteEditor, ...)
│   │   │   └── services/      API client with Axios interceptors (auth, franchise,
│   │   │                      finance, compliance, maps, weather, CMS)
│   │   └── package.json
│   │
│   ├── auth/             Unified authentication gateway
│   │   ├── src/
│   │   │   ├── pages/         SignIn, SignUp, ForgotPassword, ResetPassword,
│   │   │   │                  Verify, Terms
│   │   │   └── services/      Auth API + role-based portal redirect map
│   │   └── package.json
│   │
│   ├── design-system/    Custom CSS design system + component showcase
│   │   ├── src/
│   │   │   ├── dispatch-system.css   Core tokens, cards, glossy system,
│   │   │   │                         buttons, pills, progress bars
│   │   │   └── pages/               Full design system showcase page
│   │   └── package.json
│   │
│   └── api/              Landing site, simulator, and design components
│       ├── src/
│       │   ├── components/    FuelGauge visualization
│       │   ├── design/        Design tokens + component library
│       │   └── pages/         Landing, Dashboard, Simulator
│       └── package.json
│
├── .github/workflows/ci.yml
├── .gitignore
├── LICENSE
└── README.md
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5, React Router v6 |
| Language | JavaScript (JSX), TypeScript (TSX) |
| Styling | CSS Modules, CSS Custom Properties, Tailwind (design system) |
| Maps | Leaflet + React-Leaflet (multi-layer: Dark, Satellite, Streets, Terrain) |
| Charts | Recharts, custom SVG visualizations |
| Real-time | Socket.IO (WebSocket transport, room-based events) |
| HTTP | Axios with JWT interceptors |
| Auth | JWT access + refresh tokens, role-based routing, secondary auth gates |
| CMS | Block-based page editor with version history |
| Sanitization | DOMPurify for CMS content |
| CI/CD | GitHub Actions (lint + build per package) |

---

## Packages

### `packages/portal`
The main application. Houses the HQ command center dashboard, franchise monitoring, financial analytics, marketing, legal/compliance, driver tablet interface, owner portal, market analysis sandbox, and website editor. Connected to a backend API via Axios with real-time Socket.IO updates.

### `packages/auth`
Unified authentication gateway. Handles sign-in, sign-up, forgot/reset password, email verification, and terms of service. Routes users to the appropriate portal based on their role (holdings_admin, franchise_owner, manager, driver, customer, etc.).

### `packages/design-system`
Custom industrial dark theme design system. Defines CSS custom properties for colors, spacing, typography, and shadows. Includes the glossy gradient system, card components, buttons, pills, progress bars, status indicators, and a full showcase page. Built with Tailwind CSS for utility support.

### `packages/api`
Landing site and development tools. Contains the public-facing landing page, a fleet operations simulator for development/testing, the FuelGauge visualization component, and design system component demos.

---

## Quick Start

Each package is a standalone Vite application:

```bash
# Portal (HQ Dashboard)
cd packages/portal
npm install
npm run dev          # http://localhost:5174

# Auth Gateway
cd packages/auth
npm install
npm run dev          # http://localhost:5170

# Design System
cd packages/design-system
npm install
npm run dev          # http://localhost:5173

# Landing / Simulator
cd packages/api
npm install
npm run dev          # http://localhost:5173
```

### Environment Variables

Create `.env` in each package as needed:

```env
VITE_API_URL=http://localhost:3001/api
VITE_WS_URL=http://localhost:3001
```

---

## Auth Flow

1. User navigates to the auth portal (`/signin`)
2. Credentials validated via API, returns JWT + user object with role
3. Token stored in localStorage
4. User redirected to their role-based portal:
   - `holdings_admin` -> HQ Portal (command center)
   - `franchise_owner` / `manager` -> Franchise Portal
   - `driver` -> Driver Portal (tablet interface)
   - `customer` / `employer` / `employee` -> Customer Portal
5. Protected routes check role on mount; session timeout with warning banner

### Secondary Auth

Sensitive areas (Finance, Dev Console, Site Editor) require re-authentication via `SecondaryAuthGate`. Sessions expire after 15 minutes of inactivity. Owner role is exempt.

---

## API Services

The portal includes a comprehensive API client (`packages/portal/src/services/api.js`) with services for:

| Service | Endpoints |
|---------|-----------|
| Auth | login, logout, profile |
| Franchise | CRUD, stats, map data, metrics, status updates |
| Finance | overview, franchise summary, HQ fees, fuel economics, transactions, invoices |
| Dashboard | HQ metrics, live data, trends, KPIs |
| Marketing | campaigns, leads, metrics |
| Compliance | permits, certifications, incidents, audit log |
| Maps | geocode, directions, distance matrix, route optimization, ETA, address validation |
| Weather | current, forecast, route weather, delivery impact |
| Pages (CMS) | CRUD, publish/unpublish, versions, import/export |
| Media | upload, folders, stats, bulk upload |

---

## Design System

The design system uses a dark industrial aesthetic with glossy gradient effects:

- **Background**: `#1e1f22` with radial gradient overlays
- **Cards**: Darker than background (`#131416` -> `#0a0b0d`) with heavy box shadows
- **Glossy system**: Inset highlights + gradient overlays for depth on buttons, pills, and progress bars
- **Typography**: Montserrat, weights 400-700
- **Colors**: Red primary (`#a30000`), status colors (green/yellow/red/blue), neutral grays
- **Spacing**: 4px base unit scale

---

## License

[MIT](LICENSE)
