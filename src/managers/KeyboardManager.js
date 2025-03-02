import { ShowCredits } from '../components/ShowCredits.js';

const scoreElement = document.getElementById('score');

export class KeyboardManager {
  constructor(options = {}) {
    this.gameState = options.gameState;
    this.disabled = false;
    
    // Konami code tracking
    this.konamiSequence = [];
    this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
                      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
                      'b', 'a', 'Enter'];
    
    // BFG code tracking
    this.bfgSequence = [];
    this.bfgCode = ['b', 'f', 'g'];
    
    // Bind methods
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    
    // Initialize
    this.init();
  }

  init() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keypress', this.handleKeyPress);
  }

  handleKeyDown(event) {
    if (this.disabled) return;
    
    const key = event.key.toLowerCase();
    
    // Handle key combo to toggle audio playback (pause/play)
    if ((key === 'p' || key === 'm') && event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey) {
      // Make sure we're not in an input field
      if (!(event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA')) {
        // Use the existing togglePlayback method in AudioManager
        if (this.gameState && this.gameState.audioManager) {
          this.gameState.audioManager.togglePlayback();
        }
        event.preventDefault();
        return;
      }
    }
    
    // Handle ESC key to close answer-field
    if (key === 'escape') {
      const answerField = document.getElementById('answer-field');
      if (answerField && document.activeElement === answerField) {
        answerField.blur();
        
        // Also hide the score div
        if (scoreElement) {
          scoreElement.style.display = 'none';
        }
        
        event.preventDefault();
        return;
      }
    }

    // Konami code detection
    this.konamiSequence.push(key);
    if (this.konamiSequence.length > this.konamiCode.length) {
      this.konamiSequence.shift();
    }
    
    // Check if Konami code is entered
    if (this.konamiSequence.length === this.konamiCode.length && 
        this.konamiSequence.every((k, index) => k === this.konamiCode[index].toLowerCase())) {
      this.konamiSequence = [];
      this.loadCredits();
    }
    
    // BFG code detection
    this.bfgSequence.push(key);
    if (this.bfgSequence.length > this.bfgCode.length) {
      this.bfgSequence.shift();
    }
    
    // Check if BFG code is entered
    if (this.bfgSequence.length === this.bfgCode.length && 
        this.bfgSequence.every((k, index) => k === this.bfgCode[index])) {
      this.bfgSequence = [];
      
      // Hide the answer field when BFG code is activated
      const answerField = document.getElementById('answer-field');
      if (answerField) {
        answerField.style.display = 'none';
      }
      
      // Also hide the score div
      if (scoreElement) {
        scoreElement.style.display = 'none';
      }
      
      // Show win screen instead of credits
      if (this.gameState && !this.gameState.hasWon()) {
        // Pass a score of 9 to the win screen
        this.gameState.showWinScreen(9);
        console.log('BFG cheat code activated! Win screen displayed and answer field hidden.');
      }
    }
  }

  handleKeyPress(event) {
    if (event.target.classList.contains('answers') &&
       ((event.which && event.which === 13) || (event.keyCode && event.keyCode === 13))) {
      document.querySelector("input.submit").click();
      event.preventDefault();
    }
  }

  loadCredits() {
    // Get the OST audio element that's passed to ShowCredits
    const ost = document.querySelector('audio');
    
    // Pause any playing audio
    if (this.gameState && this.gameState.audioManager) {
      this.gameState.audioManager.pause();
    }
    
    // Show credits
    const credits = new ShowCredits();
    credits.show(ost);
  }

  cleanup() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keypress', this.handleKeyPress);
  }
}