/**
 * flower.js
 * Controls the blooming stages of the SVG flower illustration
 */

class FlowerManager {
  constructor() {
    this.container = document.getElementById('flowerArea');
    this.petalsGroup = document.getElementById('petalsGroup');
    this.currentLevel = 0;
  }

  updateBloom(dodgeCount) {
    if (!this.container) return;

    // Cap bloom stages between 0 and 5
    const stage = Math.min(dodgeCount, 5);
    this.currentLevel = stage;
    this.container.dataset.bloom = stage;

    // Subtle flower wobble/bloom bounce animation
    if (this.petalsGroup) {
      this.petalsGroup.style.transform = `scale(${1 + stage * 0.06}) rotate(${stage * 8}deg)`;
    }
  }

  reset() {
    this.currentLevel = 0;
    if (this.container) {
      this.container.dataset.bloom = 0;
    }
    if (this.petalsGroup) {
      this.petalsGroup.style.transform = 'scale(1) rotate(0deg)';
    }
  }
}

window.flowerManager = new FlowerManager();
