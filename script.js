// Dark/Light Mode Toggle
const themeToggle = document.getElementById("themeToggle");
if(themeToggle){
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode")
      ? "☀️ Light Mode"
      : "🌙 Dark Mode";
  });
}

// Cyber Service Counter (if present)
let customerCount = parseInt(localStorage.getItem("customerCount")) || 0;
const serveBtn = document.getElementById("serveBtn");
const customerCountDisplay = document.getElementById("customerCount");
const counterMessage = document.getElementById("counterMessage");

if(serveBtn){
  function updateCounterUI() {
    customerCountDisplay.textContent = customerCount;

    if (customerCount === 0) counterMessage.textContent = "No customers served yet.";
    else if (customerCount === 1) counterMessage.textContent = "You just served your first customer! 🚀";
    else if (customerCount < 5) counterMessage.textContent = `Great! ${customerCount} customers served.`;
    else if (customerCount < 10) counterMessage.textContent = `🔥 ${customerCount} happy customers served.`;
    else counterMessage.textContent = `🏆 ${customerCount} customers served at Giltech Online Cyber.`;
  }

  updateCounterUI();

  serveBtn.addEventListener("click", () => {
    customerCount++;
    localStorage.setItem("customerCount", customerCount);
    updateCounterUI();
  });
}

// FAQ Toggle
const faqItems = document.querySelectorAll(".faq-item h4");
faqItems.forEach(q => {
  q.style.cursor = "pointer";
  q.addEventListener("click", () => {
    const ans = q.nextElementSibling;
    ans.classList.toggle("active");
    if(ans.classList.contains("active")) ans.style.maxHeight = ans.scrollHeight + "px";
    else ans.style.maxHeight = null;
  });
});

// Signup Validation
const signupForm = document.getElementById("signupForm");
if(signupForm){
  signupForm.addEventListener("submit", function(e){
    e.preventDefault();
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    let valid = true;
    document.getElementById("nameError").textContent="";
    document.getElementById("emailError").textContent="";
    document.getElementById("passwordError").textContent="";
    document.getElementById("confirmPasswordError").textContent="";
    document.getElementById("formSuccess").textContent="";

    if(name.value.trim()===""){document.getElementById("nameError").textContent="Full name required."; valid=false;}
    if(email.value.trim()==="" || !/^\S+@\S+\.\S+$/.test(email.value)){document.getElementById("emailError").textContent="Valid email required."; valid=false;}
    if(password.value.length<6){document.getElementById("passwordError").textContent="Password at least 6 chars."; valid=false;}
    if(password.value!==confirmPassword.value){document.getElementById("confirmPasswordError").textContent="Passwords do not match."; valid=false;}
    if(valid){document.getElementById("formSuccess").textContent="🎉 Account created successfully!"; signupForm.reset();}
  });
}

// Contact Validation
const contactForm = document.getElementById("contactForm");
if(contactForm){
  contactForm.addEventListener("submit", function(e){
    e.preventDefault();
    let valid = true;
    const name = document.getElementById("contactName");
    const email = document.getElementById("contactEmail");
    const message = document.getElementById("contactMessage");
    const nameErr = document.getElementById("contactNameError");
    const emailErr = document.getElementById("contactEmailError");
    const messageErr = document.getElementById("contactMessageError");
    const success = document.getElementById("contactSuccess");

    nameErr.textContent=""; emailErr.textContent=""; messageErr.textContent=""; success.textContent="";

    if(name.value.trim()===""){nameErr.textContent="Name required."; valid=false;}
    if(!/^\S+@\S+\.\S+$/.test(email.value)){emailErr.textContent="Valid email required."; valid=false;}
    if(message.value.trim().length<10){messageErr.textContent="Message at least 10 characters."; valid=false;}

    if(valid){success.textContent="✅ Message sent successfully!"; contactForm.reset();}
  });
}
