document.addEventListener('DOMContentLoaded', function(){
  let currentLanguage = localStorage.getItem('language') || 'en';
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
});
