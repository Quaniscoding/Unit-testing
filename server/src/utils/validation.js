// utils/validation.js
// test input data
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
  return password.length >= 6 && password.length <= 20;
}

module.exports = { isValidEmail, isValidPassword };
