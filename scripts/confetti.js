/**
 * confetti.js
 * Confetti cannon and floating ambient particles
 */

class CelebrationManager {
  constructor() {
    this.ambientContainer = document.getElementById('ambientHearts');
    this.ambientInterval = null;
    this.initAmbient();
  }

  // Periodic slow floating cute hearts in the background
  initAmbient() {
    if (!this.ambientContainer) return;

    const hearts = ['💖', '🌸', '✨', '💕', '🌷', '🎀'];

    const spawnHeart = () => {
      const heart = document.createElement('div');
      heart.className = 'floating-heart-item';
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = `${Math.random() * 95}vw`;
      heart.style.animationDuration = `${5 + Math.random() * 5}s`;
      heart.style.fontSize = `${16 + Math.random() * 14}px`;

      this.ambientContainer.appendChild(heart);

      setTimeout(() => {
        if (heart.parentNode) heart.parentNode.removeChild(heart);
      }, 10000);
    };

    // Spawn heart every 2.5 seconds
    this.ambientInterval = setInterval(spawnHeart, 2500);
    spawnHeart();
  }

  // Explosive celebratory confetti sequence
  fireCelebration() {
    if (typeof confetti !== 'function') return;

    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#F67280', '#89C79B', '#F8B195', '#F3B755', '#E05656', '#C06C84']
    };

    const fire = (particleRatio, opts) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    };

    // Burst 1: Quick burst
    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    // Burst 2: Wide spread
    fire(0.2, {
      spread: 60,
    });

    // Burst 3: Heavy shower
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });

    // Burst 4: Sparkles
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });

    // Burst 5: Final pop
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });

    // Side cannons after 300ms
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: defaults.colors
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: defaults.colors
      });
    }, 350);
  }
}

window.celebrationManager = new CelebrationManager();
