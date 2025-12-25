// ============================================
// ASKera Design - Christmas Magic 🎄
// Festive JavaScript Animations & Effects
// ============================================

'use strict';

// ============================================
// CONFIGURATION
// ============================================
const CHRISTMAS_CONFIG = {
    snowflakeCount: 80,
    lightBulbCount: 25,
    welcomeModalDuration: 5000, // Auto-hide after 5 seconds if not clicked
    showWelcomeModal: true
};

// ============================================
// WELCOME MODAL - "MERRY CHRISTMAS"
// ============================================
function createWelcomeModal() {
    // Only show on homepage (index.html or root)
    const currentPath = window.location.pathname.toLowerCase();
    const isHomepage = currentPath.endsWith('index.html') || 
                       currentPath.endsWith('/') || 
                       currentPath === '' ||
                       currentPath.endsWith('index.htm');
    
    if (!isHomepage) {
        return; // Don't show modal on other pages
    }
    
    // Check if already shown (use localStorage for persistence across sessions)
    const hasSeenWelcome = localStorage.getItem('christmas_welcome_2026_shown');
    
    if (hasSeenWelcome) {
        return; // Don't show again if already seen
    }
    
    const modal = document.createElement('div');
    modal.className = 'christmas-welcome-modal';
    modal.id = 'christmasWelcome';
    
    modal.innerHTML = `
        <div class="welcome-content">
            <span class="welcome-tree">🎄</span>
            <h1 class="welcome-title">Merry Christmas</h1>
            <p class="welcome-subtitle">& Happy New Year 2026!</p>
            <div class="welcome-decorations">
                🎁 ❄️ ⭐ 🔔 🎅 ☃️ 🦌 ✨
            </div>
            <button class="enter-site-btn" onclick="closeWelcomeModal()">
                <span>✨ Enter & Celebrate ✨</span>
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add escape key listener
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeWelcomeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function closeWelcomeModal() {
    const modal = document.getElementById('christmasWelcome');
    if (modal) {
        modal.classList.add('hidden');
        // Mark as shown in localStorage (persists across sessions)
        localStorage.setItem('christmas_welcome_2026_shown', 'true');
        // Remove after animation
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 1000);
    }
    
    // Play jingle sound effect (optional)
    playJingleSound();
}

// ============================================
// SNOWFALL ANIMATION
// ============================================
function createSnowfall() {
    const container = document.createElement('div');
    container.className = 'snowfall-container';
    container.id = 'snowfallContainer';
    document.body.appendChild(container);
    
    for (let i = 0; i < CHRISTMAS_CONFIG.snowflakeCount; i++) {
        createSnowflake(container, i);
    }
}

function createSnowflake(container, index) {
    const snowflake = document.createElement('span');
    snowflake.className = 'snowflake';
    
    // Random snowflake character
    const snowflakeChars = ['❄', '❅', '❆', '✻', '✼', '❉', '✿', '❋'];
    snowflake.textContent = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
    
    // Size variation
    const sizeClass = ['small', '', 'large'][Math.floor(Math.random() * 3)];
    if (sizeClass) snowflake.classList.add(sizeClass);
    
    // Random position and animation
    const startX = Math.random() * 100;
    const duration = 5 + Math.random() * 15; // 5-20 seconds
    const delay = Math.random() * 10;
    
    snowflake.style.cssText = `
        left: ${startX}vw;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        opacity: ${0.4 + Math.random() * 0.6};
    `;
    
    container.appendChild(snowflake);
    
    // Recreate snowflake when animation ends
    snowflake.addEventListener('animationend', () => {
        snowflake.remove();
        createSnowflake(container, index);
    });
}

// ============================================
// CHRISTMAS LIGHTS
// ============================================
function createChristmasLights() {
    const lightsContainer = document.createElement('div');
    lightsContainer.className = 'christmas-lights';
    lightsContainer.id = 'christmasLights';
    
    const wire = document.createElement('div');
    wire.className = 'lights-wire';
    lightsContainer.appendChild(wire);
    
    const colors = ['red', 'green', 'gold', 'blue', 'white'];
    const bulbSpacing = 100 / CHRISTMAS_CONFIG.lightBulbCount;
    
    for (let i = 0; i < CHRISTMAS_CONFIG.lightBulbCount; i++) {
        const bulb = document.createElement('div');
        const colorIndex = i % colors.length;
        bulb.className = `light-bulb ${colors[colorIndex]}`;
        bulb.style.left = `${i * bulbSpacing + (bulbSpacing / 2)}%`;
        
        // Slight random offset for natural look
        const yOffset = Math.sin(i * 0.5) * 5;
        bulb.style.top = `${20 + yOffset}px`;
        
        wire.appendChild(bulb);
    }
    
    document.body.appendChild(lightsContainer);
}

// ============================================
// CHRISTMAS CORNER DECORATIONS
// ============================================
function createCornerDecorations() {
    const corners = [
        { class: 'top-left', emoji: '🎄' },
        { class: 'top-right', emoji: '⭐' },
        { class: 'bottom-left', emoji: '🎁' },
        { class: 'bottom-right', emoji: '☃️' }
    ];
    
    corners.forEach(corner => {
        const decoration = document.createElement('div');
        decoration.className = `christmas-corner ${corner.class}`;
        decoration.textContent = corner.emoji;
        document.body.appendChild(decoration);
    });
}

// ============================================
// FLOATING ORNAMENTS (Optional Enhancement)
// ============================================
function createFloatingOrnaments() {
    const ornamentContainer = document.createElement('div');
    ornamentContainer.className = 'christmas-ornaments';
    
    const ornaments = ['🎄', '⭐', '🔔', '🎅', '🦌', '❄️', '🎁', '🕯️'];
    const count = 8;
    
    for (let i = 0; i < count; i++) {
        const ornament = document.createElement('div');
        ornament.className = 'ornament';
        ornament.textContent = ornaments[i % ornaments.length];
        ornament.style.cssText = `
            left: ${10 + (i * 12)}%;
            top: ${Math.random() * 30 + 10}%;
            font-size: ${1.5 + Math.random()}rem;
            animation-delay: ${i * 0.5}s;
            opacity: ${0.2 + Math.random() * 0.3};
        `;
        ornamentContainer.appendChild(ornament);
    }
    
    document.body.appendChild(ornamentContainer);
}

// ============================================
// CURSOR SPARKLE EFFECT
// ============================================
function initCursorSparkle() {
    let lastSparkle = 0;
    const sparkleThrottle = 80; // ms between sparkles
    
    document.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastSparkle < sparkleThrottle) return;
        lastSparkle = now;
        
        if (Math.random() > 0.7) { // 30% chance to create sparkle
            createSparkle(e.clientX, e.clientY);
        }
    });
}

function createSparkle(x, y) {
    const sparkle = document.createElement('span');
    const sparkleChars = ['✨', '⭐', '❄', '✦'];
    sparkle.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
    
    sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        font-size: ${0.8 + Math.random() * 0.8}rem;
        pointer-events: none;
        z-index: 99999;
        animation: sparkleAnim 1s ease-out forwards;
        color: ${['#FFD700', '#C41E3A', '#2D8E5A', '#FFFFFF'][Math.floor(Math.random() * 4)]};
    `;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAnim {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 0.8;
        }
        100% {
            transform: scale(0) rotate(360deg) translateY(-30px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(sparkleStyle);

// ============================================
// JINGLE SOUND EFFECT (Optional)
// ============================================
function playJingleSound() {
    // Create a simple audio context for a bell sound
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
        oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        // Audio not supported or blocked
        console.log('Audio playback not available');
    }
}

// ============================================
// FESTIVE TEXT EFFECTS
// ============================================
function addFestiveEffects() {
    // Add Santa hats to specific elements
    const elementsToDecorate = document.querySelectorAll('.logo');
    elementsToDecorate.forEach(el => {
        el.classList.add('has-santa-hat');
    });
    
    // Add candy cane border to sections
    const sections = document.querySelectorAll('.section-header');
    sections.forEach(section => {
        section.classList.add('candy-cane-border');
    });
}

// ============================================
// CHRISTMAS GREETING CONSOLE LOG
// ============================================
function christmasConsoleGreeting() {
    console.log('%c🎄 Merry Christmas from ASKera Design! 🎄', 
        'color: #C41E3A; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 0 #2D8E5A;');
    console.log('%c⭐ Wishing you a wonderful holiday season! ⭐', 
        'color: #FFD700; font-size: 16px;');
    console.log('%c🎁 May your designs be merry and bright! 🎁', 
        'color: #2D8E5A; font-size: 14px;');
}

// ============================================
// DYNAMIC HEADER CHRISTMAS MESSAGE
// ============================================
function addChristmasHeader() {
    // Create a festive banner just below the navbar
    const banner = document.createElement('div');
    banner.className = 'christmas-banner';
    banner.innerHTML = `
        <div class="banner-content">
            <span class="banner-emoji">🎄</span>
            <span class="banner-text">Season's Greetings from ASKera Design!</span>
            <span class="banner-emoji">⭐</span>
        </div>
    `;
    
    // Add styles for the banner
    const bannerStyles = document.createElement('style');
    bannerStyles.textContent = `
        .christmas-banner {
            background: linear-gradient(90deg, #C41E3A, #165B33, #C41E3A);
            background-size: 200% 100%;
            animation: bannerGradient 5s ease infinite;
            padding: 10px 0;
            text-align: center;
            position: relative;
            z-index: 90;
            overflow: hidden;
        }
        
        .christmas-banner::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            animation: bannerShine 3s infinite;
        }
        
        @keyframes bannerGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        @keyframes bannerShine {
            0% { left: -100%; }
            100% { left: 100%; }
        }
        
        .banner-content {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        }
        
        .banner-text {
            font-family: 'Mountains of Christmas', cursive;
            font-size: 1.2rem;
            color: #FFF8F0;
            text-shadow: 0 0 10px rgba(255,215,0,0.5);
        }
        
        .banner-emoji {
            font-size: 1.5rem;
            animation: emojiPop 1s ease-in-out infinite alternate;
        }
        
        @keyframes emojiPop {
            0% { transform: scale(1); }
            100% { transform: scale(1.2); }
        }
        
        @media (max-width: 768px) {
            .banner-text {
                font-size: 0.9rem;
            }
        }
    `;
    
    document.head.appendChild(bannerStyles);
    
    // Insert after navbar
    const navbar = document.querySelector('.navbar');
    if (navbar && navbar.parentNode) {
        navbar.parentNode.insertBefore(banner, navbar.nextSibling);
    }
}

// ============================================
// SNOW CONTROL TOGGLE (Optional)
// ============================================
function createSnowToggle() {
    const toggle = document.createElement('button');
    toggle.className = 'snow-toggle-btn';
    toggle.innerHTML = '❄️';
    toggle.title = 'Toggle Snow';
    
    const toggleStyles = document.createElement('style');
    toggleStyles.textContent = `
        .snow-toggle-btn {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #165B33, #2D8E5A);
            border: 2px solid #FFD700;
            font-size: 1.5rem;
            cursor: pointer;
            z-index: 100;
            transition: all 0.3s ease;
            box-shadow: 0 0 15px rgba(255, 215, 0, 0.4);
        }
        
        .snow-toggle-btn:hover {
            transform: scale(1.1);
            box-shadow: 0 0 25px rgba(255, 215, 0, 0.7);
        }
        
        .snow-toggle-btn.snow-off {
            opacity: 0.5;
            background: linear-gradient(135deg, #333, #555);
        }
    `;
    
    document.head.appendChild(toggleStyles);
    
    let snowEnabled = true;
    toggle.addEventListener('click', () => {
        const snowContainer = document.getElementById('snowfallContainer');
        if (snowContainer) {
            snowEnabled = !snowEnabled;
            snowContainer.style.display = snowEnabled ? 'block' : 'none';
            toggle.classList.toggle('snow-off', !snowEnabled);
        }
    });
    
    document.body.appendChild(toggle);
}

// ============================================
// INITIALIZE ALL CHRISTMAS EFFECTS
// ============================================
function initChristmasMagic() {
    christmasConsoleGreeting();
    createWelcomeModal();
    createSnowfall();
    createChristmasLights();
    createCornerDecorations();
    createFloatingOrnaments();
    initCursorSparkle();
    addFestiveEffects();
    addChristmasHeader();
    createSnowToggle();
}

// ============================================
// DOM READY INITIALIZATION
// ============================================
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChristmasMagic);
} else {
    initChristmasMagic();
}

// Export for global access if needed
window.closeWelcomeModal = closeWelcomeModal;
window.christmasConfig = CHRISTMAS_CONFIG;
