/**
 * Utils.js - Utility functions for the game
 */

// Custom blink function
export const blink = (element, options) => {
  const settings = { blinks: [50], ...options };
  let opacity = 1;
  
  const blinker = setInterval(() => {
    opacity = opacity === 1 ? 0 : 1;
    element.style.opacity = opacity;
    settings.blinks[0]--;
    
    if (settings.blinks[0] <= 0) {
      clearInterval(blinker);
      element.style.opacity = 1;
    }
  }, 100);
};

// Format time from seconds
export const timeFromSeconds = (element) => {
  const seconds = parseInt(element.textContent, 10);
  element.dataset.original = seconds;
  
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const remainingMinutes = Math.floor(remainingSeconds % 60);
  
  const hoursText = hours > 0 ? 
    `${hours} hour${hours > 1 ? 's ' : ' '}` : '';
  const minutesText = minutes > 0 ? 
    `${minutes} minute${minutes > 1 ? 's ' : ' '}` : '';
  const secondsText = `${remainingMinutes} second${remainingMinutes > 1 ? 's' : ''}`;
  
  if (element.classList.contains("time")) {
    element.textContent = `Time Completed: ${hoursText}${minutesText}${secondsText}`;
  } else {
    element.textContent = ` and it only took me ${hoursText}${minutesText}${secondsText}!`;
  }
};

// Normalize an answer for comparison
export function normalizeAnswer(answer) {
  return answer
    .trim()
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, ' ');
}
