/**
 * Micro-Interactions Snippets
 * These are the strings that get copied when users click "Copy Code".
 * I've kept them clean and focused on readability.
 */
const codeSnippets = {
    ripple: `/* CSS & JS for the Ripple effect */
.ripple-button {
    position: relative;
    overflow: hidden; /* Critical for the ripple to stay inside */
    /* ... rest of your styles */
}

/* JavaScript logic: Creating the span on click */
button.addEventListener('click', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // ... logic to append span
});`,

    magnetic: `/* The "Magnetic" feel comes from this multiplier */
this.style.transform = \`translate(\${x * 0.3}px, \${y * 0.3}px)\`;
/* 0.3 is the "strength" of the magnet. Lower = heavier. */`,
    
    // ... (puedes mantener los otros snippets igual o resumirlos)
};

/**
 * Global Interactions logic
 */

// --- 1. Magnetic Effect Implementation ---
// We use a small multiplier to make the movement subtle and not jumpy.
document.querySelectorAll('.magnetic-button').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        
        // Calculating the distance from the center of the button
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const xOffset = (e.clientX - centerX) * 0.3; // 0.3 makes it follow the cursor gently
        const yOffset = (e.clientY - centerY) * 0.3;
        
        this.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
    
    button.addEventListener('mouseleave', function() {
        // Return to original position when the mouse leaves
        this.style.transform = 'translate(0, 0)';
    });
});

// --- 2. Copy to Clipboard Logic ---
// Showing a visual "Copied!" state to give the user immediate feedback.
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', async function() {
        const codeType = this.getAttribute('data-code');
        const contentToCopy = codeSnippets[codeType];
        
        try {
            await navigator.clipboard.writeText(contentToCopy);
            
            // Visual feedback state
            const originalContent = this.innerHTML;
            this.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-right: 4px;">
                    <path d="M13.5 4.5L6 12l-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg> 
                Copied!
            `;
            this.style.backgroundColor = '#10b981'; // Success green
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalContent;
                this.style.backgroundColor = '';
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });
});