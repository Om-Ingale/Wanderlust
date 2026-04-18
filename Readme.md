# 🧭 Wanderlust

An Airbnb-inspired full-stack web application where users can browse, create, and review property listings from around the world — complete with interactive maps, image uploads, and user authentication.

---

## 🌐 Live Demo

> Coming soon

---

## 📸 Screenshots

> Add screenshots here after deployment

---

## ✨ Features

- Browse property listings from around the world
- Create, edit, and delete your own listings
- Upload listing images (stored on Cloudinary)
- Interactive Mapbox map on each listing's detail page
- Leave star ratings and comments as reviews
- User authentication — sign up, log in, log out
- Flash messages for success and error feedback
- Ownership-based access control (only owners can edit/delete their listings)
- Responsive UI using Bootstrap 5
- Custom 404 not-found page

---

## 🛠️ Tech Stack

| Layer         | Technology                            |
| ------------- | ------------------------------------- |
| Runtime       | Node.js                               |
| Framework     | Express.js v5                         |
| Database      | MongoDB + Mongoose                    |
| Templating    | EJS + ejs-mate                        |
| Auth          | Passport.js (passport-local-mongoose) |
| Image Storage | Cloudinary + Multer                   |
| Maps          | Mapbox GL JS + Mapbox Geocoding API   |
| Styling       | Bootstrap 5 + Custom CSS              |
| Sessions      | express-session + connect-flash       |

---

## 📁 Project Structure

```
wanderlust/
├── controllers/
│   ├── listing.js       # Listing CRUD logic
│   ├── review.js        # Review create/delete logic
│   └── user.js          # Auth logic (register, login, logout)
├── models/
│   ├── listing.js       # Listing schema (with GeoJSON geometry)
│   ├── review.js        # Review schema
│   └── User.js          # User schema (passport-local-mongoose)
├── routes/
│   ├── listings.js      # Listing routes
│   ├── reviews.js       # Review routes
│   └── User.js          # Auth routes
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── includes/
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── flash.ejs
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── show.ejs
│   │   ├── new.ejs
│   │   └── edit.ejs
│   └── users/
│       ├── login.ejs
│       └── signin.ejs
├── public/
│   ├── css/
│   │   ├── style.css
│   │   └── rating.css
│   └── js/
│       ├── script.js    # Bootstrap form validation
│       └── map.js       # Mapbox map init
├── utils/
│   ├── ExpressError.js  # Custom error class
│   └── wrapAsync.js     # Async error wrapper
├── init/
│   ├── data.js          # Seed data
│   └── index.js         # DB seed script
├── app.js               # Express app entry point
├── middleware.js         # isLoggedin, saveRedirectUrl
├── cloudConfig.js        # Cloudinary + multer config
└── .env                 # Environment variables (not committed)
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- A [Cloudinary](https://cloudinary.com/) account
- A [Mapbox](https://mapbox.com/) account

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/wanderlust.git
cd wanderlust
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Mapbox
MAP_TOKEN=your_mapbox_public_token

# Cloudinary
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Session
SESSION_SECRET=your_strong_random_secret
```

4. **Seed the database** _(optional)_

```bash
node init/index.js
```

5. **Start the server**

```bash
node app.js
# or with nodemon for development
npx nodemon app.js
```

6. **Visit** `http://localhost:8080/listings`

---

## 🔐 Environment Variables

| Variable           | Description                                                     |
| ------------------ | --------------------------------------------------------------- |
| `MAP_TOKEN`        | Mapbox public access token (used for geocoding and map display) |
| `CLOUD_NAME`       | Cloudinary cloud name                                           |
| `CLOUD_API_KEY`    | Cloudinary API key                                              |
| `CLOUD_API_SECRET` | Cloudinary API secret                                           |
| `SESSION_SECRET`   | Secret string for express-session                               |

> ⚠️ Never commit your `.env` file. Make sure `.env` is listed in `.gitignore`.

---

## 🗺️ Routes

### Listings

