/**
 * Custom Cursor System for GLACIERMC
 * Provides animated cursor with trail effects and hover interactions
 */
class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('cursor');
        this.cursorTrail = document.getElementById('cursor-trail');
        this.isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (!this.isTouch && this.cursor && this.cursorTrail) {
            this.init();
        }
    }

    init() {
        this.mouseX = 0;
        this.mouseY = 0;
        this.trailX = 0;
        this.trailY = 0;
        
        this.bindEvents();
        this.animateCursor();
        this.setupHoverEffects();
    }

    bindEvents() {
        // Mouse move event
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Mouse enter/leave events for body
        document.body.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
            this.cursorTrail.style.opacity = '0.7';
        });

        document.body.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
            this.cursorTrail.style.opacity = '0';
        });

        // Click effects
        document.addEventListener('mousedown', () => {
            document.body.classList.add('cursor-click');
            this.createClickRipple();
        });

        document.addEventListener('mouseup', () => {
            document.body.classList.remove('cursor-click');
        });
    }

    animateCursor() {
        // Update cursor position
        this.cursor.style.left = this.mouseX + 'px';
        this.cursor.style.top = this.mouseY + 'px';

        // Smooth trail animation
        this.trailX += (this.mouseX - this.trailX) * 0.1;
        this.trailY += (this.mouseY - this.trailY) * 0.1;
        
        this.cursorTrail.style.left = this.trailX + 'px';
        this.cursorTrail.style.top = this.trailY + 'px';

        requestAnimationFrame(() => this.animateCursor());
    }

    setupHoverEffects() {
        // Elements that should trigger hover effects
        const hoverElements = [
            'a', 'button', '.btn', '.nav-link', '.gamemode-card', 
            '.rank-card', '.coin-card', '.vote-card', '.update-card',
            '.rule-card', '.info-card', '.stat-card', '.social-link',
            'input', 'textarea', 'select', '.copy-btn', '.reaction-btn'
        ];

        hoverElements.forEach(selector => {
            document.addEventListener('mouseover', (e) => {
                if (e.target.matches(selector) || e.target.closest(selector)) {
                    document.body.classList.add('cursor-hover');
                    this.addHoverGlow(e.target.matches(selector) ? e.target : e.target.closest(selector));
                }
            });

            document.addEventListener('mouseout', (e) => {
                if (e.target.matches(selector) || e.target.closest(selector)) {
                    document.body.classList.remove('cursor-hover');
                    this.removeHoverGlow(e.target.matches(selector) ? e.target : e.target.closest(selector));
                }
            });
        });

        // Special effects for different element types
        this.setupSpecialHoverEffects();
    }

    setupSpecialHoverEffects() {
        // Gaming card hover effects
        document.addEventListener('mouseover', (e) => {
            const card = e.target.closest('.gamemode-card, .rank-card, .coin-card, .vote-card');
            if (card) {
                this.addCardParticles(card);
            }
        });

        // Button hover magnetism effect
        document.addEventListener('mousemove', (e) => {
            const btn = e.target.closest('.btn, button');
            if (btn) {
                const rect = btn.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const deltaX = (e.clientX - centerX) * 0.1;
                const deltaY = (e.clientY - centerY) * 0.1;
                
                btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
            }
        });

        document.addEventListener('mouseleave', (e) => {
            const btn = e.target.closest('.btn, button');
            if (btn) {
                btn.style.transform = '';
            }
        });
    }

    addHoverGlow(element) {
        element.style.transition = 'box-shadow 0.3s ease';
        element.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.5)';
    }

    removeHoverGlow(element) {
        element.style.boxShadow = '';
        setTimeout(() => {
            element.style.transition = '';
        }, 300);
    }

    addCardParticles(card) {
        // Create floating particles effect
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                this.createParticle(card);
            }, i * 100);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: particleFloat 1s ease-out forwards;
        `;

        const rect = container.getBoundingClientRect();
        particle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        particle.style.top = (rect.top + rect.height) + 'px';

        document.body.appendChild(particle);

        // Add particle animation styles if not exists
        if (!document.getElementById('particle-styles')) {
            const styles = document.createElement('style');
            styles.id = 'particle-styles';
            styles.textContent = `
                @keyframes particleFloat {
                    0% {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-50px) scale(0);
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }

    createClickRipple() {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, var(--primary-color) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: rippleEffect 0.6s ease-out forwards;
        `;

        ripple.style.left = (this.mouseX - 10) + 'px';
        ripple.style.top = (this.mouseY - 10) + 'px';

        document.body.appendChild(ripple);

        // Add ripple animation styles if not exists
        if (!document.getElementById('ripple-styles')) {
            const styles = document.createElement('style');
            styles.id = 'ripple-styles';
            styles.textContent = `
                @keyframes rippleEffect {
                    0% {
                        transform: scale(1);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }
}

// Initialize custom cursor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.customCursor = new CustomCursor();
});
