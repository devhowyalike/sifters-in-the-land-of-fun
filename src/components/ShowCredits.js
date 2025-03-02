import creditsHtml from '../assets/partials/credits.js';

/**
 * ShowCredits class to handle the credits animation sequence
 */
export class ShowCredits {
  constructor() {
    this.creditAnimations = [
      [0, 1],
      [0, 500],
      [0, 1],
      [0, 100],
      [0.5, 10],
      [0, 300],
      [0.6, 100],
      [0, 200],
      [1, 100],
      [0, 100],
      [0.3, 100],
      [1, 10],
      [1, 5000]
    ];
    
    // Check if audio is supported
    this.canPlayAudio = !!document.createElement("audio").canPlayType;
  }
  
  /**
   * Animate credits with a sequence of opacity changes
   * @param {HTMLElement} element - The element to animate
   * @param {Array} animations - Array of [opacity, duration] pairs
   */
  animateCredits(element, animations) {
    let index = 0;
    
    const animate = () => {
      if (index >= animations.length) return;
      
      const [opacity, duration] = animations[index];
      
      element.animate(
        [{ opacity: element.style.opacity || 1 }, { opacity }],
        { duration, fill: "forwards" }
      ).onfinish = () => {
        element.style.opacity = opacity;
        index++;
        animate();
      };
    };
    
    animate();
  }
  
  /**
   * Load and display credits
   * @param {HTMLAudioElement} audioElement - The game's audio element to control
   */
  show(audioElement = null) {
    // Pause audio if available
    if (this.canPlayAudio && audioElement) {
      audioElement.pause();
    }
    
    const container = document.getElementById("container");
    if (container) {
      container.innerHTML = creditsHtml;
      
      const credits = document.getElementById("credits");
      if (!credits) return Promise.resolve(false);
      
      credits.insertAdjacentHTML('afterbegin', "<span></span>");
      const neoGeoBootUp = document.getElementById("neoGeoBootUp");
      
      setTimeout(() => {
        if (this.canPlayAudio && neoGeoBootUp) {
          neoGeoBootUp.play();
        }
      }, 2000);
      
      // Apply animation sequence
      this.animateCredits(credits, this.creditAnimations);
      
      return Promise.resolve(true);
    }
    
    return Promise.resolve(false);
  }
  
  /**
   * Compatibility method for backward compatibility
   */
  code(audioElement = null) {
    return this.show(audioElement);
  }
}