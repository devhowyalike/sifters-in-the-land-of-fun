import { answerData } from '../data/answerData.js';
import { normalizeAnswer } from '../utils/utils.js';

export class AnswerService {
  constructor() {
    // Create validators dynamically from answerData
    this.validators = {};
    answerData.forEach((answer, index) => {
      const elementType = `element${index + 1}`;
      const acceptableAnswers = [answer.primary, ...answer.aliases];
      this.validators[elementType] = this._createValidator(acceptableAnswers);
    });

    // Keep track of which elements have been correctly answered
    this.answeredElements = new Set();
  }

  /**
   * Create a validator function for an array of acceptable answers
   * @param {string[]} acceptableAnswers - Array of acceptable answers
   * @returns {Function} Validator function
   * @private
   */
  _createValidator(acceptableAnswers) {
    // Normalize all acceptable answers
    const normalizedAnswers = acceptableAnswers.map(answer =>
      normalizeAnswer(answer)
    );

    // Return a function that checks if an answer matches any acceptable answer
    return (normalizedAnswer) => {
      return normalizedAnswers.includes(normalizedAnswer);
    };
  }

  /**
   * Check if an answer is correct for a given element
   * @param {string} answer - The user's answer
   * @param {string} elementType - The type of element being answered
   * @returns {boolean} Whether the answer is correct
   */
  checkAnswer(answer, elementType) {
    if (!answer || !elementType) return false;

    // Normalize the answer for comparison
    const normalizedAnswer = normalizeAnswer(answer);

    // Get the validator for this element type
    const validator = this.validators[elementType];

    if (!validator) {
      console.warn(`No validator found for element type: ${elementType}`);
      return false;
    }

    // Check if the answer is correct
    const isCorrect = validator(normalizedAnswer);

    // If correct, mark this element as answered
    if (isCorrect) {
      this.answeredElements.add(elementType);
    }

    return isCorrect;
  }
}

/**
 * Singleton instance of the AnswerService
 */
export const AnswerValidator = new AnswerService();