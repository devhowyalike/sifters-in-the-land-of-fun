import { blink } from '../utils/utils.js';

export class BootScreen {
  constructor(selector) {
    this.element = document.querySelector(selector);
    this.bootText = document.querySelector('.bootup-text');
  }

  /**
   * Start the boot screen animation sequence
   */
  start() {
    // Make sure the boot screen is visible
    this.element.style.display = 'block';
    
    // Apply the blinking effect to the boot text
    blink(this.bootText, { blinks: [50] });
  }
  
  /**
   * Hide the boot screen
   */
  hide() {
    this.element.style.display = 'none';
  }
}
