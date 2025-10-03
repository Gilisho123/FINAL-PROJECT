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
   ABOUT US - VIEW MORE
========================= */
const viewMoreBtn = document.getElementById("viewMoreBtn");
if (viewMoreBtn) {
  viewMoreBtn.addEventListener("click", () => {
    const paragraphs = document.querySelectorAll(".about-content p");
    paragraphs.forEach(p => (p.style.display = "block"));
    viewMoreBtn.style.display = "none";
  });
}

/* =========================
   SIGNUP + LOGIN (TABS)
========================= */
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

if (tabBtns.length > 0) {
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      tabContents.forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
    });
  });
}

/* SIGNUP */
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    localStorage.setItem("giltechUser", JSON.stringify({ name, email, password }));

    alert("Registration successful! Please log in.");
    document.querySelector("[data-tab='login']").click();
  });
}

/* LOGIN */
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const user = JSON.parse(localStorage.getItem("giltechUser"));

    if (user && user.email === email && user.password === password) {
      localStorage.setItem("giltechLoggedIn", "true");
      localStorage.setItem("giltechLoggedInUser", user.name);
      alert("Login successful! Welcome " + user.name);
      window.location.href = "elearning.html";
    } else {
      alert("Invalid credentials!");
    }
  });
}

/* LOGOUT */
const logoutBtn = document.querySelector("#logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("giltechLoggedIn");
    localStorage.removeItem("giltechLoggedInUser");
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
    li.className = "course";
    if (course.completed) li.classList.add("completed");
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

/* Stylish Certificate */
function checkCertificate() {
  const certSection = document.getElementById("certificate");
  const allCompleted = courses.every(c => c.completed);

  if (certSection) {
    if (allCompleted) {
      const userName = localStorage.getItem("giltechLoggedInUser") || "Student";
      certSection.style.display = "block";
      document.getElementById("studentName").innerText = userName;
      document.getElementById("issueDate").innerText = new Date().toLocaleDateString();
      document.getElementById("print-btn").style.display = "inline-block";
    } else {
      certSection.style.display = "none";
    }
  }
}

/* Initialize courses if on E-learning page */
if (document.getElementB
