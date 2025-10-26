# FalconAlert backend.

![banner-placeholder](./public/banner.jpeg)

A NestJS-based backend for reporting and moderation (users, reports, upvotes, notifications, images, admin). Includes REST endpoints, JWT auth, file uploads and a Swagger UI.

## Quick overview

- Framework: NestJS
- Language: TypeScript
- DB: MySQL (via mysql2)
- API docs: Swagger at /docs (configured in [`src/main.ts`](src/main.ts))

---

## Prerequisites

Before setting up the project, make sure you have the following installed:

- **Node.js** (v18 or higher recommended)
- **npm** (comes with Node.js)
- **Mysql** (8.0 or higher recommended)
- A code editor like **VS Code**
- Git installed


## Dependencies

| Package | Purpose |
| -------- | -------- |
| class-validator | Validates data in requests. |
| crypto | Handles encryption and hashing. |
| mysql2 | Connects to the MySQL database. |


## Project structure

```bash
├── README.md
├── backup.sql
├── eslint.config.mjs
├── nest-cli.json
├── package-lock.json
├── package.json
├── public
│   ├── banner.jpeg
│   ├── profile-pictures
│   └── report-pictures
├── src
│   ├── DTOS
│   ├── admin
│   ├── app
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── auth
│   ├── categories
│   ├── common
│   ├── configurations
│   ├── dashboard
│   ├── db
│   ├── docs
│   ├── images
│   ├── main.ts
│   ├── notifications
│   ├── reports
│   ├── reports_category
│   ├── roles
│   ├── status
│   ├── upvotes
│   ├── users
│   └── util
├── swagger.json
├── tsconfig.build.json
└── tsconfig.json
```

## Features

- User registration, login and profile management
- Report creation, update, delete, categories and status tracking
- Upvotes (protect reports)
- Image upload & storage in /public
- Notifications & configurations
- JWT-based auth with access + refresh tokens
- WebSocket gateway for report notifications

## Installation

1. Run the database backup.sql

```sql
mysqldump -u <usuario> -p Ofraud > backup.sql
```

2. Clone the repository

```sh
git clone https://github.com/4rt21/backend-proyecto.git
```

3. Install dependencies

```sh
npm install
```

4. Start the server

```sh
npm run start:prod
```

5. Create a .env file in root directory
```bash
touch .env
```
6. Make the environment variables

```

MYSQL_HOST = "localhost"
MYSQL_PORT = 3306
MYSQL_USER = "<your_user>"
MYSQL_PASSWORD = "<your_password>"
MYSQL_DB = "Ofraud"
```

## Documentation

After installing the project, go to /docs or go to http://18.222.210.25/docs