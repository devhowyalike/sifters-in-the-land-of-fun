import musicManagerHtml from '../assets/partials/musicManager.js';
import ostPath from '../assets/audio/ost.mp3';

/**
 * Manages audio playback and controls for the game
 */
export class AudioManager {
  /**
   * Creates a new AudioManager instance
   * @param {Object} options - Configuration options
   * @param {string} options.audioPath - Path to the audio file
   * @param {string} options.controlsPath - Path to the controls HTML file
   * @param {string} options.controlsContainer - CSS selector for the controls container
   */
  constructor(options = {}) {
    this.options = {
      audioPath: ostPath,
      controlsContainer: '#audioCatchAll',
      ...options
    };
    
    this.audioElement = null;
    this.audioPlayer = null;
    this.playerButton = null;
    this.isPlaying = false;
    this.canPlayAudio = this.checkAudioSupport();
    
    // Initialize audio if supported
    if (this.canPlayAudio) {
      this.initAudio();
      this.setupPageVisibilityHandler();
    }
  }
  
  /**
   * Checks if the browser supports audio playback
   * @returns {boolean} Whether audio is supported
   */
  checkAudioSupport() {
    return !!document.createElement('audio').canPlayType;
  }
  
  /**
   * Initializes the audio element
   */
  initAudio() {
    this.audioElement = document.createElement('audio');
    this.audioElement.setAttribute('preload', 'auto');
    this.audioElement.autobuffer = true;
    this.audioElement.src = this.options.audioPath;
    this.audioElement.load();
  }
  
  /**
   * Loads the audio controls UI
   * @returns {Promise} Promise that resolves when controls are loaded
   */
  loadControls() {
    return new Promise((resolve) => {
      if (!this.canPlayAudio) {
        this.handleNoAudioSupport();
        resolve(false);
        return;
      }
      
      const container = document.querySelector(this.options.controlsContainer);
      if (container) {
        container.innerHTML = musicManagerHtml;
      }
      
      // Allow time for the DOM to update before querying elements
      setTimeout(() => {
        // Get references to UI elements after they've been loaded
        this.audioPlayer = document.getElementById('audio-player');
        this.playerButton = this.audioPlayer ? this.audioPlayer.querySelector('button') : null;
        
        // Show audio player
        if (this.audioPlayer) {
          this.audioPlayer.style.display = 'block';
        }
        
        this.setupControlListeners();
        resolve(true);
      }, 100); // Small delay to ensure DOM is updated
    });
  }
  
  /**
   * Sets up event listeners for audio controls
   */
  setupControlListeners() {
    if (this.playerButton) {
      this.playerButton.addEventListener('click', (e) => {
        e.preventDefault();
        const answersInput = document.querySelector('input.answers');
        if (answersInput) {
          answersInput.focus();
        }
        this.togglePlayback();
      });
    }
  }
  
  /**
   * Handles case where browser doesn't support audio
   */
  handleNoAudioSupport() {
    // Show no audio message
    document.querySelectorAll('li.option3, span.noAudio').forEach(el => {
      el.style.display = 'block';
    });
    
    const option1 = document.querySelector('li.option1');
    if (option1) option1.style.display = 'none';
    
    const mapKey = document.getElementById('mapKey');
    if (mapKey) mapKey.style.top = '5px';
  }
  
  /**
   * Toggles audio playback between play and pause
   */
  togglePlayback() {
    if (!this.canPlayAudio || !this.audioElement) return;
    
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }
  
  /**
   * Starts audio playback
   */
  play() {
    if (!this.canPlayAudio || !this.audioElement) return;
    
    this.audioElement.play();
    this.isPlaying = true;
    
    if (this.playerButton) {
      this.playerButton.style.backgroundPosition = '0 0';
    }
  }
  
  /**
   * Pauses audio playback
   */
  pause() {
    if (!this.canPlayAudio || !this.audioElement) return;
    
    this.audioElement.pause();
    this.isPlaying = false;
    
    if (this.playerButton) {
      this.playerButton.style.backgroundPosition = '0 -12px';
    }
  }
  
  /**
   * Handles the game start event
   * @param {HTMLElement} instructionsElement - The instructions element
   * @param {HTMLElement} howToPlayElement - The how-to-play element
   * @param {Function} startCounterCallback - Callback to start the game timer
   */
  setupGameStart(instructionsElement, howToPlayElement, startCounterCallback) {
    if (this.canPlayAudio) {
      instructionsElement.addEventListener('click', (e) => {
        e.preventDefault();
        this.play();
        
        howToPlayElement.style.display = 'none';
        startCounterCallback();
      });
    } else {
      instructionsElement.addEventListener('click', (e) => {
        e.preventDefault();
        howToPlayElement.style.display = 'none';
        startCounterCallback();
      });
    }
  }
  
  /**
   * Sets up handler for page visibility changes
   */
  setupPageVisibilityHandler() {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.isPlaying) {
        this.pause();
      }
    });
  }
  
  /**
   * Checks if audio is supported by the browser
   * @returns {boolean} Whether audio is supported
   */
  isAudioSupported() {
    return this.canPlayAudio;
  }
  
  /**
   * Handles the game win event
   */
  handleGameWin() {
    this.pause();
    
    // Hide audio player
    if (this.audioPlayer) {
      this.audioPlayer.style.display = 'none';
    }
    
    // Play win sound
    const winSound = document.getElementById('winSound');
    if (winSound) {
      winSound.play();
    }
  }
}

export default AudioManager;