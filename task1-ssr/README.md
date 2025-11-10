# Task 1 - Server-Side Rendering Contact Form

A simple contact form built with Node.js, Express, and EJS that demonstrates server-side rendering with form validation.

## Features

- Server-side rendering using EJS templates
- Contact form with Name, Email, and Message fields
- Server-side validation with error messages
- Success page displaying submitted data
- Custom CSS styling

## Technologies Used

- Node.js
- Express.js (v5.1.0)
- EJS (v3.1.10)
- HTML5 & CSS3

## Project Structure

```
task1-ssr/
├── app.js              # Express server and routes
├── package.json        # Dependencies
├── public/
│   └── style.css      # Custom styles
└── views/
    ├── index.ejs      # Contact form
    └── result.ejs     # Success page
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the server:
   ```bash
   npm start
   ```
   
   Or for development mode:
   ```bash
   npm run dev
   ```

3. Open browser at:
   ```
   http://localhost:3000
   ```

## Validation Rules

| Field | Validation |
|-------|-----------|
| Name | Minimum 2 characters |
| Email | Valid email format |
| Message | Minimum 5 characters |

## How It Works

1. **GET `/`** - Displays the contact form
2. **POST `/submit`** - Validates and processes form data
   - If errors: Re-renders form with error messages
   - If valid: Shows success page with submitted data

## Pages

**Contact Form (`/`)**
- Form with Name, Email, and Message fields
- Shows validation errors if any
- Preserves user input on validation failure

**Success Page (`/submit`)**
- Displays submitted information
- Shows submission timestamp
- Link to go back to form

## Scripts

- `npm start` - Run server with Node
- `npm run dev` - Run server with Nodemon (auto-restart)

## License

ISC

## Author

Full Stack Development Internship - Task 1
