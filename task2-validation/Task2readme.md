<!-- Improved professional README for Task 2 -->
# 🛡️ Task 2: Advanced Form Validation (Node.js + Express + EJS)

An enhanced registration form demonstrating robust **server-side + client-side validation**, clean UI, persistent storage, and extensible architecture. This iteration includes new fields and improved styling.

## ✨ Current Features

- Modern responsive registration form
- Fields validated server-side:
    - **Full Name** – min 2 characters
    - **Email** – must match basic email pattern
    - **Password** – min 6 characters (not stored)
    - **Confirm Password** – must match password
    - **Gender** – required (male / female / other)
    - **Hobbies** – optional; stored as array
    - **City** – required (dropdown)
    - **Terms** – must be accepted
- Friendly error messages rendered inline
- Client-side guard (mirrors server validation)
- Persistent submissions in `submissions.json`
- Success page with submitted data (excluding password)
- Submissions listing page (`/submissions`)
- Accessible semantic markup (labels, fieldsets, legends)
- Expanded CSS: variables, dark mode, animations

## 🧪 Validation Rules (Server)

| Field | Rule | Notes |
|-------|------|-------|
| Full Name | Required, length >= 2 | Trimmed before check |
| Email | Required, pattern match | Basic regex used |
| Password | Required, length >= 6 | Not stored for security |
| Confirm Password | Required, matches password | Case-sensitive match |
| Gender | Required | One of predefined values |
| City | Required, not blank | Dropdown selection |
| Terms | Must be checked | Boolean flag |
| Hobbies | Optional | Normalized to array |

## 📂 Project Structure

```
task2-validation/
├── app.js                 # Express app + validation logic
├── submissions.json       # Persistent store of valid submissions
├── templates/             # EJS views
│   ├── form.ejs           # Registration form
│   ├── success.ejs        # Success page after submission
│   └── submissions.ejs    # List of all submissions
├── public/
│   └── styles.css         # Modernized styling (variables, dark mode)
├── package.json           # Dependencies and scripts
└── Task2readme.md         # This README
```

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 14 recommended)
- npm (bundled with Node)

### Install
```bash
cd task2-validation
npm install
```

### Run (Development)
```bash
node app.js
```
Visit: http://localhost:3000

> Tip: Add a dev script with nodemon if desired: `npm install --save-dev nodemon` then `nodemon app.js`.

## 🔐 Security Considerations
- Passwords are validated but not stored — good for demo safety.
- For production, hash passwords with `bcrypt` and store in a database (PostgreSQL, MongoDB, etc.).
- Add CSRF protection (e.g. `csurf`) if you expand functionality.
- Implement rate limiting for `/submit` (e.g. `express-rate-limit`).

## 🔧 Extensibility Ideas

- Add phone number & pattern validation
- Multi-select hobbies UI (tag-style chips)
- Server-side pagination for submissions
- CSV export of submissions
- Integrate database (switch from JSON file)
- Internationalization (i18n) support

## 🐞 Troubleshooting

| Issue | Possible Fix |
|-------|--------------|
| Server not starting | Check Node version (`node -v`) |
| Styles not loading | Ensure `/public` is served with `express.static` |
| Form always invalid | Inspect `app.js` regex & field names alignment |
| Old submissions missing new fields | They predate schema change; migrate or ignore |

## 📜 License
ISC (default). Replace with MIT/GPL/etc. if needed.

## 🙋 Author / Attribution
Full Stack Development Internship – Task 2.

---
Built with ❤️ using **Node.js**, **Express**, and **EJS**.

Need improvements next? Ask for password hashing, DB integration, or deployment guidance. 🚀
