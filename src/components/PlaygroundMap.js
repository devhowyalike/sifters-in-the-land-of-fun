import { mapConfig } from '../data/mapConfig.js';
import { ResponsiveImageMap } from './ResponsiveImageMap.js';

export class PlaygroundMap {
  constructor(selector, gameState, resetAnswerFieldCallback) {
    this.container = document.querySelector(selector);
    this.gameState = gameState;
    this.resetAnswerField = resetAnswerFieldCallback;
    
    // Initialize the responsive map
    this.responsiveMap = new ResponsiveImageMap();
    
    // Calculate and set initial scale factor
    this._updateScaleFactor();
    
    // Set up the map click handlers
    this._setupMapClickHandlers();
    
    // Set up window resize handler
    this._setupResizeHandler();
  }
  
  _setupMapClickHandlers() {
    Object.entries(mapConfig).forEach(([selector, config]) => {
      const element = document.querySelector(selector);
      if (element) {
        element.addEventListener('click', (event) => {
          // Prevent default navigation behavior
          event.preventDefault();
          
          const scoreElement = document.getElementById("score");
          
          // Get scaled position based on current layout
          const scaledPosition = this._getScaledPosition(config.scorePosition);
          scoreElement.style.top = scaledPosition.top;
          scoreElement.style.left = scaledPosition.left;
          
          this.gameState.setCurrentElement(config.element);
          this.gameState.setCurrentKey(config.key);
          this.gameState.setCurrentSelector(selector);
          this.resetAnswerField();
          
          // Ensure score display is visible
          scoreElement.style.display = "block";
          
          // Update scale factor for form elements
          this._updateScaleFactor();
          
          // Create and position OK mark
          const okImage = this._createOkMark();
          const scaledOkPosition = this._getScaledPosition(config.okPosition);
          okImage.style.top = scaledOkPosition.top;
          okImage.style.left = scaledOkPosition.left;
          
          // Store original position data as attributes for rescaling
          okImage.setAttribute('data-orig-top', config.okPosition.top);
          okImage.setAttribute('data-orig-left', config.okPosition.left);
        });
      }
    });
  }
  
  /**
   * Set up window resize handler
   */
  _setupResizeHandler() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Update UI positions
        this._updateUIPositions();
        
        // Update scale factor for form elements
        this._updateScaleFactor();
        
        // Force update of OK mark positions
        this._updateOkMarkPositions();
      }, 250); // Debounce resize event
    });
  }
  
  /**
   * Specifically update OK mark positions based on image scaling
   */
  _updateOkMarkPositions() {
    const okElements = document.querySelectorAll('.ok');
    okElements.forEach(okElement => {
      if (okElement.style.display !== 'none') {
        // Get original position data stored in attributes
        const origTop = okElement.getAttribute('data-orig-top');
        const origLeft = okElement.getAttribute('data-orig-left');
        
        if (origTop && origLeft) {
          // Scale position based on current playground size
          const scaledPosition = this._getScaledPosition({
            top: origTop,
            left: origLeft
          });
          
          okElement.style.top = scaledPosition.top;
          okElement.style.left = scaledPosition.left;
        } else {
          // Fallback if no stored position data
          // Try to find the area this OK mark belongs to
          const areaElement = okElement.previousElementSibling;
          if (areaElement && areaElement.id) {
            const selector = `#${areaElement.id}`;
            const config = mapConfig[selector];
            if (config) {
              const scaledPosition = this._getScaledPosition(config.okPosition);
              okElement.style.top = scaledPosition.top;
              okElement.style.left = scaledPosition.left;
              
              // Store for future rescaling
              okElement.setAttribute('data-orig-top', config.okPosition.top);
              okElement.setAttribute('data-orig-left', config.okPosition.left);
            }
          }
        }
      }
    });
  }
  
  /**
   * Calculate and update the CSS scale factor variable
   */
  _updateScaleFactor() {
    const playground = document.getElementById('playground');
    if (!playground) return;
    
    // Original reference size (800x600)
    const originalWidth = 800;
    const originalHeight = 600;
    
    // Current size
    const currentWidth = playground.offsetWidth;
    const currentHeight = playground.offsetHeight;
    
    // Calculate scale factors
    const scaleX = currentWidth / originalWidth;
    const scaleY = currentHeight / originalHeight;
    
    // Use the smaller of the two to ensure everything fits
    const scaleFactor = Math.min(scaleX, scaleY);
    
    // Set CSS variable
    document.documentElement.style.setProperty('--scale-factor', scaleFactor.toString());
    
    return { scaleX, scaleY, scaleFactor };
  }
  
  /**
   * Scale position values based on current playground size
   */
  _getScaledPosition(position) {
    const playground = document.getElementById('playground');
    if (!playground) return position;
    
    // Original reference size (800x600)
    const originalWidth = 800;
    const originalHeight = 600;
    
    // Current size
    const currentWidth = playground.offsetWidth;
    const currentHeight = playground.offsetHeight;
    
    // Calculate scale factors
    const scaleX = currentWidth / originalWidth;
    const scaleY = currentHeight / originalHeight;
    
    // Parse original values
    const topValue = parseInt(position.top);
    const leftValue = parseInt(position.left);
    
    // Scale the values
    return {
      top: `${Math.round(topValue * scaleY)}px`,
      left: `${Math.round(leftValue * scaleX)}px`
    };
  }
  
  /**
   * Update UI positions based on current scale
   */
  _updateUIPositions() {
    // Update score position if visible
    const scoreElement = document.getElementById("score");
    if (scoreElement && scoreElement.style.display !== 'none') {
      const currentSelector = this.gameState.getCurrentSelector();
      if (currentSelector) {
        const config = mapConfig[currentSelector];
        if (config) {
          const scaledPosition = this._getScaledPosition(config.scorePosition);
          scoreElement.style.top = scaledPosition.top;
          scoreElement.style.left = scaledPosition.left;
        }
      }
    }
    
    // Update OK marks with dedicated method
    this._updateOkMarkPositions();
  }
  
  _createOkMark() {
    const element = document.querySelector(this.gameState.getCurrentSelector());
    const okImage = document.createElement('img');
    okImage.className = 'ok';
    okImage.src = '/assets/images/ok.gif';
    element.insertAdjacentElement('afterend', okImage);
    return okImage;
  }
}