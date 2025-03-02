export class GameStateManager {
  constructor(options) {
    // Store references to required objects
    this.container = options.container;
    this.amWin = options.amWin;
    this.mapKey = options.mapKey;
    this.counterManager = options.counterManager;
    this.audioManager = options.audioManager;
    this.scoreLedElement = options.scoreLedElement;
    this.finalScoreElement = options.finalScoreElement;
    
    // Game state
    this.score = 0;
    this.currentElement = null;
    this.currentSelector = null;
    this.currentKey = null;
  }
  
  getScore() {
    return this.score;
  }
  
  setScore(score) {
    this.score = score;
    if (this.scoreLedElement) {
      this.scoreLedElement.innerHTML = this.score;
    }
    return this.score;
  }
  
  incrementScore() {
    this.setScore(this.score + 1);
    return this.score;
  }
  
  setCurrentElement(element) {
    this.currentElement = element;
  }
  
  setCurrentSelector(selector) {
    this.currentSelector = selector;
  }
  
  setCurrentKey(key) {
    this.currentKey = key;
  }
  
  getCurrentElement() {
    return this.currentElement;
  }
  
  getCurrentSelector() {
    return this.currentSelector;
  }
  
  getCurrentKey() {
    return this.currentKey;
  }
  
  showWinScreen(overrideScore = null) {
    // If score is provided, update it
    if (overrideScore !== null) {
      this.setScore(overrideScore);
    }
    
    // Stop the counter
    this.counterManager.stop();
    
    // Show win screen
    this.amWin.classList.add("isVisible");
    
    // Hide the map key
    this.mapKey.style.display = "none";
    
    // Play win sound
    this.audioManager.handleGameWin();
    
    // Update final time
    const finalTimeElement = document.getElementById("finalTime");
    if (finalTimeElement) {
      finalTimeElement.textContent = this.counterManager.getFormattedTime();
    }
    
    return true;
  }
  
  hasWon() {
    return this.amWin.style.display !== "none";
  }
}
