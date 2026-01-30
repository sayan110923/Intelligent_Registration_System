// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
  console.log('Intelligent Registration System Loaded');
  
  // Add your event listeners and logic here
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});

function handleFormSubmit(event) {
  event.preventDefault();
  console.log('Form submitted');
  // Add form submission logic here
}

// Additional helper functions
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showMessage(message, type = 'info') {
  console.log(`[${type.toUpperCase()}] ${message}`);
}
