function toggleForms() {
    document.getElementById("signup-form").classList.toggle("hidden");
    document.getElementById("login-form").classList.toggle("hidden");
}

// Password Validation: Must include uppercase, lowercase, number & special character
function isValidPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}

// Contact Number Validation: Simple check for numbers (Modify for specific country)
function isValidPhone(phone) {
    return /^[0-9]{10}$/.test(phone);
}

// Email Validation: Ensure correct format
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Register User
function registerUser() {
    let name = document.getElementById("signup-name").value.trim();
    let email = document.getElementById("signup-email").value.trim();
    let phone = document.getElementById("signup-phone").value.trim();
    let password = document.getElementById("signup-password").value.trim();

    if (!name || !email || !phone || !password) {
        alert("All fields are required!");
        return;
    }

    if (!isValidEmail(email)) {
        alert("Invalid email format!");
        return;
    }

    if (!isValidPhone(phone)) {
        alert("Phone number must be 10 digits!");
        return;
    }

    if (!isValidPassword(password)) {
        alert("Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check for duplicate email
    if (users.some(user => user.email === email)) {
        alert("Email already registered!");
        return;
    }

    users.push({ name, email, phone, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful! Please login.");
    toggleForms();
}

// Login User
function loginUser() {
    let email = document.getElementById("login-email").value.trim();
    let password = document.getElementById("login-password").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert("Invalid email or password!");
        return;
    }

    // Store the logged-in user's email in localStorage
    localStorage.setItem("currentUser", email);
    
    alert("Login successful! Redirecting...");
    window.location.href = "dashboard.html"; // Redirect after login
}
