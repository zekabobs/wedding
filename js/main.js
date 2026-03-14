/**
 * Main JavaScript File
 * Initializes all components and handles global functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initNavigation();
    initMap();
    initLoader();
    initLazyLoading();
});

/**
 * Music Player
 */
class WeddingMusicPlayer {
    constructor() {
        this.audio = document.getElementById('weddingMusic');
        this.welcomeScreen = document.getElementById('welcomeScreen');
        this.enterBtn = document.getElementById('enterSiteBtn');
        this.musicControl = document.getElementById('musicControl');
        this.isPlaying = false;
        this.isMuted = false;
        
        this.init();
    }
    
    init() {
        // Устанавливаем громкость (30% чтобы не было слишком громко)
        if (this.audio) {
            this.audio.volume = 0.3;
        }
        
        // Обработчик кнопки "Открыть приглашение"
        if (this.enterBtn) {
            this.enterBtn.addEventListener('click', () => {
                this.enterSite();
            });
        }
        
        // Обработчик кнопки управления музыкой
        if (this.musicControl) {
            this.musicControl.addEventListener('click', () => {
                this.toggleMusic();
            });
        }
        
        // Скрываем кнопку управления если нет аудио
        if (!this.audio && this.musicControl) {
            this.musicControl.style.display = 'none';
        }
    }
    
    enterSite() {
        // Скрываем welcome экран
        if (this.welcomeScreen) {
            this.welcomeScreen.classList.add('hidden');
            
            // Удаляем из DOM после анимации
            setTimeout(() => {
                this.welcomeScreen.style.display = 'none';
            }, 800);
        }
        
        // Запускаем музыку
        this.playMusic();
        
        // Сохраняем в localStorage что пользователь уже заходил
        localStorage.setItem('weddingSiteVisited', 'true');
    }
    
    playMusic() {
        if (!this.audio) return;
        
        this.audio.play()
            .then(() => {
                this.isPlaying = true;
                this.updateControlIcon();
                console.log('🎵 Музыка играет');
            })
            .catch(error => {
                console.warn('⚠️ Автозапуск музыки заблокирован:', error);
                // Показываем кнопку чтобы пользователь мог включить сам
                if (this.musicControl) {
                    this.musicControl.style.display = 'flex';
                }
            });
    }
    
    pauseMusic() {
        if (!this.audio) return;
        
        this.audio.pause();
        this.isPlaying = false;
        this.updateControlIcon();
        console.log('⏸️ Музыка на паузе');
    }
    
    toggleMusic() {
        if (this.isPlaying) {
            this.pauseMusic();
        } else {
            this.playMusic();
        }
    }
    
    updateControlIcon() {
        if (!this.musicControl) return;
        
        const icon = this.musicControl.querySelector('.music-icon');
        
        if (this.isPlaying) {
            icon.textContent = '🔊';
            this.musicControl.classList.add('playing');
            this.musicControl.classList.remove('muted');
        } else {
            icon.textContent = '🔇';
            this.musicControl.classList.remove('playing');
            this.musicControl.classList.add('muted');
        }
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // ... другие инициализации
    
    // Музыкальный плеер
    new WeddingMusicPlayer();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

/**
 * Initialize Yandex Map
 */
function initMap() {
    // Wait for Yandex Maps API to load
    if (typeof ymaps === 'undefined') {
        console.warn('Yandex Maps API not loaded');
        return;
    }

    ymaps.ready(() => {
        const mapContainer = document.getElementById('yandexMap');
        if (!mapContainer) return;

        // Create map
        const map = new ymaps.Map('yandexMap', {
            center: [55.711229, 52.394140], // Saint Petersburg coordinates (replace with your venue)
            zoom: 15,
            controls: ['zoomControl', 'fullscreenControl']
        });

        // Add placemark
        const placemark = new ymaps.Placemark(
            [55.711229, 52.394140], // Replace with your venue coordinates
            {
                hintContent: 'Ресторан Royal Beach',
                balloonContent: `
                    <div style="padding: 10px;">
                        <h3 style="margin: 0 0 10px 0; color: #dc91ff;">Орловский дровер</h3>
                        <p style="margin: 0;">Орловская улица, 209</p>
                        <p style="margin: 10px 0 0 0; font-size: 0.9em; color: #666;">
                            г. Набережные челны
                        </p>
                    </div>
                `
            },
            {
                preset: 'islands#pinkHeartIcon',
                iconColor: '#AAAAFF'
            }
        );

        map.geoObjects.add(placemark);

        // Handle "Open Map" button click
        const openMapBtn = document.getElementById('openMapBtn');
        //if (openMapBtn) {
        //    openMapBtn.addEventListener('click', (e) => {
        //        e.preventDefault();
                // Scroll to map
        //        mapContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Or open in new tab with full map
                // window.open('https://yandex.ru/maps/?pt=30.3351,59.9343&z=15&l=map', '_blank');
        //    });
        //}
    });
}

/**
 * Page Loader
 */
function initLoader() {
    const loader = document.getElementById('loader');
    
    if (loader) {
        // Hide loader after all resources are loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.classList.add('hidden');
                
                // Remove from DOM after transition
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
            }, 1000); // Minimum loading time for better UX
        });
    }
}



/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Handle RSVP button clicks
 */
function scrollToRSVP() {
    const rsvpSection = document.getElementById('rsvp');
    if (rsvpSection) {
        rsvpSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Add to window for global access
window.scrollToRSVP = scrollToRSVP;

// Attach to floating button
document.addEventListener('DOMContentLoaded', () => {
    const floatingBtn = document.getElementById('floatingRsvp');
    if (floatingBtn) {
        floatingBtn.addEventListener('click', scrollToRSVP);
    }
});