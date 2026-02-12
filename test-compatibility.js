// Test script for cross-device compatibility
console.log('=== COMPATIBILITY TEST ===');

// Test 1: Network access
fetch('https://bashi-tech-production.up.railway.app')
  .then(res => console.log('✅ Network access:', res.status))
  .catch(err => console.log('❌ Network error:', err.message));

// Test 2: Environment detection  
console.log('User Agent:', navigator.userAgent);
console.log('Device:', navigator.platform);
console.log('Screen:', `${window.screen.width}x${window.screen.height}`);
console.log('Connection:', navigator.onLine ? 'online' : 'offline');

// Test 3: Feature support
console.log('LocalStorage:', typeof Storage !== 'undefined');
console.log('SessionStorage:', typeof sessionStorage !== 'undefined');
console.log('CSS Grid:', CSS.supports('grid'));
console.log('Flexbox:', CSS.supports('flexbox'));
console.log('Touch:', 'ontouchstart' in window);