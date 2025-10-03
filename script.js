/* =========================
   NAVBAR ACTIVE LINK
========================= */
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".nav-links a");
  const current = window.location.pathname.split("/").pop();

  links.forEach(link => {
    if (link.getAttribute("href") === current) {
      link.classList.add("active");
    }
  });
});

/* =========================
   CONTACT FORM
========================= */
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you! Your message has been received. We'll get back to you soon.");
    contactForm.reset();
  });
}

/* =========================
   SIGNUP FORM
========================= */
const signupForm = document.querySelector(".signup-form");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = signupForm.querySelector("input[placeholder='Full Name']").value;
    const email = signupForm.querySelector("input[type='email']").value;
    const password = signupForm.querySelectorAll("input[type='password']")[0].value;
    const confirmPassword = signupForm.querySelectorAll("input[type='password']")[1].value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Save user to localStorage
    localStorage.setItem("giltechUser", JSON.stringify({ name, email, password }));

    alert("Registration successful! You can now log in.");
    window.location.href = "login.html";
  });
}

/* =========================
   LOGIN FORM
========================= */
const loginForm = document.querySelector(".login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm.querySelector("input[type='email']").value;
    const password = loginForm.querySelector("input[type='password']").value;

    const storedUser = JSON.parse(localStorage.getItem("giltechUser"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("giltechLoggedIn", "true");
      alert("Login successful! Welcome " + storedUser.name);
      window.location.href = "elearning.html";
    } else {
      alert("Invalid email or password.");
    }
  });
}

/* =========================
   LOGOUT FUNCTION
========================= */
const logoutBtn = document.querySelector("#logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("giltechLoggedIn");
    alert("You have been logged out.");
    window.location.href = "login.html";
  });
}

/* =========================
   TESTIMONIALS ANIMATION
========================= */
const testimonials = document.querySelectorAll(".testimonial");
if (testimonials.length > 0) {
  testimonials.forEach((t, i) => {
    t.style.opacity = "0";
    t.style.transform = "translateY(30px)";
    setTimeout(() => {
      t.style.transition = "all 0.8s ease";
      t.style.opacity = "1";
      t.style.transform = "translateY(0)";
    }, i * 300);
  });
}

/* =========================
   E-LEARNING SYSTEM
========================= */
const courses = [
  { id: 1, title: "Web Development Basics", completed: false },
  { id: 2, title: "Introduction to Python", completed: false },
  { id: 3, title: "Data Analysis with Excel", completed: false },
];

function renderCourses() {
  const courseList = document.getElementById("courseList");
  if (!courseList) return;

  courseList.innerHTML = "";

  courses.forEach(course => {
    const li = document.createElement("li");
    li.textContent = course.title;

    const btn = document.createElement("button");
    btn.textContent = course.completed ? "Uncomplete" : "Mark as Completed";
    btn.className = course.completed ? "completed" : "";
    btn.addEventListener("click", () => toggleCourse(course.id));

    li.appendChild(btn);
    courseList.appendChild(li);
  });

  checkCertificate();
}

function toggleCourse(id) {
  const course = courses.find(c => c.id === id);
  if (course) {
    course.completed = !course.completed;
    renderCourses();
  }
}

function checkCertificate() {
  const certSection = document.getElementById("certificateSection");
  const allCompleted = courses.every(c => c.completed);

  if (certSection) {
    if (allCompleted) {
      const user = JSON.parse(localStorage.getItem("giltechUser"));
      certSection.innerHTML = `
        <h3>🎉 Congratulations!</h3>
        <p>${user ? user.name : "Student"}, you have completed all courses.</p>
        <button onclick="generateCertificate()">Download Certificate</button>
      `;
    } else {
      certSection.innerHTML = "";
    }
  }
}

function generateCertificate() {
  const user = JSON.parse(localStorage.getItem("giltechUser"));
  const username = user ? user.name : "Student";

  const certWindow = window.open("", "_blank");
  certWindow.document.write(`
    <html>
      <head>
        <title>Certificate</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .certificate { border: 5px solid #4a90e2; padding: 30px; }
          h1 { color: #4a90e2; }
        </style>
      </head>
      <body>
        <div class="certificate">
          <h1>Certificate of Completion</h1>
          <p>This certifies that</p>
          <h2>${username}</h2>
          <p>has successfully completed all courses in the Giltech E-learning System.</p>
          <p><em>Giltech Online Cyber</em></p>
        </div>
      </body>
    </html>
  `);
  certWindow.document.close();
}

/* Initialize courses if on E-learning page */
if (document.getElementById("courseList")) {
  renderCourses();
}
