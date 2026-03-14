/**
 * Countdown Timer
 * Calculates time remaining until wedding date
 */

class WeddingTimer {
    constructor(weddingDate, elements) {
        this.weddingDate = new Date(weddingDate).getTime();
        this.elements = elements;
        this.updateInterval = null;
    }

    calculateTimeRemaining() {
        const now = new Date().getTime();
        const distance = this.weddingDate - now;

        if (distance < 0) {
            this.clearTimer();
            return {
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                isExpired: true
            };
        }

        return {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
            isExpired: false
        };
    }

    updateDisplay() {
        const time = this.calculateTimeRemaining();

        if (time.isExpired) {
            this.showCelebrationMessage();
            return;
        }

        // Update DOM elements with animation
        this.updateElement(this.elements.days, time.days);
        this.updateElement(this.elements.hours, time.hours);
        this.updateElement(this.elements.minutes, time.minutes);
        this.updateElement(this.elements.seconds, time.seconds);
    }

    updateElement(element, value) {
        if (!element) return;
        
        const stringValue = String(value).padStart(2, '0');
        
        // Add pulse animation on change
        if (element.textContent !== stringValue) {
            element.classList.add('pulse');
            element.textContent = stringValue;
            
            setTimeout(() => {
                element.classList.remove('pulse');
            }, 300);
        }
    }

    start() {
        this.updateDisplay(); // Initial call
        this.updateInterval = setInterval(() => {
            this.updateDisplay();
        }, 1000);
    }

    clearTimer() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }

    showCelebrationMessage() {
        // 1. Обновляем секцию таймера
        const countdownSection = document.querySelector('.countdown-section');
        if (countdownSection) {
            countdownSection.innerHTML = `
                <div class="container">
                    <h2 class="section-title">Сегодня наш особенный день! ❤</h2>
                    <p style="text-align: center; font-size: 1.5rem; font-family: var(--font-serif);">
                        Мы так рады, что вы с нами!
                    </p>
                </div>
            `;
        }

        // 2. Скрываем секцию RSVP
        const rsvpSection = document.getElementById('rsvp');
        if (rsvpSection) {
            rsvpSection.innerHTML = `
                <div class="container">
                    <div class="rsvp-wrapper fade-in visible">
                        <h2 class="section-title">Свадьба состоялась! ❤</h2>
                        <p class="rsvp-subtitle">Спасибо всем, кто разделил с нами этот особенный день!</p>
                        <div style="text-align: center; font-size: 3rem; margin: 30px 0;">🎉💕</div>
                    </div>
                </div>
            `;
        }

        // 3. Скрываем плавающую кнопку RSVP
        const floatingBtn = document.getElementById('floatingRsvp');
        if (floatingBtn) {
            floatingBtn.style.display = 'none';
        }

        // 4. Скрываем кнопку "Подтвердить" в меню
        const navConfirm = document.querySelector('.nav-link--accent');
        if (navConfirm) {
            navConfirm.style.display = 'none';
        }

        // 5. Блокируем яндекс форму (если ещё не загрузилась)
        const yandexForm = document.getElementById('yandexForm');
        if (yandexForm) {
            yandexForm.style.pointerEvents = 'none';
            yandexForm.style.opacity = '0.5';
        }

        console.log('🎉 Свадьба началась! RSVP закрыт.');
    }
}

// Initialize timer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set your wedding date here (format: YYYY-MM-DDTHH:MM:SS)
    const WEDDING_DATE = '2026-08-07T00:00:00+03:00';
    
    const timerElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    };

    const timer = new WeddingTimer(WEDDING_DATE, timerElements);
    timer.start();

        // Проверяем при загрузке — вдруг свадьба уже прошла
    const now = new Date().getTime();
    const weddingTime = new Date(WEDDING_DATE).getTime();

    if (now > weddingTime) {
        // Свадьба уже прошла — сразу скрываем RSVP
        setTimeout(() => {
            const rsvpSection = document.getElementById('rsvp');
            const floatingBtn = document.getElementById('floatingRsvp');
            const navConfirm = document.getElementById('navConfirmBtn');
            
            if (rsvpSection) {
                rsvpSection.innerHTML = `
                    <div class="container">
                        <div class="rsvp-wrapper fade-in visible">
                            <h2 class="section-title">Свадьба состоялась! ❤</h2>
                            <p class="rsvp-subtitle">Спасибо всем, кто разделил с нами этот особенный день!</p>
                        </div>
                    </div>
                `;
            }
            
            if (floatingBtn) floatingBtn.style.display = 'none';
            if (navConfirm) navConfirm.style.display = 'none';
        }, 1000);
    }
});