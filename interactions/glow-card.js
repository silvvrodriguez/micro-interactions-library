/**
 * Glow Card: Interactive Spotlight Effect
 * This script calculates the mouse position and updates CSS variables
 */
document.querySelectorAll('.glow-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        
        // Calculate cursor position relative to the card
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set CSS variables dynamically
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});