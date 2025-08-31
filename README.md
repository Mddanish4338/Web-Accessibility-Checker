# Web Accessibility Checker

A comprehensive **Web Accessibility Checker** built using **Node.js**, **Express**, **React**, and **MongoDB**. This tool analyzes websites for accessibility issues and generates detailed reports to help developers make their websites more inclusive.

---

## 🚀 Features

* **Website Scanning** → Analyze any URL for accessibility compliance.
* **Accessibility Reports** → Detailed reports with categorized issues.
* **Severity Levels** → Issues categorized as low, medium, high, and critical.
* **Report Export** → Downloadable reports for reference.
* **Real-time Dashboard** → Interactive UI built using React.
* **RESTful API** → Fully documented endpoints for integration.

---

## 🛠️ Tech Stack

* **Frontend:** React, Tailwind CSS, ShadCN UI, Framer Motion
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose ORM)
* **Authentication:** JWT-based authentication
* **Others:** Axios, Nodemon, Dotenv

---

## ⚡ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/web-accessibility-checker.git
cd web-accessibility-checker
```

### 2️⃣ Install Dependencies

```bash
cd backend
npm install
cd ../frontend
npm install
```

### 3️⃣ Setup Environment Variables

Create a `.env` file inside the **backend** directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Start the Development Servers

```bash
# Start Backend
cd backend
npm run dev

# Start Frontend
cd ../frontend
npm run dev
```

---

## 📡 API Endpoints

### **POST** `/api/report`

* Generate an accessibility report.

### **GET** `/api/report/:id`

* Fetch a specific report.

### **GET** `/api/reports`

* Fetch all reports.

### **DELETE** `/api/report/:id`

* Delete a specific report.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`feature/awesome-feature`)
3. Commit changes (`git commit -m 'Add awesome feature'`)
4. Push to your branch (`git push origin feature/awesome-feature`)
5. Create a Pull Request

---

## 📧 Contact

For any inquiries or issues, reach out:

**Author:** Danish
**Email:** [your-email@example.com](mailto:danish786.aps@gmail.com)
**GitHub:** [https://github.com/yourusername]([https://github.com/yourusername](https://github.com/Mddanish4338))
