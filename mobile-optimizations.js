// Mobile-Optimierungen für Salon Brommer
document.addEventListener('DOMContentLoaded', function() {
  
  // Festen Buchungsbutton für mobile Geräte hinzufügen
  if (window.innerWidth <= 768) {
    // Button-Container erstellen
    const mobileBookBtn = document.createElement('div');
    mobileBookBtn.className = 'mobile-book-button';
    
    // Button-Element erstellen
    const bookButton = document.createElement('a');
    bookButton.href = '#booking';
    bookButton.className = 'button';
    bookButton.textContent = 'Termin buchen';
    
    // Button zum Container hinzufügen
    mobileBookBtn.appendChild(bookButton);
    
    // Container zum Body hinzufügen
    document.body.appendChild(mobileBookBtn);
    
    // Click-Event für den mobilen Buchungsbutton
    bookButton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Zu Buchungssektion scrollen
      const bookingSection = document.getElementById('booking');
      if (bookingSection) {
        const headerOffset = document.getElementById('siteHeader') ? 
          document.getElementById('siteHeader').offsetHeight : 70;
        
        const bookingPosition = bookingSection.getBoundingClientRect().top + 
          window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: bookingPosition,
          behavior: 'smooth'
        });
      }
      
      // Mobile Menü schließen, wenn es geöffnet ist
      const mainMenu = document.getElementById('mainMenu');
      if (mainMenu && mainMenu.classList.contains('active')) {
        mainMenu.classList.remove('active');
      }
    });
  }
  
  // Optimierte Galerie-Tabs-Scrolling für Touch-Geräte
  const galleryTabs = document.querySelector('.gallery-tabs');
  if (galleryTabs && window.innerWidth <= 768) {
    // Horizontales Scrolling durch Berührung ermöglichen
    let isDown = false;
    let startX;
    let scrollLeft;
    
    galleryTabs.addEventListener('mousedown', (e) => {
      isDown = true;
      galleryTabs.classList.add('active');
      startX = e.pageX - galleryTabs.offsetLeft;
      scrollLeft = galleryTabs.scrollLeft;
    });
    
    galleryTabs.addEventListener('mouseleave', () => {
      isDown = false;
      galleryTabs.classList.remove('active');
    });
    
    galleryTabs.addEventListener('mouseup', () => {
      isDown = false;
      galleryTabs.classList.remove('active');
    });
    
    galleryTabs.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - galleryTabs.offsetLeft;
      const walk = (x - startX) * 2; // Scroll-Geschwindigkeit
      galleryTabs.scrollLeft = scrollLeft - walk;
    });
  }
  
  // Verbesserte Touch-Ereignisse für FAQ-Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    // Event-Listener für Touch-Geräte optimieren
    if (question) {
      // Alten Click-Event entfernen (falls vorhanden)
      const newQuestion = question.cloneNode(true);
      question.parentNode.replaceChild(newQuestion, question);
      
      // Neuen optimierten Event-Listener hinzufügen
      newQuestion.addEventListener('click', function(e) {
        e.preventDefault();
        const isActive = item.classList.contains('active');
        
        // Alle FAQs schließen
        faqItems.forEach(faq => {
          faq.classList.remove('active');
        });
        
        // Dieses FAQ öffnen, wenn es nicht bereits aktiv war
        if (!isActive) {
          item.classList.add('active');
          
          // Nach kurzer Verzögerung zum sichtbaren Bereich scrollen
          setTimeout(() => {
            const headerOffset = document.getElementById('siteHeader') ? 
              document.getElementById('siteHeader').offsetHeight + 20 : 90;
            
            const itemPosition = item.getBoundingClientRect().top + 
              window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: itemPosition,
              behavior: 'smooth'
            });
          }, 300);
        }
      });
    }
  });
  
  // Lazy-Loading für Bilder auf mobilen Geräten
  if ('IntersectionObserver' in window) {
    const imgOptions = {
      rootMargin: '0px 0px 50px 0px',
      threshold: 0.1
    };
    
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
    }, imgOptions);
    
    // Alle Bilder mit data-src Attribut beobachten
    document.querySelectorAll('img[data-src]').forEach(img => {
      imgObserver.observe(img);
    });
  }
  
  // Verbesserte Handhabung des mobilen Menüs
  const menuToggle = document.getElementById('menuToggle');
  const mainMenu = document.getElementById('mainMenu');
  
  if (menuToggle && mainMenu) {
    // Altes Event entfernen und neues hinzufügen
    const newMenuToggle = menuToggle.cloneNode(true);
    menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
    
    newMenuToggle.addEventListener('click', function(e) {
      e.stopPropagation();
      mainMenu.classList.toggle('active');
      
      // Schließen-Icon wechseln
      this.textContent = mainMenu.classList.contains('active') ? '✕' : '☰';
    });
    
    // Menü schließen, wenn außerhalb geklickt wird
    document.addEventListener('click', function(e) {
      if (mainMenu.classList.contains('active') && 
          !mainMenu.contains(e.target) && 
          e.target !== newMenuToggle) {
        mainMenu.classList.remove('active');
        newMenuToggle.textContent = '☰';
      }
    });
    
    // Menüpunkte verbessern
    const menuLinks = mainMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
      link.addEventListener('click', function() {
        mainMenu.classList.remove('active');
        newMenuToggle.textContent = '☰';
      });
    });
  }
  
  // Optimierung der Buchungsschritte für mobile Geräte
  if (window.innerWidth <= 768) {
    // Schrittwechsel mit Animation
    const originalShowBookingStep = window.showBookingStep;
    
    if (typeof originalShowBookingStep === 'function') {
      window.showBookingStep = function(stepNumber) {
        // Alle Schritte ausblenden
        document.querySelectorAll('.booking-step').forEach(step => {
          step.classList.add('hidden');
        });
        
        // Gewählten Schritt anzeigen
        const targetStep = document.getElementById(`step-${stepNumber}`);
        if (targetStep) {
          targetStep.classList.remove('hidden');
          
          // Zum Anfang des Buchungscontainers scrollen
          const bookingContainer = document.querySelector('.booking-container');
          if (bookingContainer) {
            const headerOffset = document.getElementById('siteHeader') ? 
              document.getElementById('siteHeader').offsetHeight + 10 : 80;
            
            const containerPosition = bookingContainer.getBoundingClientRect().top + 
              window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: containerPosition,
              behavior: 'smooth'
            });
          }
        }
      };
    }
  }
  
  // Performance-Optimierung für mobile Animationen
  const reduceMobileAnimations = () => {
    if (window.innerWidth <= 768) {
      // Transition-Delay für bessere Leistung verringern
      document.querySelectorAll('[style*="transition-delay"]').forEach(el => {
        const currentDelay = parseFloat(el.style.transitionDelay || '0');
        if (currentDelay > 0.3) {
          el.style.transitionDelay = '0.2s';
        }
      });
      
      // Animationsdauer verkürzen
      document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .stagger-item').forEach(el => {
        el.style.transitionDuration = '0.5s';
      });
    }
  };
  
  // Einmal initial aufrufen
  reduceMobileAnimations();
  
  // Bei Größenänderung erneut überprüfen
  window.addEventListener('resize', reduceMobileAnimations);
  
  // Verbesserte Handhabung des Passwort-Overlays auf mobilen Geräten
  const pwdOverlay = document.getElementById('pwd-overlay');
  const pwdInput = document.getElementById('pwd');
  
  if (pwdOverlay && pwdInput && window.innerWidth <= 768) {
    // Input-Feld automatisch fokussieren
    setTimeout(() => {
      pwdInput.focus();
    }, 500);
    
    // Enter-Taste zum Absenden
    pwdInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        // Überprüfen und verarbeiten
        if (this.value === 'demo2025') {
          pwdOverlay.style.display = 'none';
        } else {
          alert('Falsches Passwort!');
          this.value = '';
        }
      }
    });
  }
});

// Lazy-Load-Funktion für Bildergalerie
function setupLazyLoadingImages() {
  // Prüfen, ob Bilder in der Galerie existieren
  const galleryImages = document.querySelectorAll('.full-image[src^="images/"]');
  
  if (galleryImages.length > 0 && window.innerWidth <= 768) {
    galleryImages.forEach(img => {
      // Original-Quelle speichern
      const originalSrc = img.src;
      
      // Data-src setzen und temporär ein Platzhalterbild laden
      img.setAttribute('data-src', originalSrc);
      img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
    });
    
    // Lazy Loading initialisieren
    if ('IntersectionObserver' in window) {
      const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            lazyImage.src = lazyImage.getAttribute('data-src');
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });
      
      galleryImages.forEach(image => {
        lazyImageObserver.observe(image);
      });
    }
  }
}

// Funktion nach dem DOMContentLoaded aufrufen
document.addEventListener('DOMContentLoaded', setupLazyLoadingImages);
