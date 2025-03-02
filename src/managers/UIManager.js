import { scrollview } from '../utils/scrollView.js';

export class UIManager {
  constructor() {
    // Cache DOM elements
    this.container = document.getElementById("container");
    this.bootUp = document.getElementById("bootUp");
    this.playground = document.getElementById("playground");
    this.howToPlay = document.getElementById("how-to-play");
    this.instructions = document.querySelector("div.instructions");
    this.amWin = document.getElementById("amWin");
    this.mapKey = document.getElementById("mapKey");
    this.scoreLed = document.getElementById("score-led");
    this.finalScore = document.getElementById("finalScore");
    this.answerField = document.getElementById("answer-field");
    this.answersInput = document.querySelector("input.answers");

    // Initialize Scrollview
    scrollview(this.playground);
    
    // Initialize container display
    this.container.style.display = "block";
    this.bootUp.style.display = "none";
    this.amWin.style.display = "none";
    
    // Set up playground click handler for both mouse and touch
    this.playground.addEventListener('click', this._handlePlaygroundInteraction.bind(this));
    this.playground.addEventListener('touchend', this._handlePlaygroundInteraction.bind(this));
    
    // Prevent form submission
    document.querySelectorAll("form").forEach(form => {
      form.addEventListener('submit', e => e.preventDefault());
    });
    
    // Add touchend listener for game elements that need interaction
    document.querySelectorAll(".element").forEach(element => {
      element.addEventListener('touchend', (e) => {
        // Only process if it's a simple tap (not at the end of a scroll)
        if (!e.target.dataset.scrolling) {
          this._showAnswerInput(e);
          e.preventDefault();
        }
      });
    });
    
    // Add social button handlers
    this._addSocialButtonHandlers();
  }
  
  _handlePlaygroundInteraction(e) {
    // Hide how-to-play regardless of event type
    this.howToPlay.style.display = "none";
    
    // If it's a touch event, ensure we focus on the input if needed
    if (e.type === 'touchend') {
      // Find if we're touching an element that should show the answer input
      const elementUnderTouch = document.elementFromPoint(
        e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
        e.changedTouches ? e.changedTouches[0].clientY : e.clientY
      );
      
      if (elementUnderTouch && elementUnderTouch.classList.contains('element')) {
        this._showAnswerInput(e);
      }
    }
    
    return false;
  }
  
  _showAnswerInput(e) {
    // Show score div/answer field
    const score = document.getElementById("score");
    if (score) {
      score.style.display = "block";
    }
    
    // Focus the answer input
    this.focusAnswerInput();
    
    // Center the input field on the screen
    this._centerInputOnScreen(e);
  }
  
  /**
   * Centers the entire #score div on the screen by scrolling the playground with a custom slower animation
   * @param {Event} e - The event that triggered showing the input
   * @private
   */
  _centerInputOnScreen(e) {
    // Get position info for score/input container
    const score = document.getElementById("score");
    const scoreRect = score.getBoundingClientRect();
    
    // Get viewport dimensions
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Calculate where we want to scroll to center the input both horizontally and vertically
    const targetScrollTop = this.playground.scrollTop + scoreRect.top - (viewportHeight / 2) + (scoreRect.height / 2);
    const targetScrollLeft = this.playground.scrollLeft + scoreRect.left - (viewportWidth / 2) + (scoreRect.width / 2);
    
    // Starting position
    const startScrollTop = this.playground.scrollTop;
    const startScrollLeft = this.playground.scrollLeft;
    
    // Distance to travel
    const distanceTop = targetScrollTop - startScrollTop;
    const distanceLeft = targetScrollLeft - startScrollLeft;
    
    // Animation parameters
    const duration = 1000;
    const startTime = performance.now();
    
    // Animation function
    const animateScroll = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      
      if (elapsedTime < duration) {
        // Calculate progress (0 to 1) with easing for smoother motion
        const progress = this._easeInOutCubic(elapsedTime / duration);
        
        // Apply the new scroll position
        this.playground.scrollTop = startScrollTop + distanceTop * progress;
        this.playground.scrollLeft = startScrollLeft + distanceLeft * progress;
        
        // Continue animation
        requestAnimationFrame(animateScroll);
      } else {
        // Ensure we end exactly at the target position
        this.playground.scrollTop = targetScrollTop;
        this.playground.scrollLeft = targetScrollLeft;
      }
    };
    
    // Start the animation
    requestAnimationFrame(animateScroll);
  }
  
  /**
   * Cubic easing function for smoother animation
   * @param {number} t - Progress value between 0 and 1
   * @returns {number} Eased value
   * @private
   */
  _easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  // Add click handlers to social buttons
  _addSocialButtonHandlers() {
    const socialButtons = document.querySelectorAll('.social-button');
    
    socialButtons.forEach(button => {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        alert('Social sharing disabled');
      });
    });
    
    return socialButtons.length;
  }
  
  getContainer() { return this.container; }
  getWinScreen() { return this.amWin; }
  getMapKey() { return this.mapKey; }
  getScoreLed() { return this.scoreLed; }
  getFinalScore() { return this.finalScore; }
  
  resetAnswerField() {
    const answerField = document.getElementById("answer-field");
    const score = document.getElementById("score");
    const answersInput = document.querySelector("input.answers");
    
    answerField.value = "";
    score.style.display = "block";
    answersInput.focus();
    answersInput.value = "";
    
    // Re-center the input when resetting
    this._centerInputOnScreen();
  }
  
  focusAnswerInput() {
    const answersInput = document.querySelector("input.answers");
    if (answersInput) {
      answersInput.focus();
      
      // On mobile, this may help ensure keyboard appears
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        setTimeout(() => {
          answersInput.click();
          answersInput.focus();
        }, 100);
      }
    }
  }
}