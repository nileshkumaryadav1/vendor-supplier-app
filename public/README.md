
# 🛒 Vendor-Supplier Platform

A full-stack web application built with **Next.js**, designed to bridge the gap between **street food vendors** and **trusted suppliers**, enabling smooth procurement of affordable and quality raw materials.

## 🚀 Live Demo

🌐 [https://vendor-supplier-app.vercel.app/](https://vendor-supplier-app.vercel.app/)

---

## 📌 Problem Statement

> **Street food vendors do not get good and cheap raw material from trusted sources.**

Street vendors face multiple challenges when sourcing raw materials:
- No reliable suppliers
- Price fluctuations
- Quality inconsistency
- No digital system for managing orders

---

## 💡 Our Solution

A web platform that:
- Connects **vendors** to **verified suppliers**
- Allows **ordering raw materials** easily
- Enables suppliers to **list materials** with price and stock
- Provides a transparent and trustworthy ordering system

---

## 👤 User Roles

### 🧑‍🍳 Vendor
- Register/Login
- View all available raw materials
- Place orders
- Track delivery status

### 🏭 Supplier
- Register/Login
- Add/Edit/Delete raw materials
- View orders placed for their items
- Update delivery date/status

### 🛡️ Admin *(Future scope)*
- Monitor users and orders
- Approve supplier profiles

---

## 🖼️ Key Features

- ✅ **Authentication** (Vendor & Supplier)
- 📦 **Material listing by supplier**
- 🛍️ **Ordering system for vendors**
- 📬 **Order management dashboard for suppliers**
- 📅 **Delivery date update system**
- 🔐 Role-based dashboard redirection

---

## 📷 Screenshots

| Vendor Dashboard | Supplier Orders |
|------------------|-----------------|
| ![Vendor](public/home.png) | ![Supplier](public/suppliers.png) | 
| ![Dashboard](public/dashboard.png) | ![Admin Panal](public/admin.png) | 
---

## 🛠️ Tech Stack

- **Frontend:** Next.js 14 (App Router), Tailwind CSS
- **Backend:** Node.js, Express-style API routes (built into Next.js)
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (with localStorage)
- **Deployment:** Vercel

---

## 🔗 Folder Structure

```
.
├── app
│   ├── (auth)/vendor
│   ├── (auth)/supplier
│   ├── vendor-dashboard
│   ├── supplier-dashboard
│   ├── api
│   │   ├── auth
│   │   ├── material
│   │   └── order
├── models
├── lib (DB & utils)
└── public
```

---

## ⚙️ Setup Instructions

1. **Clone the repository**
```bash
git clone https://github.com/nileshkumaryadav1/vendor-supplier-app.git
cd vendor-supplier-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Add `.env.local`**
```
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
```

4. **Run locally**
```bash
npm run dev
```

---

## 📹 Presentation Video

🎥 [Hackathon Submission Video](#) *(Add after upload)*

---

## 📣 GPT Bro Team

👨‍💻 **Nilesh Kumar** – Full Stack Developer  
🌐 [GitHub](https://github.com/nileshkumaryadav1) | [LinkedIn](https://linkedin.com/in/nileshkumar123)

👨‍💻 **Tejas Maurya** – UI-UX
🌐 [GitHub](https://github.com/) | [LinkedIn](https://linkedin.com/in/)

👨‍💻 **Shivam Kumar** – Backend Developer  
🌐 [GitHub](https://github.com/) | [LinkedIn](https://linkedin.com/in/)

👨‍💻 **Sahil Shaini** – Documentations and Presentations  
🌐 [GitHub](https://github.com/) | [LinkedIn](https://linkedin.com/in/)

👨‍💻 **vishal Singh** – Frontend Developer  
🌐 [GitHub](https://github.com/) | [LinkedIn](https://linkedin.com/in/)

---

## 🏁 Future Scope

- Admin dashboard to manage users and disputes
- SMS/email notifications
- Supplier verification system
- Delivery tracking integration
- Mobile responsive redesign

---

## 💙 Acknowledgments

Built as a submission for the **TuteDute Web Development Hackathon 1.0 2025**. Thanks to all mentors and teammates for the guidance and feedback.

---
