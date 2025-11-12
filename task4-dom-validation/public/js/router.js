// router.js - Simulated client-side routing using fetch and history API

// Navigate function for client-side routing
function navigate(event, path) {
  event.preventDefault();
  
  // Update browser history
  history.pushState(null, '', path);
  
  // Load the new content
  loadPage(path);
}

// Load page content without full reload
async function loadPage(path) {
  const appContainer = document.getElementById('app');
  
  if (!appContainer) {
    // If no app container, do a full page load
    window.location.href = path;
    return;
  }
  
  // Add fade-out effect
  appContainer.classList.add('fade-out');
  
  try {
    // Fetch the page content
    const response = await fetch(path);
    
    if (!response.ok) {
      throw new Error('Failed to load page');
    }
    
    const html = await response.text();
    
    // Parse the HTML to extract the app content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const newAppContent = doc.getElementById('app');
    
    if (newAppContent) {
      // Wait for fade-out animation
      setTimeout(() => {
        // Replace content
        appContainer.innerHTML = newAppContent.innerHTML;
        
        // Fade in
        appContainer.classList.remove('fade-out');
        appContainer.classList.add('fade-in');
        
        // Reinitialize validation scripts if on form page
        if (path === '/') {
          reinitializeValidation();
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update active nav link
        updateActiveNavLink(path);
        
        // Remove fade-in class after animation
        setTimeout(() => {
          appContainer.classList.remove('fade-in');
        }, 300);
      }, 300);
    } else {
      // Fallback: full page reload
      window.location.href = path;
    }
  } catch (error) {
    console.error('Error loading page:', error);
    // Fallback: full page reload on error
    window.location.href = path;
  }
}

// Update active nav link styling
function updateActiveNavLink(path) {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path) {
      link.style.fontWeight = 'bold';
      link.style.color = '#fff';
    } else {
      link.style.fontWeight = '500';
      link.style.color = 'rgba(255, 255, 255, 0.85)';
    }
  });
}

// Reinitialize validation for dynamically loaded form
function reinitializeValidation() {
  const form = document.getElementById('registrationForm');
  
  if (!form) return;
  
  // Get form elements
  const fullnameInput = document.getElementById('fullname');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  
  // Password validation criteria
  const passwordCriteria = {
    length: { regex: /.{8,}/, hint: 'hint-length' },
    uppercase: { regex: /[A-Z]/, hint: 'hint-uppercase' },
    number: { regex: /[0-9]/, hint: 'hint-number' },
    special: { regex: /[!@#$%^&*(),.?":{}|<>]/, hint: 'hint-special' }
  };
  
  // Validation functions
  function validateFullname() {
    const value = fullnameInput.value.trim();
    const feedback = document.getElementById('fullname-feedback');
    
    if (value.length === 0) {
      fullnameInput.classList.remove('valid', 'invalid');
      feedback.textContent = '';
      feedback.className = 'validation-feedback';
      return false;
    }
    
    if (value.length < 2) {
      fullnameInput.classList.remove('valid');
      fullnameInput.classList.add('invalid');
      feedback.textContent = 'Name must be at least 2 characters';
      feedback.className = 'validation-feedback invalid';
      return false;
    }
    
    fullnameInput.classList.remove('invalid');
    fullnameInput.classList.add('valid');
    feedback.textContent = 'Looks good!';
    feedback.className = 'validation-feedback valid';
    return true;
  }
  
  function validateEmail() {
    const value = emailInput.value.trim();
    const feedback = document.getElementById('email-feedback');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value.length === 0) {
      emailInput.classList.remove('valid', 'invalid');
      feedback.textContent = '';
      feedback.className = 'validation-feedback';
      return false;
    }
    
    if (!emailRegex.test(value)) {
      emailInput.classList.remove('valid');
      emailInput.classList.add('invalid');
      feedback.textContent = 'Please enter a valid email address';
      feedback.className = 'validation-feedback invalid';
      return false;
    }
    
    emailInput.classList.remove('invalid');
    emailInput.classList.add('valid');
    feedback.textContent = 'Email is valid!';
    feedback.className = 'validation-feedback valid';
    return true;
  }
  
  function validatePassword() {
    const value = passwordInput.value;
    let allValid = true;
    
    for (const [key, criterion] of Object.entries(passwordCriteria)) {
      const hintElement = document.getElementById(criterion.hint);
      
      if (criterion.regex.test(value)) {
        hintElement.classList.remove('invalid');
        hintElement.classList.add('valid');
      } else {
        hintElement.classList.remove('valid');
        hintElement.classList.add('invalid');
        allValid = false;
      }
    }
    
    if (value.length === 0) {
      passwordInput.classList.remove('valid', 'invalid');
      Object.values(passwordCriteria).forEach(criterion => {
        const hintElement = document.getElementById(criterion.hint);
        hintElement.classList.remove('valid', 'invalid');
      });
      return false;
    }
    
    if (allValid) {
      passwordInput.classList.remove('invalid');
      passwordInput.classList.add('valid');
      return true;
    } else {
      passwordInput.classList.remove('valid');
      passwordInput.classList.add('invalid');
      return false;
    }
  }
  
  function validateConfirmPassword() {
    const value = confirmPasswordInput.value;
    const passwordValue = passwordInput.value;
    const feedback = document.getElementById('confirmPassword-feedback');
    
    if (value.length === 0) {
      confirmPasswordInput.classList.remove('valid', 'invalid');
      feedback.textContent = '';
      feedback.className = 'validation-feedback';
      return false;
    }
    
    if (value !== passwordValue) {
      confirmPasswordInput.classList.remove('valid');
      confirmPasswordInput.classList.add('invalid');
      feedback.textContent = 'Passwords do not match';
      feedback.className = 'validation-feedback invalid';
      return false;
    }
    
    confirmPasswordInput.classList.remove('invalid');
    confirmPasswordInput.classList.add('valid');
    feedback.textContent = 'Passwords match!';
    feedback.className = 'validation-feedback valid';
    return true;
  }
  
  // Attach event listeners
  if (fullnameInput) {
    fullnameInput.addEventListener('input', validateFullname);
    fullnameInput.addEventListener('blur', validateFullname);
  }
  
  if (emailInput) {
    emailInput.addEventListener('input', validateEmail);
    emailInput.addEventListener('blur', validateEmail);
  }
  
  if (passwordInput) {
    passwordInput.addEventListener('input', validatePassword);
    passwordInput.addEventListener('blur', function() {
      validatePassword();
      if (confirmPasswordInput.value) {
        validateConfirmPassword();
      }
    });
  }
  
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
  }
  
  // Form submission validation
  form.addEventListener('submit', function(e) {
    const isFullnameValid = validateFullname();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    
    if (!isFullnameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      e.preventDefault();
      
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalid.focus();
      }
      
      return false;
    }
    
    return true;
  });
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
  loadPage(window.location.pathname);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  updateActiveNavLink(window.location.pathname);
});
