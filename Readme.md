# 🎬 VideoTube – Video Player Backend

A backend for a YouTube-style video platform, built with **Node.js, Express and MongoDB**.
Users will be able to sign up, upload videos, subscribe to channels, like, comment, and build playlists.

> **Status: 🚧 Work in progress – backend foundation stage (~15% of backend done).**
> Project setup, database connection, data models and utility helpers are in place.
> Routes, controllers and authentication are **not built yet**. See [`projectPlan.md`](./projectPlan.md) for the roadmap.

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (ES Modules) |
| Framework | Express 5 |
| Database | MongoDB Atlas + Mongoose 9 |
| Auth (planned) | JWT (access + refresh tokens), bcrypt |
| File uploads | Multer (temp storage) → Cloudinary |
| Pagination | mongoose-paginate-v2 |
| Dev tools | nodemon, Prettier |

---

## ✅ Current Progress

**Done**
- Project structure and Git repository
- Express app with CORS, cookie-parser, JSON/URL-encoded body parsing, static `public/` folder
- MongoDB Atlas connection (`src/db/index.js`)
- `User` and `Video` schemas (first draft)
- Helper utilities: `ApiError`, `ApiResponse`, `asyncHandler`, Cloudinary upload helper
- Multer middleware for file uploads
- Prettier configuration

**Not started yet**
- Routes and controllers (user, video, comment, like, playlist, subscription, tweet)
- JWT authentication middleware
- Global error-handling middleware
- Remaining models (Subscription, Comment, Like, Playlist, Tweet)
- Frontend, tests, deployment

---

## 📁 Folder Structure

```
Video-player/
├── public/
│   └── .gitkeep              # static files; temp uploads will go in public/temp
├── src/
│   ├── db/
│   │   └── index.js          # MongoDB connection
│   ├── middlewares/
│   │   └── multer.middelwares.js   # file upload (multer)
│   ├── models/
│   │   ├── user.models.js    # User schema (+ password hash, JWT methods)
│   │   └── video.models.js   # Video schema (+ pagination plugin)
│   ├── utils/
│   │   ├── ApiError.js       # standard error class
│   │   ├── ApiResponse.js    # standard response class
│   │   ├── asynHandler.js    # wraps async route handlers
│   │   └── cloundinary.js    # upload helper for Cloudinary
│   ├── app.js                # Express app + middleware
│   ├── constant.js           # DB name ("videotube")
│   └── index.js              # entry point: connect DB → start server
├── .env                      # secrets (never commit)
├── .gitignore
├── .prettierrc
├── package.json
└── README.md
```

---

## 🗂️ Data Models (current)

**User** – `Username`, `email`, `fullName`, `avatar`, `coverImage`, `watchHistory[]` (→ Video), `password`, `refreshToken`, timestamps

**Video** – `videoFile`, `thumbnil`, `title`, `description`, `duration`, `views`, `isPublished`, `owner`, timestamps

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- A free [Cloudinary](https://cloudinary.com) account

### 2. Install
```bash
git clone <your-repo-url>
cd Video-player
npm install
```

### 3. Environment variables
Create a `.env` file in the project root:

```env
PORT=8000
MONGODB_URL=mongodb+srv://<user>:<password>@<cluster>.mongodb.net
CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=<long-random-string>
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=<another-long-random-string>
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
```

> ⚠️ Never commit `.env`. It is already listed in `.gitignore`.
> `MONGODB_URL` should **not** end with a `/` or database name – the app appends `/videotube` itself.

### 4. Run
```bash
npm run dev      # starts the server with nodemon
```

> **Note:** the code currently has a few known bugs that stop the server from starting (e.g. `app` is not imported in `src/index.js`). They are listed as **Phase 0** in [`projectPlan.md`](./projectPlan.md) – fix those first.

---

## 🛣️ Planned API (v1)

| Area | Example endpoints |
|---|---|
| Auth / Users | `POST /api/v1/users/register`, `/login`, `/logout`, `/refresh-token`, `GET /current-user`, `GET /c/:username` |
| Videos | `POST /api/v1/videos`, `GET /videos`, `GET /videos/:id`, `PATCH`, `DELETE`, toggle publish |
| Subscriptions | toggle subscribe, list subscribers / subscribed channels |
| Comments & Likes | add/update/delete comments, toggle likes on videos/comments/tweets |
| Playlists | create, add/remove videos, update, delete |
| Dashboard | channel stats, healthcheck |

---

## 🧭 Roadmap

Full step-by-step plan: **[projectPlan.md](./projectPlan.md)**

## 👤 Author

**Motiram Khillare** – MCA student, Vishwakarma University, Pune

## 📄 License

ISC
