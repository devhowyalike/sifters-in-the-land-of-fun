import { timeFromSeconds } from '../utils/utils.js';

/**
 * Manages the game timer/counter functionality
 */
export class CounterManager {
  /**
   * Creates a new CounterManager instance
   * @param {Object} options - Configuration options
   * @param {string} options.counterSelector - Selector for the counter display element
   * @param {string} options.leaderboardTimeSelector - Selector for the leaderboard time element
   */
  constructor(options = {}) {
    this.options = {
      counterSelector: '#displayCounter',
      leaderboardTimeSelector: '#leaderboard ul li.time',
      ...options
    };
    
    this.counterInterval = null;
    this.seconds = 0;
    this.isRunning = false;
    this.displayCounter = null;
    this.leaderboardTime = null;
    
    // Initialize elements
    this.initElements();
  }
  
  /**
   * Initialize DOM elements
   */
  initElements() {
    this.displayCounter = document.querySelector(this.options.counterSelector);
    this.leaderboardTime = document.querySelector(this.options.leaderboardTimeSelector);
  }
  
  /**
   * Start the counter
   * @returns {CounterManager} This instance for chaining
   */
  start() {
    if (this.isRunning) {
      return this;
    }
    
    this.seconds = 0;
    this.isRunning = true;
    this.updateDisplay();
    
    this.counterInterval = setInterval(() => {
      this.seconds++;
      this.updateDisplay();
    }, 1000);
    
    return this;
  }
  
  /**
   * Stop the counter
   * @returns {CounterManager} This instance for chaining
   */
  stop() {
    if (!this.isRunning) {
      return this;
    }
    
    clearInterval(this.counterInterval);
    this.counterInterval = null;
    this.isRunning = false;
    
    return this;
  }
  
  /**
   * Reset the counter to zero
   * @returns {CounterManager} This instance for chaining
   */
  reset() {
    this.seconds = 0;
    this.updateDisplay();
    return this;
  }
  
  /**
   * Update the display elements with the current time
   */
  updateDisplay() {
    if (this.displayCounter) {
      this.displayCounter.innerHTML = this.seconds;
      timeFromSeconds(this.displayCounter);
    }
    
    if (this.leaderboardTime) {
      this.leaderboardTime.innerHTML = this.seconds;
      timeFromSeconds(this.leaderboardTime);
    }
  }
  
  /**
   * Get the current time in seconds
   * @returns {number} Current time in seconds
   */
  getTime() {
    return this.seconds;
  }
  
  /**
   * Get formatted time string (MM:SS)
   * @returns {string} Formatted time
   */
  getFormattedTime() {
    const minutes = Math.floor(this.seconds / 60);
    const seconds = this.seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

export default CounterManager;
