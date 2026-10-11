# 📋 Project Plan – VideoTube (Video-player)

**Last code activity:** 31 Jul 2026 (7 commits, 23 Jul → 31 Jul)
**Where you stopped:** Backend foundation – setup, DB connection, models (draft), utility files.
**Rough completion:** Backend ≈ 15% · Frontend 0% · Overall ≈ 7%

Legend: ✅ done · 🟡 started but has bugs · ⬜ not started

---

## Progress Snapshot

| Part | Status | Notes |
|---|---|---|
| Project setup, Git, Prettier | ✅ | Folder structure, `.gitignore`, `.prettierrc` |
| MongoDB Atlas connection | ✅ | `src/db/index.js` (DB name: `videotube`) |
| Express app + middleware | 🟡 | CORS, cookies, JSON parsing done; has one wrong line |
| `User` model | 🟡 | Schema fine, hooks/methods have bugs |
| `Video` model | 🟡 | Schema fine, model registration has bug |
| Utils (ApiError, ApiResponse, asyncHandler) | 🟡 | `ApiResponse` not exported, `asyncHandler` broken |
| Cloudinary helper | 🟡 | Config bug, won't work yet |
| Multer middleware | 🟡 | Works once `public/temp` exists |
| Routes / controllers | ⬜ | Nothing yet |
| JWT auth middleware | ⬜ | |
| Frontend | ⬜ | |

---

# 🔧 BACKEND PLAN (do this first)

## Phase 0 – Fix the foundation (≈ 1 day)

These bugs mean the server can't start or work correctly right now. Fix them before adding features.

| # | File | Problem | Fix |
|---|---|---|---|
| 1 | `src/index.js` | `app` is used but never imported | `import { app } from "./app.js"` |
| 2 | `src/index.js` | Inside `app.listen` callback there's `throw error` – crashes right after the server starts. Also `import { error } from 'console'` is wrong | Remove `throw error` and the `console` import; use `app.on("error", (err) => {...})` *before* `listen` |
| 3 | `src/app.js` | `app.use(express.json)` at the bottom (not called, not needed) | Delete that line |
| 4 | `src/utils/asynHandler.js` | `asyncHandler` is declared **twice**, first version has `(res,res,next)` and no return | Keep only one version: `const asyncHandler = (fn) => (req,res,next) => Promise.resolve(fn(req,res,next)).catch(next)` |
| 5 | `src/utils/ApiResponse.js` | Class is never exported | Add `export { ApiResponse }` |
| 6 | `src/utils/cloundinary.js` | Imports `v2` but uses `cloudinary` (undefined); config values are **strings** like `"process.env.X"` | `import { v2 as cloudinary } from "cloudinary"` and use `process.env.CLOUDINARY_CLOUD_NAME` (no quotes). Also delete the local file after a *successful* upload |
| 7 | `src/models/user.models.js` | `mongoose.model("User","userSchema")` – schema passed as a string | `mongoose.model("User", userSchema)` |
| 8 | `src/models/user.models.js` | `bcrypt.hash(...)` has no `await` → password saved as a Promise | `this.password = await bcrypt.hash(this.password, 10)`; use an `async` hook without `next` |
| 9 | `src/models/user.models.js` | `generateAccessToken` / `generateRefreshToken` don't `return` the token; field is `Username` but token uses `this.username` | Add `return jwt.sign(...)`; rename field to `username` everywhere |
| 10 | `src/models/video.models.js` | Same string-instead-of-schema bug; `owner` has `ref: "Video"` | `mongoose.model("Video", videoSchema)`; `ref: "User"` |
| 11 | `src/models/video.models.js` | `title` is not required; field name `thumbnil` is a typo | Make `title` required; rename to `thumbnail` |
| 12 | `package.json` | Package `mongose` (typo, placeholder package) is installed; name is `new-folder`; `main` points to wrong file | `npm uninstall mongose`; rename project to `videotube`; `main: "src/index.js"`; add `"start": "node src/index.js"` |
| 13 | `public/` | `public/temp` folder doesn't exist, Multer will fail | Create `public/temp/.gitkeep` and ignore the contents in `.gitignore` |
| 14 | Files | Typos in file names (`cloundinary`, `asynHandler`, `middelwares`) | Rename to `cloudinary.js`, `asyncHandler.js`, `multer.middleware.js` and fix imports |

**✔ Done when:** `npm run dev` prints "MongoDB connected" and "Server is running at port 8000".

---

## Phase 1 – Project setup ✅ (done)
- [x] Folder structure (`src/db`, `models`, `utils`, `middlewares`)
- [x] Git repo + `.gitignore` (with `.env` ignored)
- [x] Prettier
- [x] Dependencies installed
- [x] MongoDB Atlas connection

## Phase 2 – Core helpers & middleware (≈ 1–2 days)
- [ ] Finish `asyncHandler`, `ApiError`, `ApiResponse` (Phase 0)
- [ ] Fix Cloudinary helper and test one image upload
- [ ] Improve Multer (unique filenames, file type + size limits)
- [ ] **Global error-handling middleware** (returns `ApiError` as clean JSON)
- [ ] **`verifyJWT` auth middleware** (reads token from cookie or `Authorization` header, attaches `req.user`)
- [ ] Create `.env.example` (without real values)
- [ ] Set up `routes/` and `controllers/` folders and mount routes in `app.js` under `/api/v1/...`

