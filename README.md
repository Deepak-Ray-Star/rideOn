# 🚗 RideOn



A simple and clean car rental web app — search vehicles, book rides, and manage bookings everything from one place.

🔗 **Live Demo:** [ride-on-ease.vercel.app](https://ride-on-ease.vercel.app/)

---

## ✨ Features

- 🔐 User registration & login (JWT auth)
- 🚘 Browse & search available cars
- 📅 Book a car & process payments
- 🛠️ Admin dashboard to manage bookings

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js
- **Auth:** JWT + bcrypt
- **Database:** MongoDB
- **Payments:** Stripe
- **Deployment:** Vercel

---

## 🚀 Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/Deepak-Ray-Star/rideOn.git

# Backend setup
-> cd server 
-> npm install
-> npm run server

# Frontend setup
-> cd client 
-> npm install 
-> npm run dev
```

---

## 🔑 Environment Variables

```env
PORT=5000
DATABASE_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
```

---

## 📡 API Overview

| Method | Endpoint             | Description       |
|--------|----------------------|-------------------|
| POST   | `/auth/register`     | Register user     |
| POST   | `/auth/login`        | Login user        |
| GET    | `/cars`              | List all cars     |
| POST   | `/bookings`          | Create a booking  |
| POST   | `/payments/checkout` | Pay for booking   |
| GET    | `/admin/stats`       | Admin analytics   |

---

## 📄 License

MIT © [Your Name](https://github.com/your-username)
