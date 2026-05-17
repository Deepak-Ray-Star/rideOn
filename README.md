# 🚗 RideOn
### Smart Car Rental & Booking Platform

RideOn is a **full-stack car rental web application** that connects **car owners** with **renters** seamlessly. Users can browse available cars, check availability by location and date, book rides, and manage everything through a clean dashboard — while owners can list, manage, and track their fleet and bookings.

This project follows a **modular architecture** with separate folders for **Client** and **Server**, making it scalable and production-ready.

---

## 🌐 Live URL
🔗 [https://ride-on-ease.vercel.app/](https://ride-on-ease.vercel.app/)

---

## 🚀 Features

### 👤 User (Renter)
- Secure registration & login (JWT + bcrypt)
- Browse all available cars
- Filter cars by **location**, **pickup date**, and **return date**
- View detailed car info (brand, model, year, fuel type, transmission, seating, price/day)
- Book a car with automatic **price calculation** based on rental days
- View personal booking history with status tracking
- Upload and update profile picture

### 🧑‍💼 Owner (Car Lister)
- Switch role from User → Owner with one click
- Add cars with image upload (auto-optimised via ImageKit CDN)
- Manage all listed cars (toggle availability, delete listing)
- View all incoming bookings from renters
- Change booking status: **Pending → Confirmed / Cancelled**
- Owner **dashboard** with real-time stats:
  - Total cars listed
  - Total bookings
  - Pending & completed bookings
  - Monthly revenue (from confirmed bookings)
  - Recent bookings list

### 🔐 Authentication & Security
- JWT-based authentication
- Passwords hashed with **bcrypt**
- Protected API routes via auth middleware
- Role-based access control (**user** / **owner**)

---

## 🗂️ Project Structure

```
RideOn/
│
├── client/                        # React Frontend (Vite)
│   ├── src/
│   │   ├── components/            # Navbar, Banner, Hero, Footer, CarCard, Login...
│   │   ├── components/owner/      # Owner Navbar, Sidebar
│   │   ├── pages/                 # Home, Cars, CarDetails, MyBookings
│   │   ├── pages/owner/           # Dashboard, AddCar, ManageCars, ManageBookings
│   │   ├── Context/               # AppContext (global state)
│   │   └── assets/                # Icons, images
│   └── vercel.json
│
├── server/                        # Node.js Backend
│   ├── configs/                   # DB, ImageKit config
│   ├── controllers/               # User, Owner, Booking controllers
│   ├── middleware/                 # JWT Auth, Multer (file upload)
│   ├── models/                    # User, Car, Booking schemas
│   ├── routes/                    # API route definitions
│   ├── utils/                     # Token generator
│   └── server.js
│
└── README.md
```

---

## 🎨 Frontend (Client)

### Tech Stack
- React.js 19
- Vite
- Tailwind CSS v4
- Axios
- React Router DOM v7
- React Hot Toast
- Motion (Framer Motion)

### Pages & Components

| Page / Component | Description |
|-----------------|-------------|
| `Home` | Landing page with Hero, Banner, Featured Cars, Testimonials, Newsletter |
| `Cars` | Browse all available cars with search & filter |
| `CarDetails` | Full car details with booking form (location, dates) |
| `MyBookings` | User's booking history with status badges |
| `Owner/Dashboard` | Stats overview — revenue, bookings, cars |
| `Owner/AddCar` | Form to list a new car with image upload |
| `Owner/ManageCars` | View, toggle availability, delete listed cars |
| `Owner/ManageBookings` | View all incoming bookings, update status |

### Run Client
```bash
cd client
npm install
npm run dev
```

### Client Environment Variables (.env)
```
VITE_SERVER_URL=your_backend_url
```

---

## 🧠 Backend (Server)

### Tech Stack
- Node.js
- Express.js 5
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcrypt
- ImageKit (image upload + CDN + auto-optimisation)
- Multer (file upload handling)
- dotenv

### API Endpoints

#### 👤 User Routes — `/api/user`
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/signup` | ❌ | Register new user |
| POST | `/login` | ❌ | Login user |
| GET | `/data` | ✅ | Get logged-in user data |
| GET | `/cars` | ❌ | Get all available cars |

#### 🧑‍💼 Owner Routes — `/api/owner`
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/change-role` | ✅ | Upgrade user role to owner |
| POST | `/add-car` | ✅ | Add a new car listing (with image) |
| GET | `/cars` | ✅ | Get all cars listed by owner |
| POST | `/toggle-car` | ✅ | Toggle car availability on/off |
| POST | `/delete-car` | ✅ | Remove a car listing |
| GET | `/dashboard` | ✅ | Get owner dashboard stats |
| POST | `/update-image` | ✅ | Update owner profile picture |

#### 📅 Booking Routes — `/api/booking`
| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/check-availability` | ❌ | Check car availability by location & dates |
| POST | `/create` | ✅ | Create a new booking |
| GET | `/user` | ✅ | Get all bookings of logged-in user |
| GET | `/owner` | ✅ | Get all bookings received by owner |
| POST | `/change-status` | ✅ | Update booking status (confirm/cancel) |

### Run Server
```bash
cd server
npm install
npm run server
```

### Server Environment Variables (.env)
```
PORT=5000
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
```

---

## 🗃️ Database Models

### User
| Field | Type | Description |
|-------|------|-------------|
| name | String | User's full name |
| email | String | Unique email |
| password | String | Hashed password |
| role | String | `user` or `owner` |
| image | String | Profile picture URL |

### Car
| Field | Type | Description |
|-------|------|-------------|
| owner | ObjectId | Reference to User |
| brand | String | Car brand |
| model | String | Car model |
| year | Number | Manufacturing year |
| category | String | Car category (SUV, Sedan, etc.) |
| seating_capacity | Number | Number of seats |
| fuel_type | String | Petrol / Diesel / Electric |
| transmission | String | Manual / Automatic |
| pricePerDay | Number | Rental price per day |
| location | String | Car pickup location |
| image | String | Optimised ImageKit CDN URL |
| isAvailable | Boolean | Availability status |

### Booking
| Field | Type | Description |
|-------|------|-------------|
| car | ObjectId | Reference to Car |
| user | ObjectId | Reference to User (renter) |
| owner | ObjectId | Reference to User (owner) |
| pickupDate | Date | Start of rental |
| returnDate | Date | End of rental |
| price | Number | Auto-calculated total price |
| status | String | `pending` / `confirmed` / `cancelled` |

---

## ☁️ Deployment

| Service | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend | Vercel (serverless) |
| Database | MongoDB Atlas |
| Image Storage | ImageKit CDN |

---

## 🧭 Future Enhancements

- Search & filter cars by fuel type, transmission, category
- Real-time booking notifications
- Ratings & reviews for cars and owners
- Map-based car location picker
- Email confirmation on booking
- Payment gateway integration (Stripe / Razorpay)
- Mobile app (React Native)

---

## 👨‍💻 Author

**Deepak Ray** <br>
B.Tech Computer Science Engineering (Final Year)<br>
Full-Stack Developer | MERN Stack<br>

[![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/deepak-ray-842991260/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?logo=gmail&logoColor=white)](https://mail.google.com/mail/?view=cm&to=deepakray262003@gmail.com)

---

## 📜 License
This project is licensed under the MIT License.

