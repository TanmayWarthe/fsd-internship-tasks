const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;
const SUBMIT_FILE = path.join(__dirname, 'submissions.json');

let submissions = [];

// setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Added for API routes
app.use(express.static(path.join(__dirname, 'public')));

// Load submissions from file on startup
if (fs.existsSync(SUBMIT_FILE)) {
  try {
    const data = fs.readFileSync(SUBMIT_FILE);
    submissions = JSON.parse(data);
  } catch (err) {
    console.error('Error loading submissions:', err);
    submissions = [];
  }
}

// home page - show form
app.get('/', (req, res) => {
  res.render('form', {
    title: 'Registration Form',
    values: {},   
    errors: {}    
  });
});

// handle form submission
app.post('/submit', (req, res) => {
  const { fullname, email, password, confirmPassword, gender, hobbies, city, terms } = req.body;

  const errors = {};
  const hobbiesArr = hobbies ? (Array.isArray(hobbies) ? hobbies : [hobbies]) : [];
  const values = { fullname, email, gender, hobbies: hobbiesArr, city, terms };

  // validate fields
  if (!fullname || fullname.trim().length < 2) 
    errors.fullname = 'Full name must be at least 2 characters';

  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) 
    errors.email = 'Enter a valid email address';

  // Enhanced password validation (server-side backup)
  if (!password) {
    errors.password = 'Password is required';
  } else {
    if (password.length < 8) 
      errors.password = 'Password must be at least 8 characters';
    else if (!/[A-Z]/.test(password))
      errors.password = 'Password must contain at least 1 uppercase letter';
    else if (!/[0-9]/.test(password))
      errors.password = 'Password must contain at least 1 number';
    else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password))
      errors.password = 'Password must contain at least 1 special character';
  }

  if (!confirmPassword) 
    errors.confirmPassword = 'Please confirm your password';
  else if (password !== confirmPassword) 
    errors.confirmPassword = 'Passwords do not match';

  if (!gender) 
    errors.gender = 'Please select a gender';

  if (!city || city === '') 
    errors.city = 'Please select a city';

  if (!terms) 
    errors.terms = 'You must agree to the terms';

  // if errors exist, show form again
  if (Object.keys(errors).length > 0) {
    return res.status(400).render('form', {
      title: 'Registration Form',
      values,
      errors
    });
  }

  // save submission data
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
  fs.writeFileSync(SUBMIT_FILE, JSON.stringify(submissions, null, 2));

  res.render('success', {
    title: 'Submission Successful',
    data: submission
  });
});

// view all submissions
app.get('/submissions', (req, res) => {
  if (fs.existsSync(SUBMIT_FILE)) {
    try {
      const data = fs.readFileSync(SUBMIT_FILE);
      submissions = JSON.parse(data);
    } catch (err) {
      console.error('Error reading submissions:', err);
    }
  }

  res.render('submission', {
    title: 'All Submissions',
    submissions
  });
});

// API endpoint for client-side routing (returns JSON)
app.get('/api/submissions', (req, res) => {
  if (fs.existsSync(SUBMIT_FILE)) {
    try {
      const data = fs.readFileSync(SUBMIT_FILE);
      submissions = JSON.parse(data);
    } catch (err) {
      console.error('Error reading submissions:', err);
    }
  }

  res.json({ submissions });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
