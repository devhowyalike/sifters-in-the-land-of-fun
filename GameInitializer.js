import { AudioManager } from './src/managers/AudioManager.js';
import { CounterManager } from './src/managers/CounterManager.js';
import { GameStateManager } from './src/managers/GameStateManager.js';
import { KeyboardManager } from './src/managers/KeyboardManager.js';
import { PlaygroundMap } from './src/components/PlaygroundMap.js';
import { MapLegend } from './src/components/MapLegend.js';
import { InputHandler } from './src/components/InputHandler.js';
import { ShowCredits } from './src/components/ShowCredits.js';

export class GameInitializer {
  constructor(uiManager) {
    this.uiManager = uiManager;
  }
  
  init() {
    // Initialize managers
    const audioManager = new AudioManager();
    const counterManager = new CounterManager();
    const gameState = new GameStateManager({
      container: this.uiManager.getContainer(),
      amWin: this.uiManager.getWinScreen(),
      mapKey: this.uiManager.getMapKey(),
      counterManager,
      audioManager,
      scoreLedElement: this.uiManager.getScoreLed(),
      finalScoreElement: this.uiManager.getFinalScore(),
    });

    // Init AudioManager
    audioManager.loadControls();
    
    // Initialize keyboard manager with game state
    const keyboardManager = new KeyboardManager({ gameState });
    
    // Initialize playground map
    const playgroundMap = new PlaygroundMap(
      '#playground', 
      gameState, 
      this.uiManager.resetAnswerField.bind(this.uiManager)
    );
    
    // Initialize map legend
    const mapLegend = new MapLegend('#mapLegend', keyboardManager);
    
    // Initialize input handler
    const inputHandler = new InputHandler(gameState, this.uiManager);
    
    // Setup remaining components
    this._setupRemainingComponents(
      audioManager, 
      counterManager, 
      keyboardManager,
      gameState,
      this.uiManager
    );
  }
  
  _setupRemainingComponents(audioManager, counterManager) {
    
    // Initialize credits
    const credits = new ShowCredits();
    
    // Setup game start with audio
    const howToPlay = document.getElementById("how-to-play");
    const instructions = document.querySelector("div.instructions");
    audioManager.setupGameStart(instructions, howToPlay, () => counterManager.start());
    
    // Non-audio fallback
    if (!audioManager.isAudioSupported()) {
      instructions.addEventListener('click', (e) => {
        e.preventDefault();
        howToPlay.style.display = "none";
        counterManager.start();
      });
    }
  }
}