# 🚗 RideOnEase



A simple and clean car rental web app — search vehicles, book rides, and manage everything from one place.

🔗 **Live Demo:** [ride-on-ease.vercel.app](https://ride-on-ease.vercel.app/)

---

## ✨ Features

- 🔐 User registration & login (JWT auth)
- 🚘 Browse & search available cars
- 📅 Book a car & process payments
- 🛠️ Admin dashboard to manage fleet & bookings

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
git clone https://github.com/your-username/ride-on-ease.git
cd ride-on-ease

# 2. Install dependencies
npm install

# 3. Add environment variables
cp .env.example .env

# 4. Start the server
npm run dev
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
