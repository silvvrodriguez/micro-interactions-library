/**
 * Micro-Interactions Snippets
 * These are the strings that get copied when users click "Copy Code".
 * I've kept them clean and focused on readability.
 */
const codeSnippets = {
    ripple: `/* CSS for Ripple Effect */
.ripple-button {
    position: relative;
    overflow: hidden;
}

.ripple {
    position: absolute;
    background: rgba(255, 255, 255, 0.5);
    transform: translate(-50%, -50%);
    pointer-events: none;
    border-radius: 50%;
    animation: ripple-animation 0.6s linear;
}`,

    magnetic: `/* The "Magnetic" feel comes from this multiplier */
const xOffset = (e.clientX - centerX) * 0.3;
const yOffset = (e.clientY - centerY) * 0.3;

this.style.transform = \`translate(\${xOffset}px, \${yOffset}px)\`;
/* 0.3 is the "strength" of the magnet. Lower = heavier. */`,

    glow: `/* Interactive Glow Card (CSS Variables) */
.glow-card {
    --mouse-x: 50%;
    --mouse-y: 50%;
    background: radial-gradient(
        circle at var(--mouse-x) var(--mouse-y),
        rgba(255, 255, 255, 0.1) 0%,
        transparent 80%
    );
}

/* JS to update variables */
card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mouse-x', \`\${e.clientX - rect.left}px\`);
    card.style.setProperty('--mouse-y', \`\${e.clientY - rect.top}px\`);
});`,

    scroll: `/* Smooth Scroll Implementation */
html {
    scroll-behavior: smooth;
}

/* For JS triggers */
window.scrollTo({
    top: target.offsetTop,
    behavior: 'smooth'
});`
};

/**
 * Global Interactions logic
 */

// --- 1. Magnetic Effect Implementation ---
document.querySelectorAll('.magnetic-button').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const xOffset = (e.clientX - centerX) * 0.3;
        const yOffset = (e.clientY - centerY) * 0.3;
        
        this.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});

// --- 2. Copy to Clipboard Logic ---
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', async function() {
        const codeType = this.getAttribute('data-code');
        const contentToCopy = codeSnippets[codeType];
        
        if (!contentToCopy) {
            console.error('No snippet found for:', codeType);
            return;
        }

        try {
            await navigator.clipboard.writeText(contentToCopy);
            
            const originalContent = this.innerHTML;
            this.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="margin-right: 4px;">
                    <path d="M13.5 4.5L6 12l-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg> 
                Copied!
            `;
            const originalBg = this.style.backgroundColor;
            this.style.backgroundColor = '#10b981';
            
            setTimeout(() => {
                this.innerHTML = originalContent;
                this.style.backgroundColor = originalBg;
            }, 2000);
            
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    });
});