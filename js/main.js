document.addEventListener('DOMContentLoaded', function(){
  const themeToggleButton = document.getElementById('theme-toggle');
  const bodyElement = document.body;
  const savedTheme = localStorage.getItem('theme') || 'light';
  bodyElement.setAttribute('data-theme', savedTheme);
  themeToggleButton.textContent = savedTheme === 'light' ? 'Dark' : 'Light';
  themeToggleButton.addEventListener('click', function(){
    const currentTheme = bodyElement.getAttribute('data-theme');
    if(currentTheme === 'light'){
      bodyElement.setAttribute('data-theme', 'dark');
      themeToggleButton.textContent = 'Light';
      localStorage.setItem('theme', 'dark');
    } else {
      bodyElement.setAttribute('data-theme', 'light');
      themeToggleButton.textContent = 'Dark';
      localStorage.setItem('theme', 'light');
    }
  });

  const languageToggleButton = document.getElementById('language-toggle');
  let currentLanguage = localStorage.getItem('language') || 'en';
  languageToggleButton.textContent = currentLanguage === 'en' ? 'ES' : 'EN';
  document.body.setAttribute('lang', currentLanguage);
  function updateLanguage(){
    const translationElements = document.querySelectorAll('[data-en]');
    translationElements.forEach(function(element){
      element.textContent = element.getAttribute(currentLanguage === 'en' ? 'data-en' : 'data-es');
    });
    const placeholderElements = document.querySelectorAll('[data-en-placeholder]');
    placeholderElements.forEach(function(element){
      element.placeholder = element.getAttribute(currentLanguage === 'en' ? 'data-en-placeholder' : 'data-es-placeholder');
    });
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    submitButtons.forEach(function(button){
      button.textContent = button.getAttribute(currentLanguage === 'en' ? 'data-en' : 'data-es');
    });
  }
  updateLanguage();
  languageToggleButton.addEventListener('click', function(){
    currentLanguage = currentLanguage === 'en' ? 'es' : 'en';
    languageToggleButton.textContent = currentLanguage === 'en' ? 'ES' : 'EN';
    document.body.setAttribute('lang', currentLanguage);
    updateLanguage();
    localStorage.setItem('language', currentLanguage);
  });

  const modalOverlayElements = document.querySelectorAll('.modal-overlay');
  const closeModalButtons = document.querySelectorAll('[data-close]');
  const floatingIcons = document.querySelectorAll('.floating-icon');
  floatingIcons.forEach(function(icon){
    icon.addEventListener('click', function(){
      const modalId = icon.getAttribute('data-modal');
      const modalElement = document.getElementById(modalId);
      if(modalElement){
        modalElement.classList.add('active');
        modalElement.focus();
      }
    });
    icon.addEventListener('keydown', function(event){
      if(event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar'){
        event.preventDefault();
        const modalId = icon.getAttribute('data-modal');
        const modalElement = document.getElementById(modalId);
        if(modalElement){
          modalElement.classList.add('active');
          modalElement.focus();
        }
      }
    });
  });
  closeModalButtons.forEach(function(button){
    button.addEventListener('click', function(){
      const modalElement = button.closest('.modal-overlay');
      if(modalElement){
        modalElement.classList.remove('active');
      }
    });
    button.addEventListener('keydown', function(event){
      if(event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar'){
        event.preventDefault();
        const modalElement = button.closest('.modal-overlay');
        if(modalElement){
          modalElement.classList.remove('active');
        }
      }
    });
  });
  modalOverlayElements.forEach(function(overlay){
    overlay.addEventListener('click', function(event){
      if(event.target === overlay){
        overlay.classList.remove('active');
      }
    });
    overlay.addEventListener('keydown', function(event){
      if(event.key === 'Escape'){
        overlay.classList.remove('active');
      }
    });
  });
  if(window.location.pathname.includes('business-operations.html')){
    const businessContent = document.querySelector('#business-section');
    if(businessContent){
      businessContent.innerHTML = `
        <h3 data-en="Optimize Your Business Processes" data-es="Optimiza tus Procesos Empresariales">Optimize Your Business Processes</h3>
        <p data-en="Our business operations solutions include accounts payable, receivables, billing, and comprehensive workflow management designed to streamline your organization." data-es="Nuestras soluciones en operaciones empresariales incluyen cuentas por pagar, cuentas por cobrar, facturación y una gestión integral del flujo de trabajo para optimizar tu organización.">
          Our business operations solutions include accounts payable, receivables, billing, and comprehensive workflow management designed to streamline your organization.
        </p>
        <button id="business-contact-btn" data-en="Contact Us" data-es="Contáctenos"></button>
      `;
      const businessContactBtn = document.getElementById('business-contact-btn');
      businessContactBtn.textContent = businessContactBtn.getAttribute(currentLanguage === 'en' ? 'data-en' : 'data-es');
      businessContactBtn.addEventListener('click', function(){
        const contactModal = document.getElementById('contact-modal');
        if(contactModal){
          contactModal.classList.add('active');
          contactModal.focus();
        }
      });
    }
  }
  if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration){
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error){
        console.error('Service Worker registration failed:', error);
      });
    });
  } else {
    console.log('Service workers are not supported in this browser.');
  }
});
