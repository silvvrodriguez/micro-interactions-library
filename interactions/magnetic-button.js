/**
 * Magnetic Button Interaction
 * This script calculates the distance between the cursor and the button's center
 * to create a "magnetic attraction" effect.
 */

const magneticButtons = document.querySelectorAll('.magnetic-button');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        
        // 1. Calculate the center position of the button
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // 2. Calculate the distance from the mouse to the center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        // 3. Define the magnetic strength (0.3 = 30% of the distance)
        // Lowering this number makes the "magnet" heavier.
        const strength = 0.3;
        
        const moveX = distanceX * strength;
        const moveY = distanceY * strength;
        
        // 4. Apply the transformation
        this.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    // Reset position when the mouse leaves the button area
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});