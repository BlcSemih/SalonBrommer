// Erweiterte JavaScript-Datei mit funktionierendem Buchungssystem
document.addEventListener('DOMContentLoaded', function() {
    // Zusätzliche CSS-Regeln für fixierte Navigationsleiste
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        header {
            position: fixed !important;
            top: 0 !important;
            left: 0;
            right: 0;
            z-index: 1000;
            background-color: rgba(255, 255, 255, 0.98);
            backdrop-filter: saturate(180%) blur(20px);
            -webkit-backdrop-filter: saturate(180%) blur(20px);
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: none;
        }
        
        header .header-container {
            border-radius: 0;
        }
        
        body {
            padding-top: 100px;
        }
        
        @media (max-width: 768px) {
            body {
                padding-top: 80px;
            }
        }
    `;
    document.head.appendChild(styleElement);
    
    // Ladeanimation ausblenden
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(function() {
            loader.classList.add('hidden');
            setTimeout(function() {
                loader.remove();
            }, 500);
        }, 800);
    }

    // Cookie-Banner zeigen, wenn noch nicht akzeptiert
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    
    // Prüfen, ob der Cookie bereits gesetzt ist
    if (localStorage.getItem('cookiesAccepted') !== 'true') {
        cookieBanner.style.display = 'flex';
    }
    
    // Event-Listener für den Akzeptieren-Button
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', function() {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.style.display = 'none';
        });
    }
    
    // Modal-Links
    const haircareLink = document.getElementById('haircare-tips-link');
    const haircareModal = document.getElementById('haircare-tips');
    
    const impressumLink = document.getElementById('impressum-link');
    const impressumModal = document.getElementById('impressum-modal');
    
    const privacyLink = document.getElementById('privacy-link');
    const privacyLinkBooking = document.getElementById('privacy-link-booking');
    const privacyLinkCookie = document.getElementById('privacy-link-cookie');
    const privacyModal = document.getElementById('privacy-modal');
    
    // Close buttons
    const closeButtons = document.querySelectorAll('.close-button');
    const modalCloseButtons = document.querySelectorAll('.modal-close-button');
    
    // Modal-Funktionen
    function openModal(modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Scrollen verhindern
    }
    
    function closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.classList.remove('show');
        });
        document.body.style.overflow = ''; // Scrollen wieder erlauben
    }
    
    // Event Listener für Modals
    if (haircareLink && haircareModal) {
        haircareLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(haircareModal);
        });
    }
    
    if (impressumLink && impressumModal) {
        impressumLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(impressumModal);
        });
    }
    
    if (privacyLink && privacyModal) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(privacyModal);
        });
    }
    
    if (privacyLinkBooking && privacyModal) {
        privacyLinkBooking.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(privacyModal);
        });
    }
    
    if (privacyLinkCookie && privacyModal) {
        privacyLinkCookie.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(privacyModal);
        });
    }
    
    // Close on X click
    closeButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });
    
    // Close on button click
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', closeAllModals);
    });
    
    // Close when clicking outside modal
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // Mobile Menü Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainMenu = document.getElementById('mainMenu');
    
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            mainMenu.classList.toggle('active');
        });
    }
    
    // VERBESSERTE SCROLL-EFFEKTE START
    
    // Referenzen zu DOM-Elementen
    const header = document.getElementById('siteHeader');
    const mainNavLinks = document.querySelectorAll('#mainMenu a[href^="#"]:not([href="#"])');
    const sections = document.querySelectorAll('section[id]');
    
    // Scroll-Spy Konfiguration (welcher Menüpunkt ist aktiv beim Scrollen)
    const scrollSpyOptions = {
        rootMargin: '-100px 0px -70% 0px', // Markiert Abschnitte früher als aktiv
        threshold: 0
    };
    
    // Animation-Observer Konfiguration (für Fade-in-Effekte)
    const animationObserverOptions = {
        rootMargin: '0px 0px -15% 0px', // Löst Animation aus, wenn Element fast sichtbar ist
        threshold: 0.1
    };
    
    // Header-Scroll-Effekte
    if (header) {
        // Direkt die fixed-Klasse hinzufügen, um die Navigationsleiste permanent zu fixieren
        header.classList.add('fixed');
        header.classList.add('visible');
        
        // Position oben auf 0 setzen
        header.style.top = '0';
        
        window.addEventListener('scroll', function() {
            // Immer sichtbar halten
            header.classList.remove('hidden');
            header.classList.add('visible');
        });
    }
    
    // Scroll-Spy Funktion (markiert aktiven Menüpunkt während des Scrollens)
    if (sections.length > 0 && mainNavLinks.length > 0) {
        const scrollSpy = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                // Wenn Abschnitt sichtbar ist
                if (entry.isIntersecting) {
                    // Aktive Klasse von allen Menülinks entfernen
                    mainNavLinks.forEach(link => link.classList.remove('active'));
                    
                    // Aktiven Menülink finden und markieren
                    const activeId = entry.target.getAttribute('id');
                    const activeLink = document.querySelector(`#mainMenu a[href="#${activeId}"]`);
                    
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, scrollSpyOptions);
        
        // Alle Abschnitte beobachten
        sections.forEach(section => {
            scrollSpy.observe(section);
        });
    }
    
    // Verbesserte Scroll-zu-Anker Funktion (sanfteres Scrollen)
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Sanfteres Scrollen mit angepasstem Offset
                const headerOffset = header ? header.offsetHeight + 20 : 20;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                
                // Sanftes Scrollen mit kubischer Bezier-Funktion für natürlichere Bewegung
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Mobile Menü schließen, wenn geöffnet
                if (mainMenu && mainMenu.classList.contains('active')) {
                    mainMenu.classList.remove('active');
                }
                
                // Aktiven Status in der Navigation aktualisieren
                mainNavLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Verbesserte Animation beim Scrollen
    const animationObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Leicht verzögerte Animation für natürlicheren Effekt
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, 50);
                    observer.unobserve(entry.target);
                }
            });
        }, 
        animationObserverOptions
    );
    
    // Alle animierten Elemente beobachten
    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .stagger-item').forEach(item => {
        animationObserver.observe(item);
        
        // Zufällige kleine Verzögerung für natürlichere Stagger-Effekte
        if (item.classList.contains('stagger-item') && !item.style.transitionDelay) {
            const randomDelay = Math.random() * 0.3;
            item.style.transitionDelay = `${randomDelay}s`;
        }
    });
    
    // VERBESSERTE SCROLL-EFFEKTE ENDE
    
    // FAQ Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Alle FAQs schließen
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Dieses FAQ öffnen, wenn es nicht bereits aktiv war
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Gallery Filtering
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Active-Klasse von allen Tabs entfernen
            galleryTabs.forEach(t => t.classList.remove('active'));
            
            // Active-Klasse zum geklickten Tab hinzufügen
            tab.classList.add('active');
            
            // Kategorie des geklickten Tabs abrufen
            const category = tab.dataset.category;
            
            // Alle Items filtern
            galleryItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // "Mehr Bilder laden"-Button Simulation
    const loadMoreButton = document.querySelector('.load-more-button');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Statt Alert eine schönere Animation und Meldung
            const galleryContainer = document.querySelector('.gallery-container');
            if (galleryContainer) {
                const loadingIndicator = document.createElement('div');
                loadingIndicator.className = 'loading-indicator';
                loadingIndicator.innerHTML = '<div class="loader-spinner"></div><p>Weitere Bilder werden geladen...</p>';
                loadingIndicator.style.textAlign = 'center';
                loadingIndicator.style.padding = '30px 0';
                
                galleryContainer.appendChild(loadingIndicator);
                
                // Simuliere Ladezeit
                setTimeout(() => {
                    loadingIndicator.remove();
                    
                    // Hinweis für die Demo-Version
                    const infoMessage = document.createElement('div');
                    infoMessage.className = 'info-message';
                    infoMessage.style.backgroundColor = 'rgba(143, 102, 255, 0.1)';
                    infoMessage.style.padding = '15px';
                    infoMessage.style.borderRadius = '8px';
                    infoMessage.style.marginTop = '20px';
                    infoMessage.style.textAlign = 'center';
                    
                    infoMessage.innerHTML = '<p style="margin: 0;">In der finalen Version würden hier weitere Bilder geladen werden.</p>';
                    
                    galleryContainer.appendChild(infoMessage);
                    
                    // Entferne den Button, damit er nicht mehrfach geklickt werden kann
                    loadMoreButton.style.display = 'none';
                    
                    // Füge einen "Verstanden"-Button hinzu
                    const okButton = document.createElement('button');
                    okButton.className = 'button';
                    okButton.innerText = 'Verstanden';
                    okButton.style.marginTop = '15px';
                    
                    infoMessage.appendChild(okButton);
                    
                    okButton.addEventListener('click', () => {
                        infoMessage.remove();
                        loadMoreButton.style.display = 'inline-block';
                    });
                }, 1500);
            }
        });
    }
    
    // 3D-Hover-Effekt für Karten
    document.querySelectorAll('.service-card, .team-member, .testimonial-card, .gallery-item').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth > 768) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const midX = rect.width / 2;
                const midY = rect.height / 2;
                
                const offsetX = ((x - midX) / midX) * 5;
                const offsetY = ((y - midY) / midY) * 5;
                
                this.style.transform = `translateY(-10px) rotateX(${-offsetY}deg) rotateY(${offsetX}deg)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // FUNKTIONIERENDES BUCHUNGSSYSTEM START
    
    // Variablen für das Buchungssystem
    let selectedService = null;
    let selectedServiceName = '';
    let selectedServiceDuration = 0;
    let selectedDate = null;
    let selectedTimeSlot = null;
    
    // Service-Auswahl
    const serviceOptions = document.querySelectorAll('.service-option');
    const nextToStep2Button = document.getElementById('next-to-step-2');
    
    // Funktion zum Umschalten zwischen Buchungsschritten
    function showBookingStep(stepNumber) {
        // Alle Schritte ausblenden
        document.querySelectorAll('.booking-step').forEach(step => {
            step.classList.add('hidden');
        });
        
        // Gewählten Schritt anzeigen
        const targetStep = document.getElementById(`step-${stepNumber}`);
        if (targetStep) {
            targetStep.classList.remove('hidden');
        }
    }
    
    // Service-Optionen
    if (serviceOptions.length > 0 && nextToStep2Button) {
        serviceOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Frühere Auswahl zurücksetzen
                serviceOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Diese Option auswählen
                this.classList.add('selected');
                
                // Service-Daten speichern
                selectedService = this.dataset.service;
                selectedServiceName = this.querySelector('h4').textContent;
                selectedServiceDuration = parseInt(this.dataset.duration, 10);
                
                // Button aktivieren
                nextToStep2Button.disabled = false;
            });
        });
        
        // Weiter zum Kalender
        nextToStep2Button.addEventListener('click', function() {
            if (selectedService) {
                showBookingStep(2);
                renderCalendar();
            }
        });
    }
    
    // Zurück zum Service
    const backToStep1Button = document.getElementById('back-to-step-1');
    if (backToStep1Button) {
        backToStep1Button.addEventListener('click', function() {
            showBookingStep(1);
        });
    }
    
    // Kalender-Logik
    const calendarDays = document.getElementById('calendar-days');
    const monthYear = document.getElementById('month-year');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    const nextToStep3Button = document.getElementById('next-to-step-3');
    
    // Aktuelle Datum-Tracking
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Formatiert Datum als "DD.MM.YYYY"
    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    }
    
    // Rendert den Kalender basierend auf aktuellem Monat/Jahr
    function renderCalendar() {
        if (!calendarDays || !monthYear) return;
        
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();
        
        // Bestimme den Wochentag des ersten Tages (0 = Sonntag, 1 = Montag, ...)
        let firstDayWeekday = firstDayOfMonth.getDay();
        // Umwandlung: Sonntag (0) sollte als 7 dargestellt werden für europäischen Kalender
        if (firstDayWeekday === 0) firstDayWeekday = 7;
        
        // Titel des Kalenders aktualisieren
        const monthNames = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 
                            'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
        monthYear.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        
        // Kalender leeren
        calendarDays.innerHTML = '';
        
        // Leere Zellen für Tage vor dem ersten Tag des Monats
        for (let i = 1; i < firstDayWeekday; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.className = 'calendar-day other-month';
            calendarDays.appendChild(emptyDay);
        }
        
        // Tage des aktuellen Monats
        const today = new Date();
        
        for (let i = 1; i <= daysInMonth; i++) {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.textContent = i;
            
            // Aktuelles Datum markieren
            const dayDate = new Date(currentYear, currentMonth, i);
            
            // Prüfen, ob es sich um den heutigen Tag handelt
            if (today.getDate() === i && today.getMonth() === currentMonth && today.getFullYear() === currentYear) {
                dayElement.classList.add('today');
            }
            
            // Vergangene Tage oder Sonntage deaktivieren
            if (dayDate < today || dayDate.getDay() === 0) {
                dayElement.classList.add('disabled');
            } else {
                // Klick-Event für auswählbare Tage
                dayElement.addEventListener('click', function() {
                    // Frühere Auswahl zurücksetzen
                    document.querySelectorAll('.calendar-day').forEach(day => {
                        day.classList.remove('selected');
                    });
                    
                    // Diesen Tag auswählen
                    this.classList.add('selected');
                    
                    // Datum speichern
                    selectedDate = new Date(currentYear, currentMonth, i);
                    
                    // Button aktivieren
                    if (nextToStep3Button) {
                        nextToStep3Button.disabled = false;
                    }
                });
            }
            
            calendarDays.appendChild(dayElement);
        }
    }
    
    // Event-Listener für Kalender-Navigation
    if (prevMonthButton && nextMonthButton) {
        prevMonthButton.addEventListener('click', function() {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        });
        
        nextMonthButton.addEventListener('click', function() {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            renderCalendar();
        });
    }
    
    // Weiter zur Zeitauswahl
    if (nextToStep3Button) {
        nextToStep3Button.addEventListener('click', function() {
            if (selectedDate) {
                showBookingStep(3);
                
                // Anzeige der ausgewählten Service- und Datumsinformationen
                const selectedServiceDisplay = document.getElementById('selected-service-display');
                const selectedDateDisplay = document.getElementById('selected-date-display');
                
                if (selectedServiceDisplay) {
                    selectedServiceDisplay.textContent = selectedServiceName;
                }
                
                if (selectedDateDisplay) {
                    selectedDateDisplay.textContent = formatDate(selectedDate);
                }
                
                // Zeitslots generieren
                generateTimeSlots();
            }
        });
    }
    
    // Zurück zum Kalender
    const backToStep2Button = document.getElementById('back-to-step-2');
    if (backToStep2Button) {
        backToStep2Button.addEventListener('click', function() {
            showBookingStep(2);
        });
    }
    
    // Zeitslot-Generierung
    const timeSlots = document.getElementById('time-slots');
    const nextToStep4Button = document.getElementById('next-to-step-4');
    
    function generateTimeSlots() {
        if (!timeSlots) return;
        
        // Zeitslots leeren
        timeSlots.innerHTML = '';
        
        // Öffnungszeiten basierend auf dem Wochentag
        const dayOfWeek = selectedDate.getDay(); // 0 = Sonntag, 1 = Montag, ...
        
        let openingTime, closingTime;
        
        switch (dayOfWeek) {
            case 0: // Sonntag - geschlossen
                return;
            case 1: // Montag - geschlossen
                return;
            case 4: // Donnerstag - längere Öffnungszeiten
                openingTime = 9;
                closingTime = 20;
                break;
            case 6: // Samstag - kürzere Öffnungszeiten
                openingTime = 9;
                closingTime = 14;
                break;
            default: // Dienstag, Mittwoch, Freitag
                openingTime = 9;
                closingTime = 18;
        }
        
        // Service-Dauer in Stunden
        const serviceDurationHours = selectedServiceDuration / 60;
        
        // Liste der verfügbaren Zeitslots erstellen
        for (let hour = openingTime; hour < closingTime; hour++) {
            // Für jede volle Stunde und für die halbe Stunde, falls die Servicedauer passt
            for (let minute of [0, 30]) {
                // Prüfen, ob genügend Zeit für den Service bleibt
                if (hour + serviceDurationHours <= closingTime || 
                    (hour + serviceDurationHours === closingTime && minute === 0)) {
                    
                    // Zeitslot erstellen
                    const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                    const timeSlot = document.createElement('div');
                    timeSlot.className = 'time-slot';
                    timeSlot.textContent = timeString;
                    
                    // Zufällig einige Zeitslots als "bereits gebucht" markieren (für Demo-Zwecke)
                    if (Math.random() < 0.3) {
                        timeSlot.classList.add('disabled');
                    } else {
                        // Klick-Event für verfügbare Zeitslots
                        timeSlot.addEventListener('click', function() {
                            // Frühere Auswahl zurücksetzen
                            document.querySelectorAll('.time-slot').forEach(slot => {
                                slot.classList.remove('selected');
                            });
                            
                            // Diesen Zeitslot auswählen
                            this.classList.add('selected');
                            
                            // Zeitslot speichern
                            selectedTimeSlot = timeString;
                            
                            // Button aktivieren
                            if (nextToStep4Button) {
                                nextToStep4Button.disabled = false;
                            }
                        });
                    }
                    
                    timeSlots.appendChild(timeSlot);
                }
            }
        }
    }
    
    // Weiter zur Bestätigung
    if (nextToStep4Button) {
        nextToStep4Button.addEventListener('click', function() {
            if (selectedTimeSlot) {
                showBookingStep(4);
                
                // Zusammenfassung der Buchung anzeigen
                updateBookingSummary();
            }
        });
    }
    
    // Zurück zur Zeitauswahl
    const backToStep3Button = document.getElementById('back-to-step-3');
    if (backToStep3Button) {
        backToStep3Button.addEventListener('click', function() {
            showBookingStep(3);
        });
    }
    
    // Buchungszusammenfassung aktualisieren
    function updateBookingSummary() {
        const summaryService = document.getElementById('summary-service');
        const summaryDate = document.getElementById('summary-date');
        const summaryTime = document.getElementById('summary-time');
        const summaryDuration = document.getElementById('summary-duration');
        
        if (summaryService) {
            summaryService.textContent = selectedServiceName;
        }
        
        if (summaryDate) {
            summaryDate.textContent = formatDate(selectedDate);
        }
        
        if (summaryTime) {
            summaryTime.textContent = selectedTimeSlot;
        }
        
        if (summaryDuration) {
            const hours = Math.floor(selectedServiceDuration / 60);
            const minutes = selectedServiceDuration % 60;
            let durationText = '';
            
            if (hours > 0) {
                durationText += `${hours} Stunde${hours > 1 ? 'n' : ''}`;
            }
            
            if (minutes > 0) {
                durationText += `${hours > 0 ? ' ' : ''}${minutes} Minuten`;
            }
            
            summaryDuration.textContent = durationText;
        }
    }
    
    // Formularvalidierung
    const customerForm = document.querySelector('.customer-form');
    const submitBookingButton = document.getElementById('submit-booking');
    
    if (customerForm && submitBookingButton) {
        // Prüfe Formularfelder bei Änderungen
        const requiredInputs = customerForm.querySelectorAll('input[required], textarea[required]');
        const privacyConsent = document.getElementById('privacy-consent');
        
        function validateForm() {
            let isValid = true;
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    // Visuelles Feedback für fehlende Felder
                    input.style.borderColor = '#d8624c';
                } else {
                    input.style.borderColor = '';
                }
            });
            
            if (privacyConsent && !privacyConsent.checked) {
                isValid = false;
            }
            
            return isValid;
        }
        
        // Event-Listener für Input-Änderungen
        requiredInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim()) {
                    this.style.borderColor = '';
                }
            });
        });
        
        // Termin buchen
        submitBookingButton.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // Kundendaten abrufen
                const customerName = document.getElementById('customer-name').value;
                const customerEmail = document.getElementById('customer-email').value;
                const customerPhone = document.getElementById('customer-phone').value;
                const customerNotes = document.getElementById('customer-notes').value;
                
                // Buchungsdetails in der Bestätigungsseite anzeigen
                const confirmedService = document.getElementById('confirmed-service');
                const confirmedDate = document.getElementById('confirmed-date');
                const confirmedTime = document.getElementById('confirmed-time');
                const confirmedName = document.getElementById('confirmed-name');
                
                if (confirmedService) confirmedService.textContent = selectedServiceName;
                if (confirmedDate) confirmedDate.textContent = formatDate(selectedDate);
                if (confirmedTime) confirmedTime.textContent = selectedTimeSlot;
                if (confirmedName) confirmedName.textContent = customerName;
                
                // In einer realen Anwendung würden hier die Daten an einen Server gesendet werden
                // Für Demo-Zwecke simulieren wir eine kurze Ladezeit
                
                // Lade-Animation hinzufügen
                submitBookingButton.disabled = true;
                submitBookingButton.innerHTML = '<span class="loading-dots">Buchung wird verarbeitet...</span>';
                
                setTimeout(() => {
                    // Zum Bestätigungsbildschirm wechseln
                    showBookingStep(5);
                    
                    // Formularfelder zurücksetzen
                    customerForm.reset();
                }, 1500);
            } else {
                // Fehlermeldung für fehlende Pflichtfelder anzeigen
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.style.color = '#d8624c';
                errorMessage.style.marginTop = '15px';
                errorMessage.style.fontWeight = 'bold';
                errorMessage.textContent = 'Bitte füllen Sie alle Pflichtfelder aus.';
                
                // Prüfen, ob bereits eine Fehlermeldung angezeigt wird
                const existingError = customerForm.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                customerForm.appendChild(errorMessage);
                
                // Nach 3 Sekunden ausblenden
                setTimeout(() => {
                    errorMessage.style.opacity = '0';
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 500);
                }, 3000);
            }
        });
    }
    
    // Neuen Termin buchen (zurück zum Start)
    const newBookingButton = document.getElementById('new-booking');
    if (newBookingButton) {
        newBookingButton.addEventListener('click', function() {
            // Zurück zum ersten Schritt
            showBookingStep(1);
            
            // Auswahl zurücksetzen
            selectedService = null;
            selectedServiceName = '';
            selectedServiceDuration = 0;
            selectedDate = null;
            selectedTimeSlot = null;
            
            // Button-Status zurücksetzen
            if (nextToStep2Button) nextToStep2Button.disabled = true;
            if (nextToStep3Button) nextToStep3Button.disabled = true;
            if (nextToStep4Button) nextToStep4Button.disabled = true;
            
            // Service-Auswahl zurücksetzen
            serviceOptions.forEach(option => {
                option.classList.remove('selected');
            });
        });
    }
    
    // BUCHUNGSSYSTEM ENDE
    
    // Sanfter "Back-to-Top" Button, erscheint beim Scrollen
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '↑';
    backToTopButton.className = 'back-to-top';
    document.body.appendChild(backToTopButton);
    
    // Back-to-Top Button erscheint, wenn nach unten gescrollt wird
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Scroll nach oben, wenn Button geklickt wird
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});