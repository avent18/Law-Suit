// Toggle between login and register forms
function toggleForm(formType) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginBtn = document.getElementById('login-btn');
    const registerBtn = document.getElementById('register-btn');

    if (formType === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginBtn.classList.add('active');
        registerBtn.classList.remove('active');
    } else if (formType === 'register') {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
        registerBtn.classList.add('active');
        loginBtn.classList.remove('active');
    }
}

// Handle registration form submission
document.getElementById('register-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const username = this.querySelector('input[placeholder="Username"]').value;
    const email = this.querySelector('input[placeholder="Email"]').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const role = document.getElementById('role').value;
    const passwordError = document.getElementById('password-error');

    if (password !== confirmPassword) {
        passwordError.style.display = 'block';
        return;
    } else {
        passwordError.style.display = 'none';
    }

    try {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, role })
        });

        if (res.ok) {
            alert("Registration successful! Please login.");
            toggleForm('login');
        } else {
            const text = await res.text();
            alert(text);
        }
    } catch (error) {
        alert('Error connecting to server.');
        console.error(error);
    }
});

   

// Handle login form submission
document.getElementById('login-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const email = this.querySelector('input[placeholder="Email"]').value;
    const password = this.querySelector('input[placeholder="Password"]').value;

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
            // ✅ Store login session
            localStorage.setItem("userEmail", data.email);
            localStorage.setItem("userRole", data.role);

            // ✅ Redirect to chat page
            window.location.href = 'send-message.html';
        } else {
            alert(data.message || "Login failed");
        }
    } catch (error) {
        alert('Error connecting to server.');
        console.error(error);
    }
});


  // Simulated login check (replace with real logic)
  function openChat() {
    window.location.href = 'chat.html';
}
