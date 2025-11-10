# Task 3 - Responsive Web Form

A modern, fully responsive registration form built with Node.js, Express, and Bootstrap 5. Features advanced CSS animations, form validation, and a clean user interface.

## Features

- **Responsive Design**: Works perfectly on all devices (mobile, tablet, desktop)
- **Bootstrap 5 Framework**: Modern UI components and grid system
- **Custom CSS Animations**: Smooth fadeIn, pulse, slideIn, and bounce effects
- **Form Validation**: Both client-side and server-side validation
- **Data Persistence**: Submissions saved in JSON file
- **Interactive Navbar**: Hover animations with underline effects
- **Professional Footer**: Gradient background with fade animations

## Technologies Used

- **Backend**: Node.js, Express.js
- **Templating**: EJS (Embedded JavaScript)
- **Frontend**: HTML5, CSS3, JavaScript
- **CSS Framework**: Bootstrap 5.3
- **Animations**: Custom CSS keyframes

## Project Structure

```
task3-responsive/
├── app.js                 # Main server file
├── package.json           # Dependencies
├── submissions.json       # Stored form data
├── public/
│   └── styles.css        # Custom styling & animations
└── templates/
    ├── form.ejs          # Registration form
    ├── success.ejs       # Success confirmation
    └── submission.ejs    # View all submissions
```

## Installation

1. **Clone or download** this project

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the server**:
   ```bash
   node app.js
   ```

4. **Open browser** and visit:
   ```
   http://localhost:3000
   ```

## Form Fields & Validation

| Field | Type | Validation Rules |
|-------|------|------------------|
| Full Name | Text | Required, 3-50 characters |
| Email | Email | Required, valid email format |
| Password | Password | Required, minimum 6 characters |
| Confirm Password | Password | Must match password |
| Gender | Radio | Required (Male/Female/Other) |
| Hobbies | Checkbox | At least one required |
| City | Dropdown | Required selection |
| Terms | Checkbox | Must be accepted |

## Features Breakdown

### 1. Responsive Layout
- **Mobile First**: Optimized for small screens
- **Breakpoints**: Adapts to tablets and desktops
- **Max Widths**: Navbar (900px), Form (600px) for better readability

### 2. CSS Animations
- **fadeInUp**: Page elements slide up on load
- **pulse**: Buttons pulse on hover
- **slideIn**: Error messages slide from left
- **bounce**: Success icons bounce effect

### 3. Form Experience
- **Placeholders**: Helpful hints in each field
- **Focus States**: Visual feedback on input focus
- **Error Handling**: Clear validation messages
- **Success Page**: Confirmation with submitted data

### 4. Navigation
- **Smooth Transitions**: All links have hover effects
- **Underline Animation**: Grows from center on hover
- **Responsive Toggle**: Mobile hamburger menu
- **Consistent Styling**: Same look across all pages

## Pages

### 1. Home/Registration (`/`)
Main registration form with all fields and validation

### 2. Success (`/submit` - POST)
Shows submitted data with options to:
- View all submissions
- Submit another entry

### 3. All Submissions (`/submissions`)
Table view of all registered users with:
- Hover effects on rows
- Formatted dates
- Empty state message

## Custom Styling Highlights

- **Gradient Backgrounds**: Modern color schemes
- **Card Shadows**: Depth and elevation
- **Smooth Transitions**: 0.3s ease on all interactions
- **Form Controls**: Enhanced borders and focus states
- **Table Hover**: Interactive row highlighting

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

To run in development mode with auto-restart:

```bash
npm install -g nodemon
nodemon app.js
```

## Troubleshooting

**CSS not loading?**
- Check if `public` folder exists
- Verify `express.static` middleware in app.js

**Validation errors?**
- Ensure all required fields are filled
- Check password length (min 6 chars)
- Passwords must match

**Port already in use?**
- Change port in app.js: `const PORT = 3001;`
- Or kill process using port 3000

## Future Enhancements

- [ ] Add password strength indicator
- [ ] Email verification
- [ ] Database integration (MongoDB/PostgreSQL)
- [ ] User authentication & login
- [ ] Edit/Delete submissions
- [ ] Export data to CSV/Excel

## License

Free to use for learning and personal projects.

## Author

Created as part of Full Stack Development Internship - Task 3

---

**Need Help?** Check the validation rules above or review the form placeholders for guidance.
