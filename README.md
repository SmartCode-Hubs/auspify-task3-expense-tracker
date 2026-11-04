# Auspify Task 3 - Expense Tracker

A secure, full-stack financial tracking application built for the Auspify Technologies Full Stack Internship. 

## 🚀 Features
- **Secure Authentication:** User registration and login using JWT (JSON Web Tokens).
- **Dashboard Overview:** Real-time calculation of Total Balance, Total Income, and Total Expenses.
- **Data Visualization:** Dynamic Pie Charts for expense breakdown and Bar Charts for cash flow analysis using `Recharts`.
- **Transaction Management:** Add, view, and delete income and expense records.
- **Naira Support:** All financial data is formatted in Nigerian Naira (₦).
- **Settings Page:** Users can update their profile information, change their password, and toggle notification preferences.

## 🛠️ Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS, Framer Motion, Recharts, React Router
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Security:** JSON Web Tokens (JWT), bcryptjs

## 💻 How to Run Locally

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/SmartCode-Hubs/auspify-task3-expense-tracker.git
   \`\`\`

2. **Setup the Backend:**
   \`\`\`bash
   cd backend
   npm install
   # Create a .env file and add:
   # PORT=5000
   # MONGO_URI=your_mongodb_connection_string
   # JWT_SECRET=your_secret_key
   npm run dev
   \`\`\`

3. **Setup the Frontend:**
   \`\`\`bash
   cd ../frontend
   npm install
   npm run dev
   \`\`\`
