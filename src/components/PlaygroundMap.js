import { mapConfig } from '../data/mapConfig.js';

export class PlaygroundMap {
  constructor(selector, gameState, resetAnswerFieldCallback) {
    this.container = document.querySelector(selector);
    this.gameState = gameState;
    this.resetAnswerField = resetAnswerFieldCallback;
    
    this._setupMapClickHandlers();
  }
  
  _setupMapClickHandlers() {
    Object.entries(mapConfig).forEach(([selector, config]) => {
      const element = document.querySelector(selector);
      if (element) {
        element.addEventListener('click', (event) => {
          // Prevent default navigation behavior
          event.preventDefault();
          
          const scoreElement = document.getElementById("score");
          scoreElement.style.top = config.scorePosition.top;
          scoreElement.style.left = config.scorePosition.left;
          
          this.gameState.setCurrentElement(config.element);
          this.gameState.setCurrentKey(config.key);
          this.gameState.setCurrentSelector(selector);
          this.resetAnswerField();
          
          const okImage = this._createOkMark();
          okImage.style.top = config.okPosition.top;
          okImage.style.left = config.okPosition.left;
        });
      }
    });
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
