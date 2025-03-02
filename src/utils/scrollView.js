export function scrollview(element) {
  let isScrolling = false;
  let startX, startY, scrollLeft, scrollTop;
  let velocity = { x: 0, y: 0 };
  let lastX, lastY;
  let timestamp;
  let momentumAnimationId;
  // Track if touch actually moved
  let touchMoved = false;
  
  // Handle mouse events
  element.addEventListener('mousedown', (e) => {
    cancelMomentumTracking();
    isScrolling = true;
    startX = e.pageX - element.offsetLeft;
    startY = e.pageY - element.offsetTop;
    scrollLeft = element.scrollLeft;
    scrollTop = element.scrollTop;
    lastX = e.pageX;
    lastY = e.pageY;
    timestamp = Date.now();
    
    element.style.cursor = 'grabbing';
    e.preventDefault();
  });
  
  document.addEventListener('mousemove', (e) => {
    if (!isScrolling) return;
    e.preventDefault();
    
    // Calculate how far the mouse has moved
    const x = e.pageX - element.offsetLeft;
    const y = e.pageY - element.offsetTop;
    // Scroll speed multiplier
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;
    
    element.scrollLeft = scrollLeft - walkX;
    element.scrollTop = scrollTop - walkY;
    
    // Calculate velocity for momentum
    const now = Date.now();
    const elapsed = now - timestamp;
    
    if (elapsed > 5) {
      velocity.x = (lastX - e.pageX) / elapsed * 15;
      velocity.y = (lastY - e.pageY) / elapsed * 15;
      timestamp = now;
      lastX = e.pageX;
      lastY = e.pageY;
    }
  });
  
  document.addEventListener('mouseup', () => {
    if (!isScrolling) return;
    isScrolling = false;
    element.style.cursor = 'grab';
    
    // Start momentum scrolling if velocity is high enough
    if (Math.abs(velocity.x) > 0.5 || Math.abs(velocity.y) > 0.5) {
      startMomentumTracking();
    }
  });
  
  document.addEventListener('mouseleave', () => {
    if (isScrolling) {
      isScrolling = false;
      element.style.cursor = 'grab';
    }
  });
  
  // Touch support
  element.addEventListener('touchstart', (e) => {
    cancelMomentumTracking();
    if (e.touches.length === 1) {
      isScrolling = true;
      startX = e.touches[0].pageX - element.offsetLeft;
      startY = e.touches[0].pageY - element.offsetTop;
      scrollLeft = element.scrollLeft;
      scrollTop = element.scrollTop;
      lastX = e.touches[0].pageX;
      lastY = e.touches[0].pageY;
      timestamp = Date.now();
      // Reset touch moved flag
      touchMoved = false;
      // Don't prevent default here to allow taps to work
    }
    // Use passive listener for better performance
  }, { passive: true });
  
  element.addEventListener('touchmove', (e) => {
    if (!isScrolling || e.touches.length !== 1) return;
    // Touch has moved, so this is a scroll not a tap
    touchMoved = true;
    
    const x = e.touches[0].pageX - element.offsetLeft;
    const y = e.touches[0].pageY - element.offsetTop;
    const walkX = (x - startX) * 1.5;
    const walkY = (y - startY) * 1.5;
    
    // Check if scroll actually happened
    if (Math.abs(walkX) > 5 || Math.abs(walkY) > 5) {
      element.scrollLeft = scrollLeft - walkX;
      element.scrollTop = scrollTop - walkY;
      
      // Calculate velocity for momentum
      const now = Date.now();
      const elapsed = now - timestamp;
      
      if (elapsed > 5) {
        velocity.x = (lastX - e.touches[0].pageX) / elapsed * 15;
        velocity.y = (lastY - e.touches[0].pageY) / elapsed * 15;
        timestamp = now;
        lastX = e.touches[0].pageX;
        lastY = e.touches[0].pageY;
      }
      
      // Only prevent default if actually scrolling
      e.preventDefault();
    }
  }, { passive: false });
  
  element.addEventListener('touchend', (e) => {
    if (isScrolling) {
      isScrolling = false;
      
      // Only start momentum if we actually moved (scrolled)
      if (touchMoved && (Math.abs(velocity.x) > 0.5 || Math.abs(velocity.y) > 0.5)) {
        startMomentumTracking();
      } else if (!touchMoved) {
        // This was a tap, not a scroll - trigger a click event
        const touch = e.changedTouches[0];
        const clickEvent = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
          clientX: touch.clientX,
          clientY: touch.clientY
        });
        // Dispatch click at the touch position
        document.elementFromPoint(touch.clientX, touch.clientY).dispatchEvent(clickEvent);
      }
    }
  });
  
  // Momentum calculations
  function startMomentumTracking() {
    cancelMomentumTracking();
    
    momentumAnimationId = requestAnimationFrame(momentumLoop);
  }
  
  function cancelMomentumTracking() {
    if (momentumAnimationId) {
      cancelAnimationFrame(momentumAnimationId);
      momentumAnimationId = null;
    }
  }
  
  function momentumLoop() {
    // Apply easing to the velocity
    velocity.x *= 0.95;
    velocity.y *= 0.95;
    
    // Apply velocity to scroll position
    element.scrollLeft += velocity.x;
    element.scrollTop += velocity.y;
    
    // Continue animation if velocity is still significant
    if (Math.abs(velocity.x) > 0.1 || Math.abs(velocity.y) > 0.1) {
      momentumAnimationId = requestAnimationFrame(momentumLoop);
    }
  }
  
  // Initialize with grab cursor
  element.style.cursor = 'grab';
  
  // Add wheel handling for smoother scroll with improved trackpad support
  element.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    // Adjust sensitivity for trackpad
    // Increase for more responsive scrolling
    const sensitivity = 1.2;
    
    // Process vertical scrolling
    const verticalDelta = e.deltaMode === 1 ? e.deltaY * 20 : e.deltaY * sensitivity;
    element.scrollTop += verticalDelta;
    
    // Process horizontal scrolling - always active for trackpad and shift+wheel
    const horizontalDelta = e.deltaMode === 1 ? e.deltaX * 20 : e.deltaX * sensitivity;
    
    // Use natural horizontal scrolling if detected or shift key is pressed
    if (Math.abs(horizontalDelta) > 0 || e.shiftKey) {
      // If shift key is pressed and no horizontal movement detected, use vertical delta for horizontal scroll
      const effectiveHDelta = (Math.abs(horizontalDelta) > 0) ? horizontalDelta : (e.shiftKey ? verticalDelta : 0);
      element.scrollLeft += effectiveHDelta;
    }
  }, { passive: false });
  
  return {
    destroy: () => {
      // Cleanup method if needed
      cancelMomentumTracking();
      element.style.cursor = '';
    }
  };
}