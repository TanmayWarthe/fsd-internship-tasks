// Import required modules
const express = require('express');
const path = require('path');
const fs = require('fs');

// Setup constants
const app = express();
const PORT = 3000;
const SUBMIT_FILE = path.join(__dirname, 'submissions.json');

// In-memory storage for valid submissions
let submissions = [];

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Views are located in the 'templates' folder
app.set('views', path.join(__dirname, 'templates'));

// Middleware to parse incoming form data (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));



// GET / → Render the registration form
app.get('/', (req, res) => {
  res.render('form', {
    title: 'Registration Form',
    values: {},   
    errors: {}    
  });
});

// POST /submit → Process form submission
app.post('/submit', (req, res) => {
  const { fullname, email, password, confirmPassword, gender, hobbies, city, terms } = req.body;

  const errors = {};
  // normalize hobbies to array
  const hobbiesArr = hobbies ? (Array.isArray(hobbies) ? hobbies : [hobbies]) : [];

  const values = { fullname, email, gender, hobbies: hobbiesArr, city, terms };

  // Server-side validation
  if (!fullname || fullname.trim().length < 2) errors.fullname = 'Full name must be at least 2 characters';

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = 'Enter a valid email address';

  if (!password || password.length < 6) errors.password = 'Password must be at least 6 characters';

  if (!confirmPassword) errors.confirmPassword = 'Please confirm your password';
  else if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match';

  if (!gender) errors.gender = 'Please select a gender';

  if (!city || city === '') errors.city = 'Please select a city';

  if (!terms) errors.terms = 'You must agree to the terms';

  // If validation fails, re-render form with error messages and input values
  if (Object.keys(errors).length > 0) {
    return res.status(400).render('form', {
      title: 'Registration Form',
      values,
      errors
    });
  }

  // If validation passes, store submission (do NOT store plain passwords)
  const submission = {
    fullname,
    email,
    gender,
    hobbies: hobbiesArr,
    city,
    agreed: !!terms,
    submittedAt: new Date().toISOString()
  };

  submissions.push(submission);

  // Save updated submissions to a JSON file
  fs.writeFileSync(SUBMIT_FILE, JSON.stringify(submissions, null, 2));

  // Show success page
  res.render('success', {
    title: 'Submission Successful',
    data: submission
  });
});

// GET /submissions → Display all submissions
app.get('/submissions', (req, res) => {
  if (fs.existsSync(SUBMIT_FILE)) {
    const fileData = fs.readFileSync(SUBMIT_FILE);
    submissions = JSON.parse(fileData);
  }

  res.render('submissions', {
    title: 'All Submissions',
    submissions
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
