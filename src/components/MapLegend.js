export class MapLegend {
  constructor(selector, keyboardManager) {
    this.container = document.querySelector(selector);
    this.legendList = this.container.querySelector('ul');
    this.showKeyButton = document.querySelector('#showKey');
    this.hideKeyButton = document.querySelector('#hideKey');
    this.keyboardManager = keyboardManager;
    
    // Initialize the legend
    this._initialize();
  }
  
  /**
   * Initialize the map legend with event handlers
   * @private
   */
  _initialize() {
    // Set initial styles
    this.container.style.userSelect = 'none';
    this.legendList.style.display = 'none';
    this.hideKeyButton.style.display = 'none';
    
    // Set up event handlers
    this._setupEventHandlers();
  }
  
  /**
   * Set up event handlers for the map legend
   * @private
   */
  _setupEventHandlers() {
    // Show legend event
    this.showKeyButton.addEventListener('click', (e) => {
      e.preventDefault();
      this._showLegend();
      this._trackCheat();
    });
    
    // Hide legend event
    this.hideKeyButton.addEventListener('click', (e) => {
      e.preventDefault();
      this._hideLegend();
    });
    
    // Click on legend list to hide
    this.legendList.addEventListener('click', () => {
      this._hideLegend();
    });
  }
  
  /**
   * Show the map legend
   * @private
   */
  _showLegend() {
    this.showKeyButton.style.display = 'none';
    this.hideKeyButton.style.display = 'block';
    
    this.legendList.style.display = 'block';
    
    this.container.classList.add('mapDark');
    
    // Blur the answer input to prevent accidental typing
    document.querySelector('input.answers').blur();
  }
  
  /**
   * Hide the map legend
   * @private
   */
  _hideLegend() {
    this.hideKeyButton.style.display = 'none';
    this.showKeyButton.style.display = 'block';
    
    this.legendList.style.display = 'none';
    this.container.classList.remove('mapDark');
    
    // Focus the answer input
    document.querySelector('input.answers').focus();
  }
  
  /**
   * Track when player uses the cheat (views the legend)
   * @private
   */
  _trackCheat() {
    let cheatCount = (this._cheatCount || 0) + 1;
    this._cheatCount = cheatCount;
    
    // Update cheat counters in the DOM
    document.getElementById('counter').textContent = 
      `Sifting in #TheLandOfFun. I cheated ${cheatCount} whole ${cheatCount === 1 ? 'time' : 'times'}`;
    
    document.querySelector('#leaderboard ul li.cheat').textContent = 
      `Cheated: ${cheatCount} ${cheatCount === 1 ? ' time' : ' times'}`;
  }
  
  /**
   * Mark a legend item as completed
   * @param {string} key - The key selector for the completed item
   */
  markCompleted(key) {
    const keyElement = document.querySelector(key);
    if (keyElement) {
      keyElement.style.textDecoration = 'line-through';
      
      const checkmark = document.createElement('span');
      checkmark.className = 'checkmark';
      checkmark.innerHTML = ' &#10003;';
      keyElement.appendChild(checkmark);
    }
  }
}
