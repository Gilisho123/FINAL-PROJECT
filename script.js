// Giltech Online Cyber – Full Frontend JS
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const modal = document.getElementById('modal');
  const modalClose = document.getElementById('modalClose');
  const requestBtn = document.getElementById('requestBtn');
  const heroRequest = document.getElementById('heroRequest');
  const requestServiceButtons = document.querySelectorAll('.request-service');
  const mserviceInput = document.getElementById('mserviceInput');
  const modalForm = document.getElementById('modalForm');
  const requestForm = document.getElementById('requestForm');
  const modalMessage = document.getElementById('modalMessage');

  // ===== Menu Toggle =====
  hamburger.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });

  // ===== Modal Functions =====
  function openModal(service = '') {
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    mserviceInput.value = service;
    modalForm.style.display = 'block';
    if (modalMessage) modalMessage.style.display = 'none';
  }

  function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    if (modalMessage) modalMessage.style.display = 'none';
  }

  // ===== Modal Button Actions =====
  if (requestBtn) requestBtn.addEventListener('click', () => openModal(''));
  if (heroRequest) heroRequest.addEventListener('click', () => openModal('General Quote'));
  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  requestServiceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const svc = btn.dataset.service || '';
      openModal(svc);
    });
  });

  // ===== Modal Form Submission =====
  if (modalForm) {
    modalForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(modalForm);

      try {
        const res = await fetch("http://localhost:5000/api/requests", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        if (data.success) {
          console.log("✅ Modal request saved:", data);
          modalForm.reset();
          modalForm.style.display = 'none';
          if (modalMessage) {
            modalMessage.innerText = "✅ Request submitted successfully!";
            modalMessage.style.display = 'block';
            modalMessage.style.color = 'green';
          }
        } else {
          alert("❌ Failed to submit request. Please try again.");
        }
      } catch (error) {
        console.error("⚠️ Error submitting request:", error);
        alert("⚠️ Could not connect to the server. Please try again later.");
      }
    });
  }

  // ===== Main Page Request Form Submission =====
  if (requestForm) {
    requestForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(requestForm);

      try {
        const res = await fetch("http://localhost:5000/api/requests", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();

        if (data.success) {
          console.log("✅ Request form saved:", data);
          alert("✅ Thank you! Your request has been received.");
          requestForm.reset();
        } else {
          alert("❌ Submission failed. Please try again.");
        }
      } catch (error) {
        console.error("⚠️ Connection error:", error);
        alert("⚠️ Could not reach the server. Please ensure the backend is running.");
      }
    });
  }
});
