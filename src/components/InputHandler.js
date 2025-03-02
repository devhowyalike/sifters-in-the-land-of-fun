import { AnswerValidator } from '../services/AnswerService.js';
import winStageHtml from '../assets/partials/winStage.js';

export class InputHandler {
  constructor(gameState, uiManager) {
    this.gameState = gameState;
    this.uiManager = uiManager;

    this.submitButton = document.querySelector("input.submit");
    this.answersInput = document.querySelector("input.answers");

    this._setupSubmitHandler();
  }

  _setupSubmitHandler() {
    if (this.submitButton) {
      this.submitButton.addEventListener('click', () => {
        const answerField = document.getElementById("answer-field");
        const scoreElement = document.getElementById("score");

        const elementType = `element${this.gameState.getCurrentElement() + 1}`;
        if (AnswerValidator.checkAnswer(answerField.value, elementType)) {
          this._handleCorrectAnswer(scoreElement);
        } else {
          this._handleWrongAnswer();
        }

        this.answersInput.value = "";
      });
    }
  }
  
  _handleCorrectAnswer(scoreElement) {
    this.gameState.incrementScore();
    
    // Update UI for correct answer
    const okElement = document.querySelector(`${this.gameState.getCurrentSelector()} + .ok`);
    okElement.style.display = "block";
    
    const keyElement = document.querySelector(this.gameState.getCurrentKey());
    keyElement.style.textDecoration = "line-through";
    
    const checkmark = document.createElement('span');
    checkmark.className = 'checkmark';
    checkmark.innerHTML = ' &#10003;';
    keyElement.appendChild(checkmark);
    
    document.querySelector(this.gameState.getCurrentSelector()).remove();
    scoreElement.style.display = "none";
    
    // Handle special score cases
    if (this.gameState.getScore() === 1) {
      const timeBonusElement = document.getElementById("timeBonus");
      if (timeBonusElement) {
        timeBonusElement.innerHTML = winStageHtml;
      }
    }
    
    if (this.gameState.getScore() === 9) {
      this.gameState.showWinScreen();
    }
  }
  
  _handleWrongAnswer() {
    const animate = this.answersInput.animate(
      [{ opacity: 0 }, { opacity: 1 }],
      { duration: 100, iterations: 3, easing: "linear" }
    );
    
    this.answersInput.value = "";
  }
}