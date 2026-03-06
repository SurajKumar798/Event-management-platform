# 🎪 EventHub — Event Management Platform

> A full-stack event management web application built with **React**, **Node.js**, **Express**, and **MongoDB**. Create, manage, and track events with a clean and responsive UI.

---

## 🌐 Live Demo

> 🔗(https://event-management-platform-frontend-my7z.onrender.com/)

---

## ✨ Features

- 🎉 Create, edit, and delete events
- 🔐 JWT-based user authentication (login & register)
- 📋 Personal event dashboard — view all your events
- ✅ Form validation with inline error messages
- 💾 LocalStorage sync for fast UI updates
- 📱 Fully responsive design with Tailwind CSS
- 🔒 Secure password hashing with bcryptjs
- 🚀 RESTful API with Express.js

---

## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|------|---------|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Tailwind CSS v3 | Styling |
| Axios | HTTP requests |
| Vite | Build tool |

### Backend
| Tech | Purpose |
|------|---------|
| Node.js 18+ | Runtime |
| Express.js | REST API framework |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Token (JWT) | Authentication |
| bcryptjs | Password hashing |
| dotenv | Environment variables |
| cors | Cross-origin requests |

---

## 📁 Project Structure

```
event-platform/
│
├── 📂 client/                          # React Frontend (Vite)
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── src/
│       ├── main.jsx                    # Entry point
│       ├── App.jsx                     # Routes
│       ├── index.css                   # Tailwind directives
│       ├── api/
│       │   └── axios.js                # Axios instance with JWT interceptor
│       ├── components/
│       │   └── Navbar.jsx              # Shared navigation bar
│       ├── Home.jsx                # Create / Edit event form
│       ├── Login.jsx               # User login
│       ├── Register.jsx            # User registration
│       ├── MyEventDetails.jsx      # Event dashboard
└── 📂 server/                          # Express Backend
    ├── app.js                        # Server entry point and CRUD operation
    ├── package.json
    ├── .env.example                    # Environment variable template
    ├── models/
    │   ├── User.js                     # User schema (bcrypt password hashing)
    │   └── customer.js                    # Customer schema
  
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/SurajKumar798/event-platform.git
cd event-platform
```

---

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server:

```bash
npm run dev       # Development with nodemon
npm start         # Production
```

> Server runs on `http://localhost:8000`

---

### 3. Setup the Frontend

```bash
cd client
npm install
npm run dev
```

> App runs on `http://localhost:5173`

---

## 🔗 API Endpoints

### 🔐 Auth — `/auth`

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/auth/register` | `{ name, email, password }` | Register new user |
| POST | `/auth/login` | `{ email, password }` | Login, returns JWT token |

---

### 🎪 Events — `/events`

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| POST | `/home` | `{ fname, lname, email, address, eventName, date, city, state, zipcode }` | Create event |
| GET | `/events` | — | Get all events |
| GET | `/events/:id` | — | Get single event |
| PUT | `/events/:id` | Event fields | Update event |
| DELETE | `/events/:id` | — | Delete event |

---

## 🌍 Environment Variables

### `server/.env`

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `8000` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT signing | `mysecretkey123` |

---

## 🚀 Deployment

### Frontend → [Vercel](https://vercel.com)

```bash
cd client
npm run build
# Deploy the /dist folder to Vercel
```

### Backend → [Render](https://render.com) or [Railway](https://railway.app)

- Set root directory to `server/`
- Start command: `npm start`
- Add environment variables: `PORT`, `MONGO_URI`, `JWT_SECRET`
- Update CORS origin in `server/index.js` to your frontend's deployed URL

---

## 📜 Scripts

### Backend (`server/`)

| Command | Description |
|---------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start with nodemon (auto-restart) |

### Frontend (`client/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your branch — `git checkout -b feature/AmazingFeature`
3. Commit your changes — `git commit -m "Add AmazingFeature"`
4. Push to branch — `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

Distributed under the [MIT License](LICENSE).

---

---

<p align="center">Built with ❤️ using React + Node.js + MongoDB</p>
