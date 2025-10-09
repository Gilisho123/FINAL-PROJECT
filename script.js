// basic interactivity: menu toggle, modal open/close, fake submit
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

  hamburger.addEventListener('click', () => {
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });

  function openModal(service = '') {
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden','false');
    mserviceInput.value = service;
  }
  function closeModal() {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden','true');
    document.getElementById('modalMessage').style.display = 'none';
  }

  requestBtn.addEventListener('click', () => openModal(''));
  heroRequest.addEventListener('click', () => openModal('General Quote'));
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  requestServiceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const svc = btn.dataset.service || '';
      openModal(svc);
    });
  });

  modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // fake submit: in phase 2 replace with fetch('/api/requests', {method:'POST', body:...})
    document.getElementById('modalMessage').style.display = 'block';
    modalForm.style.display = 'none';
    console.info('Modal form values:', {
      name: modalForm.mname.value,
      phone: modalForm.mphone.value,
      service: modalForm.mservice.value
    });
  });

  // contact form submission (client-side for now)
  requestForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(requestForm);
    const obj = Object.fromEntries(data.entries());
    console.info('Contact form submit:', obj);
    // show simple user feedback
    alert('Thank you! We received your request. We will contact you shortly.');
    requestForm.reset();
  });

});

