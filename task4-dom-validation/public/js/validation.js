// validation.js - Complex client-side validation with real-time feedback

// Password visibility toggle function
function togglePasswordVisibility(inputId, button) {
  const input = document.getElementById(inputId);
  const eyeOpen = button.querySelector('.eye-open');
  const eyeClosed = button.querySelector('.eye-closed');
  
  if (input.type === 'password') {
    input.type = 'text';
    eyeOpen.style.display = 'none';
    eyeClosed.style.display = 'block';
  } else {
    input.type = 'password';
    eyeOpen.style.display = 'block';
    eyeClosed.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('registrationForm');
  
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
  
  // Real-time validation for Full Name
  if (fullnameInput) {
    fullnameInput.addEventListener('input', function() {
      validateFullname();
    });
    
    fullnameInput.addEventListener('blur', function() {
      validateFullname();
    });
  }
  
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
  
  // Real-time validation for Email
  if (emailInput) {
    emailInput.addEventListener('input', function() {
      validateEmail();
    });
    
    emailInput.addEventListener('blur', function() {
      validateEmail();
    });
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
  
  // Real-time validation for Password (complex criteria)
  if (passwordInput) {
    passwordInput.addEventListener('input', function() {
      validatePassword();
    });
    
    passwordInput.addEventListener('blur', function() {
      validatePassword();
      if (confirmPasswordInput.value) {
        validateConfirmPassword();
      }
    });
  }
  
  function validatePassword() {
    const value = passwordInput.value;
    let allValid = true;
    
    // Check each criterion
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
    
    // Update input styling
    if (value.length === 0) {
      passwordInput.classList.remove('valid', 'invalid');
      // Reset all hints
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
  
  // Real-time validation for Confirm Password
  if (confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', function() {
      validateConfirmPassword();
    });
    
    confirmPasswordInput.addEventListener('blur', function() {
      validateConfirmPassword();
    });
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
  
  // Form submission validation
  if (form) {
    form.addEventListener('submit', function(e) {
      // Validate all fields before submission
      const isFullnameValid = validateFullname();
      const isEmailValid = validateEmail();
      const isPasswordValid = validatePassword();
      const isConfirmPasswordValid = validateConfirmPassword();
      
      // If client-side validation fails, prevent submission
      if (!isFullnameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
        e.preventDefault();
        
        // Scroll to first invalid field
        const firstInvalid = form.querySelector('.invalid');
        if (firstInvalid) {
          firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstInvalid.focus();
        }
        
        return false;
      }
      
      // If all validations pass, allow form submission
      return true;
    });
  }
});
