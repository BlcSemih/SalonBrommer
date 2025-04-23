document.addEventListener('DOMContentLoaded', function() {
  // Festen Buchungsbutton für mobile Geräte hinzufügen
  if (window.innerWidth <= 768) {
    const mobileBookBtn = document.createElement('div');
    mobileBookBtn.className = 'mobile-book-button';
    
    const bookButton = document.createElement('a');
    bookButton.href = '#booking';
    bookButton.className = 'button';
    bookButton.textContent = 'Termin buchen';
    
    mobileBookBtn.appendChild(bookButton);
    document.body.appendChild(mobileBookBtn);
  }
  
  // Verbesserte Handhabung des mobilen Menüs
  const menuToggle = document.getElementById('menuToggle');
  const mainMenu = document.getElementById('mainMenu');
  
  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      mainMenu.classList.toggle('active');
    });
  }
  
  // Einfaches Lazy-Loading für Bilder
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          
          if (src) {
            img.src = src;
            img.removeAttribute('data-src');
          }
          
          observer.unobserve(img);
        }
      });
    });
    
    // Nur Bilder mit data-src beobachten
    document.querySelectorAll('img[data-src]').forEach(img => {
      imgObserver.observe(img);
    });
  }
  
  // Einfache FAQ-Funktionalität
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function() {
        // Alle FAQs schließen
        faqItems.forEach(faq => {
          faq.classList.remove('active');
        });
        
        // Dieses FAQ öffnen
        item.classList.add('active');
      });
    }
  });
});
