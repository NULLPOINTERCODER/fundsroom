# 🚀 Fundsroom — Mini ERP + CRM Operations Portal

A production-ready, full-stack **Wholesale & Distribution ERP / CRM System** built with **Node.js, Express, TypeScript, Prisma ORM, PostgreSQL**, and **React (Vite + Tailwind CSS)**.

---

## 🌐 Live Deployment Links

| Service | URL |
| :--- | :--- |
| **Live Frontend** | https://fundsroom-liart.vercel.app/ |
| **Live Backend API** | https://fundsroom-20u1.onrender.com/api |

| **PostgreSQL Database** | Neon PostgreSQL — AWS ap-southeast-1 |

---

## 🔑 Test Login Credentials

All demo accounts share the same password: **`Password123`**

| Role | Email | Access Level |
| :--- | :--- | :--- |
| **Admin** | `admin@fundsroom.com` | Full system access — manage users, customers, products, challans |
| **Sales** | `sales@fundsroom.com` | Customer CRM, add/edit leads, create & confirm sales challans |
| **Warehouse** | `warehouse@fundsroom.com` | Catalog management, manual stock intake & adjustment logs |
| **Accounts** | `accounts@fundsroom.com` | View ledger, cancel challan/invoice (restores stock locks) |

---

## 🏗️ Architecture Overview

This is a **monorepo** project containing two independent services:

```mermaid
graph TB
    subgraph "☁️ Frontend — Vercel"
        FE["React 18 + Vite + Tailwind CSS"]
    end

    subgraph "☁️ Backend — Render"
        API["Express.js + TypeScript"]
        MW["Middleware Layer"]
        JWT["JWT Auth"]
        RBAC["Role-Based Access Control"]
        ZOD["Zod Validation"]
    end

    subgraph "☁️ Database — Neon"
        DB[("PostgreSQL")]
        PRISMA["Prisma ORM v5"]
    end

    FE -- "Axios + JWT Bearer Token" --> API
    API --> MW
    MW --> JWT
    MW --> RBAC
    MW --> ZOD
    API --> PRISMA
    PRISMA --> DB

    style FE fill:#61DAFB,stroke:#333,color:#000
    style API fill:#68A063,stroke:#333,color:#fff
    style DB fill:#336791,stroke:#333,color:#fff
    style PRISMA fill:#2D3748,stroke:#333,color:#fff
    style JWT fill:#F7B731,stroke:#333,color:#000
    style RBAC fill:#FC5C65,stroke:#333,color:#fff
    style ZOD fill:#3B82F6,stroke:#333,color:#fff
```

### Project Structure

```
fundsroom/
├── backend/                    # Node.js + Express + TypeScript + Prisma API server
│   ├── prisma/
│   │   ├── schema.prisma       # PostgreSQL database schema & relational models
│   │   └── seed.ts             # Database seeding script (users, products, challans)
│   ├── src/
│   │   ├── config/             # Environment configuration with Zod validation
│   │   ├── middleware/         # JWT verification & Role-Based Access Control (RBAC)
│   │   ├── routes/             # Auth, Customers, Products, Challans route handlers
│   │   ├── prisma.ts           # Prisma client singleton
│   │   └── app.ts              # Express app setup (CORS, Helmet, routes)
│   └── Dockerfile              # Production multi-stage Docker build
├── frontend/                   # React 18 + Vite + TypeScript + Tailwind CSS admin app
│   ├── src/
│   │   ├── api.ts              # Axios instance with JWT interceptor & 401 redirects
│   │   ├── components/         # Dashboard, Customers, Products, Challans, Navbar, Auth
│   │   └── types.ts            # Shared TypeScript interfaces
│   ├── vercel.json             # Vercel SPA routing config
│   ├── nginx.conf              # Production Nginx proxy config
│   └── Dockerfile              # Production multi-stage Nginx container build
├── docker-compose.yml          # Container orchestrator (local dev)
├── postman_collection.json     # Exportable Postman API collection
└── README.md                   # Full project documentation
```

### Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Backend Runtime** | Node.js 20 + TypeScript |
| **Backend Framework** | Express.js |
| **Database** | PostgreSQL (Neon serverless) |
| **ORM** | Prisma v5 |
| **Authentication** | JWT (jsonwebtoken + bcryptjs) |
| **Validation** | Zod |
| **Frontend Framework** | React 18 + TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **HTTP Client** | Axios |
| **Containerization** | Docker + Docker Compose |
| **Frontend Hosting** | Vercel |
| **Backend Hosting** | Render |
| **Database Hosting** | Neon PostgreSQL |

---

## 📊 Database Schema

