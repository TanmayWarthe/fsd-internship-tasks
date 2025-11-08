const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));

// GET: show form 
app.get('/', (req, res) => {
  res.render('index', { title: 'Contact Form', errors: {}, values: {} });
});

// POST: handle form submit - server endpoint
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;
  const errors = {};

  if (!name || name.trim().length < 2) errors.name = 'Name must be at least 2 chars';
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.email = 'Enter a valid email';
  if (!message || message.trim().length < 5) errors.message = 'Message must be at least 5 chars';

  if (Object.keys(errors).length) {
    return res.status(400).render('index', {
      title: 'Contact Form',
      errors,
      values: { name, email, message }
    });
  }

  // success → ssr dynamic HTML
  res.render('result', {
    title: 'Submission Received',
    data: { name, email, message },
    submittedAt: new Date().toLocaleString()
  });
});

// 404 - Not Found
app.use((req, res) => res.status(404).send('Not Found'));

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
