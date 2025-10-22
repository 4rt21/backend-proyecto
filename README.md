# FalconAlert backend.

<!-- BANNER: Add your project banner image or ASCII art here -->
![banner-placeholder](./public/banner.jpeg)

A NestJS-based backend for reporting and moderation (users, reports, upvotes, notifications, images, admin). Includes REST endpoints, JWT auth, file uploads and a Swagger UI.

## Quick overview

- Framework: NestJS
- Language: TypeScript
- DB: MySQL (via mysql2)
- API docs: Swagger at /docs (configured in [`src/main.ts`](src/main.ts))

## Features

- User registration, login and profile management
- Report creation, update, delete, categories and status tracking
- Upvotes (protect reports)
- Image upload & storage in /public
- Notifications & configurations
- JWT-based auth with access + refresh tokens
- WebSocket gateway for report notifications

## Installation

1. Clone the repository
```sh
git clone https://github.com/4rt21/backend-proyecto.git
```
2. Install dependencies

```sh
npm install
```
