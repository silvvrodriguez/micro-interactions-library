// Code snippets for copying
const codeSnippets = {
    ripple: `/* CSS */
.ripple-button {
    position: relative;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    overflow: hidden;
    transition: transform 0.2s ease;
}

.ripple-button:hover {
    transform: translateY(-2px);
}

.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: ripple-animation 0.6s ease-out;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

/* JavaScript */
document.querySelectorAll('.ripple-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});`,

    magnetic: `/* CSS */
.magnetic-button {
    padding: 1rem 2rem;
    background: #1a1a1a;
    color: white;
    border: 2px solid #333;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
}

.magnetic-button:hover {
    border-color: #667eea;
    box-shadow: 0 0 20px rgba(102, 126, 234, 0.4);
}

/* JavaScript */
document.querySelectorAll('.magnetic-button').forEach(button => {
    button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        this.style.transform = \`translate(\${x * 0.3}px, \${y * 0.3}px)\`;
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});`,

    glow: `/* CSS */
.glow-card {
    position: relative;
    background: #141414;
    border: 1px solid #2a2a2a;
    border-radius: 16px;
    transition: all 0.3s ease;
}

.glow-card::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: 16px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
}

.glow-card:hover::before {
    opacity: 0.5;
}

.glow-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
}`,

    scroll: `/* CSS */
html {
    scroll-behavior: smooth;
}

/* JavaScript (optional for more control) */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});`
};

// Copy to clipboard functionality
document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', function() {
        const code = this.getAttribute('data-code');
        const snippet = codeSnippets[code];
        
        navigator.clipboard.writeText(snippet).then(() => {
            const originalText = this.innerHTML;
            this.innerHTML = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.5 4.5L6 12l-3.5-3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg> Copied!';
            this.style.background = '#10b981';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
            }, 2000);
        });
    });
});