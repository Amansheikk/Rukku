// --- State Management ---
let page2NoCount = 0;

// --- DOM Elements ---
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const cursorGlow = document.getElementById('cursor-glow');
const particlesContainer = document.getElementById('particles-container');
const modal = document.getElementById('custom-modal');
const modalText = document.getElementById('modal-text');
const mainBg = document.getElementById('main-bg');
const stars = document.getElementById('stars');

// Page 2 specific elements
const btnYes2 = document.getElementById('btn-yes-2');
const btnNo2 = document.getElementById('btn-no-2');
const page2BtnsContainer = document.getElementById('page2-btns');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    startParticleEngine();
});

// --- Mouse Cursor Glow ---
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// --- Audio Management ---
let isMusicPlaying = false;
musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        bgMusic.play().catch(e => console.log("Audio play failed (browser policy)"));
        musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isMusicPlaying = !isMusicPlaying;
});

// --- Navigation & Page Transitions ---
function goToPage(pageId) {
    // Hide current active page
    const currentActive = document.querySelector('.page.active');
    if (currentActive) {
        currentActive.classList.remove('active');
    }

    // Small timeout for smooth CSS transition
    setTimeout(() => {
        const nextActive = document.getElementById(pageId);
        nextActive.classList.add('active');

        // Check if final page to trigger special effects
        if (pageId === 'pageFinal') {
            triggerFinalEffects();
        }
    }, 400); // 400ms delay matches CSS transition timing roughly
}

// --- Page 2 Logic ---
btnYes2.addEventListener('click', () => {
    // 1. Show the playful popup
    showModal("Itna jaldi toh call pe nahi maanti 😂❤️");
    
    // 2. Wait 2.5 seconds, then automatically close modal and move to Page 3
    setTimeout(() => {
        closeModal();
        goToPage('page3');
    }, 2500);
});

btnNo2.addEventListener('click', () => {
    page2NoCount++;
    
    if (page2NoCount >= 6) {
        // After the 6th NO click: Remove NO button, update YES button text
        btnNo2.classList.add('hidden');
        btnYes2.innerHTML = 'Yes ❤️';
    } else {
        // "Reload" feeling by shaking the card briefly for clicks 1 to 5
        const page2 = document.getElementById('page2');
        page2.style.transform = 'translateY(0) scale(0.98)';
        setTimeout(() => {
            page2.style.transform = 'translateY(0) scale(1)';
        }, 150);
    }
});

// --- Custom Modal ---
function showModal(text) {
    modalText.innerText = text;
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

// --- Particle Engine (Fireflies & Hearts) ---
function startParticleEngine() {
    setInterval(createParticle, 800);
}

function createParticle() {
    const particle = document.createElement('div');
    const isHeart = Math.random() > 0.6; // 40% chance of heart, 60% firefly

    particle.classList.add('particle');
    
    if (isHeart) {
        particle.innerHTML = '❤️';
        particle.style.fontSize = Math.random() * 15 + 10 + 'px';
    } else {
        particle.classList.add('firefly');
        const size = Math.random() * 4 + 2; // 2px to 6px
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
    }

    // Random positioning and timing
    particle.style.left = Math.random() * 100 + 'vw';
    const duration = Math.random() * 5 + 7; // 7s to 12s float time
    particle.style.animationDuration = duration + 's';

    particlesContainer.appendChild(particle);

    // Cleanup
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

// --- Final Page Cinematic Effects ---
function triggerFinalEffects() {
    // Change background to Sunset
    mainBg.classList.add('sunset');
    stars.classList.add('visible');
    
    // Change cursor and overall text colors to fit dark theme
    document.body.style.color = '#fff';
    musicToggle.style.color = '#fff';
    musicToggle.style.border = '1px solid rgba(255,255,255,0.3)';

    // Trigger Heart & Confetti Explosion
    createConfetti();
    
    // Increase heart particle spawn rate
    setInterval(() => {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.innerHTML = '❤️';
        p.style.fontSize = Math.random() * 20 + 15 + 'px';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.animationDuration = (Math.random() * 4 + 4) + 's';
        particlesContainer.appendChild(p);
        setTimeout(() => p.remove(), 8000);
    }, 300);
}

function createConfetti() {
    const colors = ['#ff758c', '#ffdde1', '#fff', '#ffd700'];
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Random shapes
            if (Math.random() > 0.5) confetti.style.borderRadius = '50%';
            
            const duration = Math.random() * 3 + 2;
            confetti.style.animationDuration = duration + 's';
            
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), duration * 1000);
        }, i * 50); // Stagger the explosion
    }
}
