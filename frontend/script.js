const API_URL = "http://localhost:5000/api/auth";


// REGISTER
async function register() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  const data = await response.json();

  alert(data.message);

  if (response.ok) {
    window.location.href = "login.html";
  }
}


// LOGIN
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (response.ok) {
    localStorage.setItem("token", data.token);

    window.location.href = "dashboard.html";
  } else {
    alert(data.message);
  }
}


// GET PROFILE
async function getProfile() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  const response = await fetch(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (response.ok) {
    document.getElementById("profile").innerHTML =
      `Login as: ${data.user.email}`;
  } else {
    localStorage.removeItem("token");

    window.location.href = "login.html";
  }
}


// LOGOUT
function logout() {
  localStorage.removeItem("token");

  window.location.href = "login.html";
}


if (window.location.pathname.includes("dashboard.html")) {
  getProfile();
}