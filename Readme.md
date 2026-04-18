# 🧭 Wanderlust

> A full-stack Airbnb-inspired web application to **discover and list unique stays** around the world — built with Node.js, Express, MongoDB, EJS, Cloudinary, and Mapbox.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-8.x-47A248?style=flat&logo=mongodb&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3-7952B3?style=flat&logo=bootstrap&logoColor=white)
![Mapbox](https://img.shields.io/badge/Mapbox-GL%20JS-000000?style=flat&logo=mapbox&logoColor=white)

---

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Seed Data](#-seed-data)
- [Route Reference](#-route-reference)
- [Image Uploads](#-image-uploads-cloudinary)
- [Maps](#-maps-mapbox)
- [Auth](#-authentication)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## ✨ Features

- 🔐 **Authentication** — Register, login, logout via Passport.js local strategy
- 🏠 **Listings** — Full CRUD with image upload, location, price, and description
- ⭐ **Reviews & Ratings** — Star ratings with comments on every listing
- 🗺️ **Interactive Maps** — Mapbox GL JS map with geocoded location on each listing page
- 🛡️ **Authorization** — Owners manage their own listings; review authors manage their reviews
- ☁️ **Cloudinary Uploads** — Images stored on Cloudinary, served via CDN
- 💬 **Flash Messages** — Success and error feedback on every action
- 📱 **Responsive UI** — Bootstrap 5 with custom CSS and Plus Jakarta Sans typography
- 🗃️ **Persistent Sessions** — Secure cookie-based sessions via express-session

---

## 🧰 Tech Stack

| Layer          | Technology                            |
| -------------- | ------------------------------------- |
| Runtime        | Node.js 18+                           |
| Framework      | Express.js 5                          |
| Database       | MongoDB + Mongoose 8                  |
| Auth           | Passport.js + passport-local-mongoose |
| Templating     | EJS + ejs-mate                        |
| Styling        | Bootstrap 5.3 + Custom CSS            |
| Icons          | Font Awesome 6                        |
| Fonts          | Plus Jakarta Sans (Google Fonts)      |
| Image Uploads  | Multer + Cloudinary                   |
| Maps           | Mapbox GL JS v3 + Mapbox Geocoding    |
| Sessions       | express-session                       |
| Flash Messages | connect-flash                         |
| Form Methods   | method-override                       |
| Dev Server     | nodemon                               |

---

## 📁 Project Structure

```
wanderlust/
├── app.js                    # Entry point
├── middleware.js             # isLoggedin, saveRedirectUrl
├── cloudConfig.js            # Cloudinary + Multer config
├── .env                      # Environment variables (never commit)
├── .gitignore
├── package.json
├── README.md
│
├── init/
│   ├── data.js               # 28 sample listings
│   └── index.js              # DB seeder script
│
├── utils/
│   ├── ExpressError.js       # Custom error class
│   └── wrapAsync.js          # Async error wrapper
│
├── models/
│   ├── listing.js            # Listing schema with GeoJSON geometry
│   ├── review.js             # Review schema (rating + comment)
│   └── User.js               # User schema (passport-local-mongoose)
│
├── routes/
│   ├── listings.js           # Listing routes
│   ├── reviews.js            # Review routes
│   └── User.js               # Auth routes
│
├── controllers/
│   ├── listing.js            # Listing CRUD + Cloudinary + Mapbox logic
│   ├── review.js             # Review create/delete logic
│   └── user.js               # Register, login, logout logic
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs   # Master layout
│   ├── includes/
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── flash.ejs
│   ├── listings/
│   │   ├── index.ejs         # All listings grid
│   │   ├── show.ejs          # Listing detail + map + reviews
│   │   ├── new.ejs           # Create listing form
│   │   └── edit.ejs          # Edit listing form
│   ├── users/
│   │   ├── login.ejs
│   │   └── signin.ejs
│   ├── error.ejs
│   └── notfound.ejs
│
└── public/
    ├── css/
    │   ├── style.css         # Custom styles
    │   └── rating.css        # Star rating widget
    └── js/
        ├── script.js         # Bootstrap form validation
        └── map.js            # Mapbox map initialisation
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/try/download/community) locally **or** a [MongoDB Atlas](https://cloud.mongodb.com) cluster
- [Cloudinary](https://cloudinary.com) account
- [Mapbox](https://mapbox.com) account (free tier works)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/wanderlust.git
cd wanderlust
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
# Open .env and fill in your credentials (see below)
```

### 4. Seed the database _(optional)_

```bash
node init/index.js
```

### 5. Start the development server

```bash
npx nodemon app.js
# or
node app.js
```

### 6. Visit `http://localhost:8080/listings`

---

## ⚙️ Environment Variables

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

| Variable           | Description                                       |
| ------------------ | ------------------------------------------------- |
| `MAP_TOKEN`        | Mapbox public token for geocoding and map display |
| `CLOUD_NAME`       | Cloudinary cloud name                             |
| `CLOUD_API_KEY`    | Cloudinary API key                                |
| `CLOUD_API_SECRET` | Cloudinary API secret                             |
| `SESSION_SECRET`   | Secret string used to sign session cookies        |

> ⚠️ Never commit your `.env` file. Make sure it is listed in `.gitignore`.

---

## 🌱 Seed Data

The `init/` folder contains 28 sample listings spanning locations from Malibu to the Maldives.

```bash
node init/index.js
```

This will clear the `listings` collection and insert all sample listings. Update the `owner` field in `init/index.js` to point to a valid user ObjectId in your database.

---

## 🗺️ Route Reference

### Listings

| Method | Route                | Description          | Auth Required |
| ------ | -------------------- | -------------------- | ------------- |
| GET    | `/listings`          | All listings (index) | No            |
| GET    | `/listings/new`      | New listing form     | Yes           |
| POST   | `/listings`          | Create a listing     | Yes           |
| GET    | `/listings/:id`      | Show a listing       | No            |
| GET    | `/listings/:id/edit` | Edit listing form    | Yes (owner)   |
| PUT    | `/listings/:id`      | Update a listing     | Yes (owner)   |
| DELETE | `/listings/:id`      | Delete a listing     | Yes (owner)   |

### Reviews

| Method | Route                             | Description     | Auth Required |
| ------ | --------------------------------- | --------------- | ------------- |
| POST   | `/listings/:id/reviews`           | Post a review   | Yes           |
| DELETE | `/listings/:id/reviews/:reviewID` | Delete a review | Yes (author)  |

### Auth

| Method | Route     | Description   |
| ------ | --------- | ------------- |
| GET    | `/signin` | Register form |
| POST   | `/signin` | Register user |
| GET    | `/login`  | Login form    |
| POST   | `/login`  | Log in        |
| GET    | `/logout` | Log out       |

---

## ☁️ Image Uploads (Cloudinary)

- One image per listing
- Accepted formats: `jpg`, `jpeg`, `png`, `webp`
- Uploaded via Multer and stored directly on Cloudinary
- Image URL and filename are saved in the listing document
- On listing update — a new image replaces the old one

---

## 🗺️ Maps (Mapbox)

- Location string → `[longitude, latitude]` GeoJSON Point via Mapbox Geocoding API
- Stored in `listing.geometry` with the `Point` type
- Rendered on the listing detail page using **Mapbox GL JS v3**
- Custom red marker at zoom level 9

---

## 🔐 Authentication

Passport.js with the `passport-local` strategy and `passport-local-mongoose` plugin.

- Sessions persist across requests via `express-session`
- Protected routes redirect unauthenticated users to `/login` with the original URL saved for post-login redirect
- Passwords are hashed automatically by `passport-local-mongoose` — no manual bcrypt needed

---

## 🔮 Roadmap

- [x] 🔐 Authentication (Passport.js)
- [x] 🏠 Listings CRUD with Cloudinary image upload
- [x] ⭐ Reviews & star ratings
- [x] 🗺️ Mapbox location maps with geocoding
- [x] 🛡️ Ownership-based authorization
- [x] 💬 Flash messages
- [ ] 🔍 Search and filter listings
- [ ] 📄 Pagination on listings page
- [ ] 👤 User profile page (own listings + reviews)
- [ ] 🔖 Wishlist / saved listings
- [ ] 🌐 Google OAuth login
- [ ] 🗺️ Cluster map on listings index page
- [ ] 📲 PWA support

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT — free to use, modify, and distribute.

---

<p align="center">Built with ❤️ · All Rights Reserved By Wanderlust © 2025</p>
