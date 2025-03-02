// ResponsiveImageMap.js
export class ResponsiveImageMap {
  constructor() {
    // Original image dimensions that the coordinates are based on
    this.originalWidth = 2200;
    this.originalHeight = 2200; // Assuming it's square based on the CSS width: 275%
    
    // Store the original map coordinates
    this.originalCoords = this.getOriginalCoords();
    
    // Set up resize handler
    this.setupResizeHandler();
    
    // Initial calculation
    this.updateCoordinates();
  }
  
  /**
   * Get the original coordinates from the map areas
   */
  getOriginalCoords() {
    const areas = document.querySelectorAll('map[name="map"] area');
    const originalCoords = {};
    
    areas.forEach(area => {
      originalCoords[area.id] = {
        shape: area.getAttribute('shape'),
        coords: area.getAttribute('coords').split(',').map(Number)
      };
    });
    
    return originalCoords;
  }
  
  /**
   * Calculate scaling factors based on current image size
   */
  getScalingFactors() {
    const img = document.querySelector('#playground img.bg');
    if (!img) return { scaleX: 1, scaleY: 1 };
    
    const currentWidth = img.offsetWidth;
    const currentHeight = img.offsetHeight;
    
    return {
      scaleX: currentWidth / this.originalWidth,
      scaleY: currentHeight / this.originalHeight
    };
  }
  
  /**
   * Update the coordinates of all map areas
   */
  updateCoordinates() {
    const { scaleX, scaleY } = this.getScalingFactors();
    const areas = document.querySelectorAll('map[name="map"] area');
    
    areas.forEach(area => {
      if (!this.originalCoords[area.id]) return;
      
      const original = this.originalCoords[area.id].coords;
      const scaled = original.map((coord, index) => {
        // Even indices (0, 2, 4, ...) are X coordinates
        // Odd indices (1, 3, 5, ...) are Y coordinates
        return Math.round(coord * (index % 2 === 0 ? scaleX : scaleY));
      });
      
      area.setAttribute('coords', scaled.join(','));
    });
  }
  
  /**
   * Set up window resize event handler
   */
  setupResizeHandler() {
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this.updateCoordinates();
      }, 250); // Debounce resize event
    });
  }
  
  /**
   * Initialize this handler at the appropriate time
   */
  static init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        new ResponsiveImageMap();
      });
    } else {
      new ResponsiveImageMap();
    }
  }
}