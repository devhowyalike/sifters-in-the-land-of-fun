import './src/assets/css/global.css';

import { BootScreen } from './src/components/BootScreen.js';
import { UIManager } from './src/managers/UIManager.js';
import { GameInitializer } from './GameInitializer.js';

// Initialize boot screen
const bootScreen = new BootScreen('#bootUp');
bootScreen.start();

// Initialize game when DOM is ready
window.addEventListener('load', () => {
  bootScreen.hide();
  
  // Create and initialize UI manager
  const uiManager = new UIManager();
  
  // Initialize the game
  const gameInitializer = new GameInitializer(uiManager);
  gameInitializer.init();
});