## Phase 3 – Complete the data models (≈ 1 day)
- [x] `User` (finish after Phase 0 fixes)
- [x] `Video` (finish after Phase 0 fixes)
- [ ] `Subscription` – `subscriber` (→ User), `channel` (→ User)
- [ ] `Comment` – `content`, `video`, `owner`
- [ ] `Like` – `likedBy` + one of `video` / `comment` / `tweet`
- [ ] `Playlist` – `name`, `description`, `videos[]`, `owner`
- [ ] `Tweet` (community post) – `content`, `owner`
- [ ] Add `mongoose-aggregate-paginate-v2` for aggregation-based lists

## Phase 4 – User & Authentication (≈ 3–4 days) ⭐ most important
- [ ] `POST /users/register` – validate fields, check duplicates, upload avatar (+ cover) via Multer → Cloudinary, hash password, create user
- [ ] `POST /users/login` – verify password, generate access + refresh token, send in secure HTTP-only cookies
- [ ] `POST /users/logout` – clear cookies and remove refresh token from DB
- [ ] `POST /users/refresh-token` – issue a new access token
- [ ] `POST /users/change-password`
- [ ] `GET /users/current-user`
- [ ] `PATCH /users/update-account` – name, email
- [ ] `PATCH /users/avatar` and `/cover-image` – replace image (delete old one on Cloudinary)

## Phase 5 – Channel & Watch History (≈ 2 days)
- [ ] `GET /users/c/:username` – channel profile using **MongoDB aggregation** (subscriber count, subscribed-to count, `isSubscribed`)
- [ ] `GET /users/history` – watch history with nested lookup for video owner

## Phase 6 – Videos (≈ 3 days)
- [ ] `POST /videos` – upload video + thumbnail, save duration from Cloudinary response
- [ ] `GET /videos` – pagination, search by title, sort, filter by user
- [ ] `GET /videos/:id` – increment views, add to watch history
- [ ] `PATCH /videos/:id` – update title/description/thumbnail (owner only)
- [ ] `DELETE /videos/:id` – delete (owner only) + remove from Cloudinary
- [ ] `PATCH /videos/:id/publish` – toggle publish status

## Phase 7 – Social features (≈ 4–5 days)
- [ ] **Subscriptions** – toggle subscribe, list channel's subscribers, list channels I subscribed to
- [ ] **Comments** – add / update / delete / list (paginated) per video
- [ ] **Likes** – toggle like on video / comment / tweet, list liked videos
- [ ] **Playlists** – create, get, add/remove video, update, delete
- [ ] **Tweets** – create, list by user, update, delete

## Phase 8 – Dashboard & health (≈ 1 day)
- [ ] `GET /healthcheck`
- [ ] `GET /dashboard/stats` – total videos, views, subscribers, likes
- [ ] `GET /dashboard/videos` – channel's uploaded videos

## Phase 9 – Quality, security, docs (≈ 2–3 days)
- [ ] Input validation (e.g. `zod` or `express-validator`)
- [ ] `helmet`, `express-rate-limit`
- [ ] Test every endpoint in Postman → export collection
- [ ] Add a few automated tests (Jest + Supertest) for auth routes
- [ ] Update README with the final API list

---

# 🎨 FRONTEND PLAN (after backend is stable) – React (MERN)

- [ ] Vite + React setup, folder structure, Tailwind CSS
- [ ] Axios instance with `withCredentials`, refresh-token interceptor
- [ ] Auth pages: Register, Login + protected routes (Context or Redux Toolkit)
- [ ] Home page – video grid with infinite scroll / pagination
- [ ] Video player page – player, like, subscribe, comments, related videos
- [ ] Upload video page with progress bar
- [ ] Channel page – profile, tabs (Videos, Playlists, Tweets, About)
- [ ] Watch history, liked videos, playlists pages
- [ ] Dashboard page (stats + manage videos)
- [ ] Responsive design, loading & error states

# 🧪 TESTING

- [ ] Postman collection for all APIs
- [ ] Backend tests (Jest + Supertest) for auth and video routes
- [ ] Manual end-to-end test of the full flow (register → upload → watch → comment)

# 🚀 DEPLOYMENT

- [ ] Backend → Render / Railway (set env variables, CORS origin = frontend URL)
- [ ] Database → MongoDB Atlas (restrict IP access, strong password)
- [ ] Frontend → Vercel / Netlify
- [ ] Add live links + screenshots to README
- [ ] Record a short demo video for your portfolio / resume

---

## ⏱️ Rough Timeline (a few hours per day)

| Stage | Estimate |
|---|---|
| Phase 0 – Fix foundation | 1 day |
| Phases 2–3 – Helpers + models | 2–3 days |
| Phase 4–5 – Auth + channel | 5–6 days |
| Phase 6 – Videos | 3 days |
| Phase 7–8 – Social + dashboard | 5–6 days |
| Phase 9 – Testing & security | 2–3 days |
| **Backend total** | **≈ 3 weeks** |
| Frontend | ≈ 3–4 weeks |
| Deployment + polish | ≈ 3–4 days |

## 🔐 Security reminders

- Never share or commit `.env`. If real keys were ever in a zip, email or chat, **regenerate them** (Atlas password, Cloudinary secret, JWT secrets).
- Use long random strings for the JWT secrets.
- Keep refresh tokens in HTTP-only cookies.

## 📝 Resume tip

Once the backend and frontend are live, describe this as: *"Full-stack video-sharing platform (MERN) with JWT authentication, Cloudinary media uploads, MongoDB aggregation pipelines, subscriptions, comments, likes and playlists."*