### Entity Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ CHALLAN : "creates"
    USER ||--o{ FOLLOW_UP_NOTE : "writes"
    USER ||--o{ STOCK_MOVEMENT : "logs"
    CUSTOMER ||--o{ CHALLAN : "receives"
    CUSTOMER ||--o{ FOLLOW_UP_NOTE : "has"
    PRODUCT ||--o{ CHALLAN_ITEM : "listed in"
    PRODUCT ||--o{ STOCK_MOVEMENT : "tracked by"
    CHALLAN ||--|{ CHALLAN_ITEM : "contains"

    USER {
        int id PK
        string name
        string email UK
        string passwordHash
        enum role "ADMIN | SALES | WAREHOUSE | ACCOUNTS"
    }

    CUSTOMER {
        int id PK
        string name
        string mobile
        string email
        string businessName
        string gstNumber
        enum customerType "RETAILER | WHOLESALER | DISTRIBUTOR"
        enum status "NEW | CONTACTED | CONVERTED | LOST"
        datetime followUpDate
    }

    FOLLOW_UP_NOTE {
        int id PK
        int customerId FK
        string note
        int createdBy FK
        datetime createdAt
    }

    PRODUCT {
        int id PK
        string name
        string sku UK
        string category
        float unitPrice
        int currentStock
        int minStockAlert
        string location
    }

    STOCK_MOVEMENT {
        int id PK
        int productId FK
        int quantityChanged
        enum movementType "IN | OUT"
        string reason
        int createdBy FK
        datetime timestamp
    }

    CHALLAN {
        int id PK
        string challanNumber UK "CH-YYYY-NNNNN"
        int customerId FK
        enum status "DRAFT | CONFIRMED | CANCELLED"
        int totalQuantity
        int createdBy FK
    }

    CHALLAN_ITEM {
        int id PK
        int challanId FK
        int productId FK
        string productNameSnapshot
        string skuSnapshot
        float unitPriceSnapshot
        int quantity
    }
```

### Models Summary

| Model | Key Fields |
| :--- | :--- |
| **User** | id, name, email, passwordHash (bcrypt), role (ADMIN/SALES/WAREHOUSE/ACCOUNTS) |
| **Customer** | id, name, mobile, email, businessName, gstNumber?, customerType, address, status, followUpDate, notes |
| **FollowUpNote** | id, customerId, note, createdBy, createdAt |
| **Product** | id, name, sku (unique), category, unitPrice, currentStock, minStockAlert, location |
| **StockMovement** | id, productId, quantityChanged, movementType (IN/OUT), reason, createdBy, timestamp |
| **Challan** | id, challanNumber (auto CH-YYYY-NNNNN), customerId, status (DRAFT/CONFIRMED/CANCELLED), totalQuantity, createdBy |
| **ChallanItem** | id, challanId, productId, productNameSnapshot, skuSnapshot, unitPriceSnapshot, quantity |

### Critical Business Logic
- **Atomic Stock Deduction**: Confirming a challan runs stock deduction and OUT movement logging inside a Prisma `$transaction`. If any product has insufficient stock, the entire transaction rolls back with HTTP 400.
- **Negative Stock Guard**: Manual stock adjustments prevent inventory from dropping below zero.
- **Snapshot Integrity**: Prices and product names are snapshotted into ChallanItem rows so historical totals remain accurate even if catalog prices change later.
- **Stock Restoration on Cancel**: Cancelling a confirmed challan automatically restores inventory via an IN movement log.

---

## 🚀 Quick Start — Local Setup

### Prerequisites
- Node.js v20+
- npm v9+
- A PostgreSQL database (local or cloud — Neon is free)

### 1. Clone the Repository
```bash
git clone https://github.com/NULLPOINTERCODER/fundsroom.git
cd fundsroom
```

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
DATABASE_URL="postgresql://<user>:<password>@<host>/<database>?sslmode=require"
JWT_SECRET="your-secure-secret-key"
NODE_ENV="development"
```

Run migrations and seed:
```bash
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts
npm run dev
```

Backend runs at: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## ⚙️ How Environment Variables Are Managed

Variables are stored in `backend/.env` which is excluded from version control via `.gitignore`. A `backend/.env.example` template is committed for developer reference. In production, variables are set directly in the **Render dashboard** — never hardcoded. The backend uses **Zod** to validate all required env vars on startup.

---

## 🐳 Docker Setup

```bash
docker-compose up --build
```

| Service | URL |
| :--- | :--- |
| **Frontend** | http://localhost:8080 |
| **Backend API** | http://localhost:5000/api |

---

## ☁️ Deployment Guide

### Backend — Render

1. Go to [Render](https://render.com) → New Web Service → Connect `NULLPOINTERCODER/fundsroom`
2. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install --production=false && npx prisma generate && npm run build`
   - **Start Command**: `node dist/index.js`
3. Add Environment Variables: `PORT`, `DATABASE_URL`, `JWT_SECRET`, `NODE_ENV=production`
4. Deploy

> **Note:** `--production=false` ensures TypeScript `@types/*` packages install during build for `tsc` compilation.

### Frontend — Vercel

1. Go to [Vercel](https://vercel.com) → Add New Project → Import `NULLPOINTERCODER/fundsroom`
2. Set **Root Directory** to `frontend`, Framework Preset to **Vite**
3. Deploy

### Database — Neon

1. Sign up at [Neon](https://neon.tech), create a project, copy the connection string
2. Use as `DATABASE_URL` in both local `.env` and Render dashboard

---

## 🔐 Authentication & RBAC Flow

```mermaid
flowchart TD
    A["👤 User Login"] --> B["POST /api/auth/login"]
    B --> C{"Valid Credentials?"}
    C -- "❌ No" --> D["401 Unauthorized"]
    C -- "✅ Yes" --> E["Generate JWT Token"]
    E --> F["Return Token + User Info"]
    F --> G["Client Stores Token"]
    G --> H["API Request with Bearer Token"]
    H --> I{"JWT Valid?"}
    I -- "❌ No / Expired" --> J["401 — Redirect to Login"]
    I -- "✅ Yes" --> K{"Role Authorized?"}
    K -- "❌ Forbidden" --> L["403 Forbidden"]
    K -- "✅ Allowed" --> M["✅ Process Request"]

    style A fill:#3B82F6,stroke:#333,color:#fff
    style E fill:#10B981,stroke:#333,color:#fff
    style D fill:#EF4444,stroke:#333,color:#fff
    style J fill:#EF4444,stroke:#333,color:#fff
    style L fill:#F59E0B,stroke:#333,color:#000
    style M fill:#10B981,stroke:#333,color:#fff
```

### Role Permissions Matrix

```mermaid
block-beta
    columns 5
    space header1["ADMIN"] header2["SALES"] header3["WAREHOUSE"] header4["ACCOUNTS"]
    row1["Customers"] a1["✅ Full"] a2["✅ Full"] a3["👁️ View"] a4["👁️ View"]
    row2["Products"] b1["✅ Full"] b2["👁️ View"] b3["✅ Full"] b4["👁️ View"]
    row3["Stock Mgmt"] c1["✅ Full"] c2["👁️ View"] c3["✅ Full"] c4["👁️ View"]
    row4["Challans"] d1["✅ Full"] d2["✅ Create"] d3["👁️ View"] d4["🚫 Cancel"]
    row5["Users"] e1["✅ Full"] e2["❌ None"] e3["❌ None"] e4["❌ None"]
```

---

## 📦 Challan Lifecycle Flow

```mermaid
stateDiagram-v2
    [*] --> DRAFT : Sales creates challan
    DRAFT --> CONFIRMED : Sales/Admin confirms
    DRAFT --> [*] : Delete draft
    CONFIRMED --> CANCELLED : Admin/Accounts cancels
    CONFIRMED --> [*] : Fulfilled
    CANCELLED --> [*] : Archived

    note right of DRAFT
        No stock impact.
        Items can be edited.
    end note

    note right of CONFIRMED
        🔒 Stock atomically deducted.
        OUT movements logged.
        Price snapshots locked.
    end note

    note right of CANCELLED
        🔓 Stock automatically restored.
        IN movements logged.
    end note
```

### Challan Confirmation — Transaction Flow

```mermaid
flowchart TD
    A["🛒 Sales clicks Confirm"] --> B["PUT /api/challans/:id/confirm"]
    B --> C["Begin Prisma $transaction"]
    C --> D{"Check stock for ALL items"}
    D -- "❌ Insufficient Stock" --> E["Rollback Transaction"]
    E --> F["HTTP 400 — Insufficient Stock"]
    D -- "✅ All items available" --> G["Deduct currentStock for each product"]
    G --> H["Create StockMovement OUT logs"]
    H --> I["Update challan status → CONFIRMED"]
    I --> J["Commit Transaction"]
    J --> K["✅ HTTP 200 — Challan Confirmed"]

    style A fill:#3B82F6,stroke:#333,color:#fff
    style E fill:#EF4444,stroke:#333,color:#fff
    style F fill:#EF4444,stroke:#333,color:#fff
    style K fill:#10B981,stroke:#333,color:#fff
    style C fill:#8B5CF6,stroke:#333,color:#fff
    style J fill:#8B5CF6,stroke:#333,color:#fff
```

---

## 🔄 API Request Lifecycle

```mermaid
sequenceDiagram
    actor User
    participant Frontend as React Frontend
    participant Axios as Axios Interceptor
    participant API as Express Backend
    participant Auth as JWT Middleware
    participant RBAC as RBAC Middleware
    participant Route as Route Handler
    participant Prisma as Prisma ORM
    participant DB as PostgreSQL

    User->>Frontend: Interacts with UI
    Frontend->>Axios: API call with JWT
    Axios->>API: HTTP Request + Bearer Token
    API->>Auth: Verify JWT Token
    Auth-->>API: Token Valid ✅
    API->>RBAC: Check Role Permission
    RBAC-->>API: Role Authorized ✅
    API->>Route: Execute Handler
    Route->>Prisma: Database Query
    Prisma->>DB: SQL Query
    DB-->>Prisma: Result Set
    Prisma-->>Route: Typed Response
    Route-->>API: JSON Response
    API-->>Axios: HTTP Response
    Axios-->>Frontend: Parsed Data
    Frontend-->>User: Updated UI
```

---

## 📑 Postman Collection & API Reference

Import `postman_collection.json` from the repo root into Postman.

Set collection variable `baseUrl` to:
- Local: `http://localhost:5000/api`
- Live: `https://fundsroom-20u1.onrender.com/api`

### API Endpoints

| Method | Endpoint | Description | Roles |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/login` | Login, returns JWT token | Public |
| GET | `/api/auth/me` | Get current user profile | Any |
| GET | `/api/customers` | List customers (search, filter, paginate) | Any |
| POST | `/api/customers` | Create new customer | ADMIN, SALES |
| PUT | `/api/customers/:id` | Update customer | ADMIN, SALES |
| GET | `/api/customers/:id` | Customer detail + follow-up notes | Any |
| POST | `/api/customers/:id/notes` | Add follow-up note | ADMIN, SALES |
| GET | `/api/products` | List products (search, filter, paginate) | Any |
| POST | `/api/products` | Create new product | ADMIN, WAREHOUSE |
| PUT | `/api/products/:id` | Update product | ADMIN, WAREHOUSE |
| GET | `/api/products/:id/stock-movements` | Stock movement history | Any |
| POST | `/api/products/:id/stock-movements` | Add manual stock movement | ADMIN, WAREHOUSE |
| GET | `/api/challans` | List challans (filter, paginate) | Any |
| POST | `/api/challans` | Create draft challan | ADMIN, SALES |
| GET | `/api/challans/:id` | Challan detail with line items | Any |
| PUT | `/api/challans/:id/confirm` | Confirm challan (atomically deducts stock) | ADMIN, SALES |
| PUT | `/api/challans/:id/cancel` | Cancel challan (restores stock) | ADMIN, ACCOUNTS |

---

## 🎁 Bonus Features

| Feature | Status | Notes |
| :--- | :---: | :--- |
| Docker Setup | ✅ Done | `docker-compose.yml` + `Dockerfile` in both services |
| Export Invoice as PDF | ✅ Done | Print-to-PDF browser modal via `InvoicePrintModal.tsx` |
| GitHub Actions CI/CD | ❌ Optional | Manual deployment used — CI/CD is a bonus feature per PDF |
| Product Image Upload (AWS S3) | ❌ Optional | Not implemented — listed as optional bonus in PDF |

---

## ⚠️ Known Limitations

| Area | Notes |
| :--- | :--- |
| Product Image Upload | No image upload — listed as optional bonus only |
| GitHub Actions CI/CD | Manual deployment used — bonus feature per PDF |
| AWS Hosting | Vercel + Render used — PDF explicitly allows this as an alternative |
| Render Cold Start | Free tier spins down after inactivity; first API call may take 30–60 seconds |
| Role Management UI | Roles are assigned via seed data only, no in-app admin UI |
| GST Tax Breakdown | Invoices show totals but no GST breakdown calculation |

---

## 📋 Assumptions Made

1. Simple JWT auth (no refresh tokens) as specified in the PDF.
2. Roles are assigned at seed time — no in-app UI for role changes.
3. Only `CONFIRMED` challans can be cancelled; `DRAFT` challans can be deleted.
4. Cancelling a `CONFIRMED` challan restores all stock via `IN` movement logs.
5. Database hosted on Neon free tier in `AWS ap-southeast-1`.
6. Invoice grand totals are computed from `unitPriceSnapshot * quantity` on the frontend.
