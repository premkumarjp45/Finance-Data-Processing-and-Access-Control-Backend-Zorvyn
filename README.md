# zorvyn-assignment


finance-backend/
│
├── src/
│   │
│   ├── config/                # App & DB configuration
│   │   ├── db.config.js
│   │   ├── env.config.js
│   │   └── constants.js
│   │
│   ├── modules/               # Feature-based structure
│   │
│   │   ├── auth/              # Authentication (optional but recommended)
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.routes.js
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── users/             # User & Role Management
│   │   │   ├── user.model.js
│   │   │   ├── user.controller.js
│   │   │   ├── user.service.js
│   │   │   ├── user.routes.js
│   │   │   └── user.validation.js
│   │   │
│   │   ├── roles/             # Role definitions (Admin, Analyst, Viewer)
│   │   │   ├── role.model.js
│   │   │   └── role.constants.js
│   │   │
│   │   ├── finance/           # Financial Records
│   │   │   ├── finance.model.js
│   │   │   ├── finance.controller.js
│   │   │   ├── finance.service.js
│   │   │   ├── finance.routes.js
│   │   │   └── finance.validation.js
│   │   │
│   │   ├── dashboard/         # Summary APIs (analytics)
│   │   │   ├── dashboard.controller.js
│   │   │   ├── dashboard.service.js
│   │   │   └── dashboard.routes.js
│   │
│   ├── middleware/            # Global middlewares
│   │   ├── auth.middleware.js
│   │   ├── role.middleware.js
│   │   ├── error.middleware.js
│   │   └── validation.middleware.js
│   │
│   ├── utils/                 # Helper functions
│   │   ├── response.js
│   │   ├── logger.js
│   │   └── date.utils.js
│   │
│   ├── database/              # DB connection & setup
│   │   ├── connection.js
│   │   └── seed.js
│   │
│   ├── routes/                # Central route file
│   │   └── index.js
│   │
│   ├── app.js                 # Express app setup
│   └── server.js              # Entry point
│
├── tests/                     # Unit / Integration tests (optional)
│   ├── user.test.js
│   ├── finance.test.js
│   └── dashboard.test.js
│
├── docs/                      # API documentation
│   └── api-docs.md
│
├── .env
├── .gitignore
├── package.json
└── README.md