| Method | Route                | Description          |
| ------ | -------------------- | -------------------- |
| GET    | `/listings`          | All listings (index) |
| GET    | `/listings/new`      | New listing form     |
| POST   | `/listings`          | Create a listing     |
| GET    | `/listings/:id`      | Show a listing       |
| GET    | `/listings/:id/edit` | Edit listing form    |
| PUT    | `/listings/:id`      | Update a listing     |
| DELETE | `/listings/:id`      | Delete a listing     |

### Reviews

| Method | Route                             | Description     |
| ------ | --------------------------------- | --------------- |
| POST   | `/listings/:id/reviews`           | Post a review   |
| DELETE | `/listings/:id/reviews/:reviewID` | Delete a review |

### Auth

| Method | Route     | Description   |
| ------ | --------- | ------------- |
| GET    | `/signin` | Register form |
| POST   | `/signin` | Register user |
| GET    | `/login`  | Login form    |
| POST   | `/login`  | Log in        |
| GET    | `/logout` | Log out       |

---

## 🚧 Known Issues & Planned Fixes

These are tracked bugs and improvements identified during code review, planned for future releases.

### 🐛 Bugs

- [ ] **`next` not in scope** — `user.js` controller's `signin` function calls `next(err)` inside `req.login()` callback but `next` is not a parameter. Causes `ReferenceError` on auth failure.
- [ ] **Stale `createdAt` timestamp** — `review.js` model uses `default: Date.now()` (called once at server start). Change to `default: Date.now` (no parentheses) so each review gets its own timestamp.
- [ ] **Catchall route error** — `app.js` calls `next()` after `res.render()` on the 404 route, potentially causing "headers already sent" errors. Remove the `next()` call.
- [ ] **Duplicate 1-star radio input** — `show.ejs` has two radio inputs with `value="1"`, making 1-star ratings submit as "no rating". The `no-rate` input needs `value="0"`.
- [ ] **Broken Google Font link** — `boilerplate.ejs` has a `<link href>` with an `@import url(...)` string instead of a real URL. Fonts are not loading from this tag. Remove the broken link (the import already exists in `style.css`).

### 🔐 Security

- [ ] **No server-side validation** — Joi is installed but unused. Add Joi schemas to validate listing and review input before hitting the database.
- [ ] **Mapbox token exposed** — The `MAP_TOKEN` is rendered directly into HTML in `show.ejs`. Create a domain-restricted Mapbox token for frontend use.
- [ ] **Review delete missing auth** — The `DELETE /:reviewID` route in `reviews.js` has no `isLoggedin` check. Any unauthenticated request can delete reviews.
- [ ] **Hardcoded session secret** — Replace `secret: 'mySecretCode'` in `app.js` with `process.env.SESSION_SECRET`.
- [ ] **Hardcoded owner ID in seed** — `init/index.js` uses a hardcoded MongoDB ObjectId for the listing owner. Replace with a dynamic lookup or user creation.
- [ ] **No geocoding error guard** — If Mapbox returns no results, `response.body.features[0]` crashes the server. Add a check before accessing `features[0]`.

### 🧹 Code Quality

- [ ] **Unused imports** — `Listing`, `ExpressError`, and `wrapAsync` are imported in route files but logic has moved to controllers. Clean up.
- [ ] **`app.listen` before routes** — The server starts listening inside `main().then()` before routes are registered lower in the file. Move `app.listen` to the end.
- [ ] **Misleading naming** — `signin` / `renderSignin` actually handle registration, not sign-in. Rename to `register` / `renderRegister` for clarity.
- [ ] **Broken HTML in `signin.ejs`** — The password field and submit button are incorrectly nested inside the email field's `<div>`. Fix the nesting so each field is a sibling `div`.
- [ ] **404 image from external CDN** — `notfound.ejs` loads the 404 image from Vecteezy. Replace with the local `notfound_png.jpg` served from `/public`.
- [ ] **No server-side ownership check** — Edit and delete routes rely only on view-level ownership checks. Add controller-level authorization.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

[MIT](LICENSE)

---

## 👤 Author

> Om Ingale

---

_Built with ❤️ . All Rights Reserved By Wanderlust._
