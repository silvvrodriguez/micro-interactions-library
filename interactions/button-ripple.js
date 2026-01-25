/**
 * Ripple Effect logic
 * I used 'animationend' instead of setTimeout to keep the DOM clean
 * exactly when the CSS finish its job.
 */
const rippleButtons = document.querySelectorAll('.ripple-button');

rippleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        // We create the ripple element dynamically
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        // Let's find the exact click position inside the button
        const rect = this.getBoundingClientRect();
        
        // The ripple size should be at least as wide as the button to cover it all
        const size = Math.max(rect.width, rect.height);
        
        // Centering the ripple where the user clicked
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        // Setting the styles
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        // Human touch: instead of a fixed timer, we listen to the animation
        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });
});