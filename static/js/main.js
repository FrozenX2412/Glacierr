/**
 * Main JavaScript functionality for GLACIERMC Website
 * Handles loading animations, form interactions, store functionality, voting, and more
 */
class GLACIERMCApp {
    constructor() {
        this.init();
    }

    init() {
        this.handlePageLoad();
        this.initializeComponents();
        this.bindEvents();
        this.startAnimations();
    }

    handlePageLoad() {
        // Show loading screen
        const loadingScreen = document.getElementById('loading-screen');
        
        // Simulate loading time and hide loading screen
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (loadingScreen) {
                    loadingScreen.style.opacity = '0';
                    setTimeout(() => {
                        loadingScreen.style.display = 'none';
                        this.animatePageEntry();
                    }, 500);
                }
            }, 1500); // Show loading for 1.5 seconds minimum
        });
    }

    animatePageEntry() {
        // Animate elements on page load
        const animateElements = document.querySelectorAll('.hero-content > *, .gamemode-card, .update-card, .rank-card, .coin-card, .vote-card');
        
        animateElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    initializeComponents() {
        this.initNavbarScroll();
        this.initServerIPCopy();
        this.initStoreComponents();
        this.initVotingComponents();
        this.initApplicationForm();
        this.initSmoothScrolling();
        this.initProgressBars();
        this.initCounters();
    }

    initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
                navbar.style.background = 'rgba(13, 17, 23, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.background = 'rgba(13, 17, 23, 0.95)';
                navbar.style.boxShadow = '';
            }
        });
    }

    initServerIPCopy() {
        window.copyIP = () => {
            const serverIP = document.getElementById('server-ip');
            const copyBtn = document.querySelector('.copy-btn');
            
            if (serverIP && copyBtn) {
                serverIP.select();
                serverIP.setSelectionRange(0, 99999); // For mobile devices
                
                navigator.clipboard.writeText(serverIP.value).then(() => {
                    // Success feedback
                    const originalText = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                    copyBtn.style.background = '#28a745';
                    
                    // Show notification
                    this.showNotification('Server IP copied to clipboard!', 'success');
                    
                    setTimeout(() => {
                        copyBtn.innerHTML = originalText;
                        copyBtn.style.background = '';
                    }, 2000);
                }).catch(err => {
                    // Fallback for older browsers
                    try {
                        document.execCommand('copy');
                        this.showNotification('Server IP copied to clipboard!', 'success');
                    } catch (e) {
                        this.showNotification('Failed to copy IP address', 'error');
                    }
                });
            }
        };
    }

    initStoreComponents() {
        // Purchase modal functionality
        const purchaseModal = new bootstrap.Modal(document.getElementById('purchaseModal') || document.createElement('div'));
        const purchaseButtons = document.querySelectorAll('.btn-purchase');
        
        purchaseButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemName = btn.dataset.name;
                const itemPrice = btn.dataset.price;
                const itemType = btn.dataset.item;
                
                this.showPurchaseModal(itemName, itemPrice, itemType);
            });
        });

        // Store tab switching with animations
        const storeTabs = document.querySelectorAll('#store-tabs .nav-link');
        storeTabs.forEach(tab => {
            tab.addEventListener('shown.bs.tab', (e) => {
                const targetPane = document.querySelector(e.target.dataset.bsTarget);
                if (targetPane) {
                    this.animateStoreItems(targetPane);
                }
            });
        });
    }

    showPurchaseModal(itemName, itemPrice, itemType) {
        const modal = document.getElementById('purchaseModal');
        if (!modal) return;

        const itemNameEl = modal.querySelector('.item-name');
        const itemPriceEl = modal.querySelector('.item-price');
        
        if (itemNameEl) itemNameEl.textContent = itemName;
        if (itemPriceEl) itemPriceEl.textContent = `$${parseFloat(itemPrice).toFixed(2)}`;

        const purchaseModal = new bootstrap.Modal(modal);
        purchaseModal.show();

        // Handle purchase confirmation
        const confirmBtn = document.getElementById('confirm-purchase');
        if (confirmBtn) {
            confirmBtn.onclick = () => {
                this.processPurchase(itemName, itemPrice, itemType);
                purchaseModal.hide();
            };
        }
    }

    processPurchase(itemName, itemPrice, itemType) {
        // Show loading state
        this.showNotification('Processing purchase...', 'info');
        
        // Simulate purchase processing
        setTimeout(() => {
            this.showNotification(`Successfully purchased ${itemName}! Check your in-game account.`, 'success');
            
            // Add purchase animation
            this.createPurchaseSuccessEffect();
        }, 2000);
    }

    createPurchaseSuccessEffect() {
        const effect = document.createElement('div');
        effect.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        z-index: 10000; color: #28a745; font-size: 3rem; pointer-events: none;">
                <i class="fas fa-check-circle"></i>
            </div>
        `;
        
        document.body.appendChild(effect);
        effect.style.animation = 'purchaseSuccess 2s ease forwards';
        
        // Add success animation keyframes
        if (!document.getElementById('purchase-success-styles')) {
            const styles = document.createElement('style');
            styles.id = 'purchase-success-styles';
            styles.textContent = `
                @keyframes purchaseSuccess {
                    0% { opacity: 0; transform: translate(-50%, -50%) scale(0); }
                    50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
                    100% { opacity: 0; transform: translate(-50%, -50%) scale(1); }
                }
            `;
            document.head.appendChild(styles);
        }
        
        setTimeout(() => {
            document.body.removeChild(effect);
        }, 2000);
    }

    animateStoreItems(container) {
        const items = container.querySelectorAll('.rank-card, .coin-card');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px) rotateX(10deg)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0) rotateX(0deg)';
            }, index * 100);
        });
    }

    initVotingComponents() {
        const voteButtons = document.querySelectorAll('.btn-vote');
        
        voteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const siteName = btn.dataset.site;
                const siteUrl = btn.href;
                
                this.handleVoteClick(btn, siteName, siteUrl);
            });
        });

        // Initialize vote cooldown timers
        this.updateVoteCooldowns();
        setInterval(() => this.updateVoteCooldowns(), 60000); // Update every minute
    }

    handleVoteClick(button, siteName, siteUrl) {
        // Check if vote is available
        const voteCard = button.closest('.vote-card');
        const cooldownTimer = voteCard.querySelector('.cooldown-timer');
        
        if (cooldownTimer && cooldownTimer.style.display !== 'none') {
            this.showNotification('You can only vote once every 12 hours per site', 'warning');
            return;
        }

        // Show voting feedback
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening...';
        button.disabled = true;
        
        // Open voting site
        window.open(siteUrl, '_blank');
        
        // Start cooldown
        this.startVoteCooldown(voteCard, siteName);
        
        // Reset button after delay
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-external-link-alt"></i> Vote Now';
            button.disabled = false;
        }, 3000);
    }

    startVoteCooldown(voteCard, siteName) {
        const button = voteCard.querySelector('.btn-vote');
        const cooldownTimer = voteCard.querySelector('.cooldown-timer');
        
        if (!cooldownTimer) return;
        
        // Set cooldown end time (12 hours from now)
        const cooldownEnd = Date.now() + (12 * 60 * 60 * 1000);
        localStorage.setItem(`vote_cooldown_${siteName}`, cooldownEnd);
        
        button.style.display = 'none';
        cooldownTimer.style.display = 'block';
        
        this.showNotification(`Thank you for voting on ${siteName}!`, 'success');
    }

    updateVoteCooldowns() {
        const voteCards = document.querySelectorAll('.vote-card');
        
        voteCards.forEach(card => {
            const button = card.querySelector('.btn-vote');
            const cooldownTimer = card.querySelector('.cooldown-timer');
            const countdown = cooldownTimer?.querySelector('.countdown');
            const siteName = button?.dataset.site;
            
            if (!siteName) return;
            
            const cooldownEnd = localStorage.getItem(`vote_cooldown_${siteName}`);
            
            if (cooldownEnd && Date.now() < parseInt(cooldownEnd)) {
                const remaining = parseInt(cooldownEnd) - Date.now();
                const hours = Math.floor(remaining / (1000 * 60 * 60));
                const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
                
                if (countdown) {
                    countdown.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                }
                
                if (button) button.style.display = 'none';
                if (cooldownTimer) cooldownTimer.style.display = 'block';
            } else {
                // Cooldown expired
                if (cooldownEnd) {
                    localStorage.removeItem(`vote_cooldown_${siteName}`);
                }
                if (button) button.style.display = 'block';
                if (cooldownTimer) cooldownTimer.style.display = 'none';
            }
        });
    }

    initApplicationForm() {
        const form = document.getElementById('application-form');
        if (!form) return;

        // Add form validation and enhancement
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                e.target.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', (e) => {
                e.target.parentElement.classList.remove('focused');
                this.validateField(e.target);
            });
            
            input.addEventListener('input', (e) => {
                this.clearFieldError(e.target);
            });
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleApplicationSubmission(form);
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address';
                }
                break;
            case 'number':
                const num = parseInt(value);
                if (isNaN(num) || num < 13 || num > 100) {
                    isValid = false;
                    errorMessage = 'Please enter a valid age (13-100)';
                }
                break;
            default:
                if (field.hasAttribute('required') && !value) {
                    isValid = false;
                    errorMessage = 'This field is required';
                }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        } else {
            this.clearFieldError(field);
        }

        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        const errorEl = document.createElement('div');
        errorEl.className = 'field-error text-danger mt-1';
        errorEl.innerHTML = `<small><i class="fas fa-exclamation-circle"></i> ${message}</small>`;
        
        field.parentElement.appendChild(errorEl);
        field.style.borderColor = '#dc3545';
    }

    clearFieldError(field) {
        const existingError = field.parentElement.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        field.style.borderColor = '';
    }

    handleApplicationSubmission(form) {
        // Validate all fields
        const inputs = form.querySelectorAll('input, textarea, select');
        let allValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                allValid = false;
            }
        });

        if (!allValid) {
            this.showNotification('Please fix the errors in the form', 'error');
            return;
        }

        // Show submission loading
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            form.submit(); // This will use the Flask form handling
        }, 1500);
    }

    initSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    initProgressBars() {
        // Animated progress bars for any stats
        const progressBars = document.querySelectorAll('.progress-bar');
        
        const animateProgressBars = () => {
            progressBars.forEach(bar => {
                const rect = bar.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
                
                if (isVisible && !bar.classList.contains('animated')) {
                    bar.classList.add('animated');
                    const targetWidth = bar.dataset.width || '100%';
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 100);
                }
            });
        };

        window.addEventListener('scroll', animateProgressBars);
        animateProgressBars(); // Check on load
    }

    initCounters() {
        // Animated counters for statistics
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounters = () => {
            counters.forEach(counter => {
                const rect = counter.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
                
                if (isVisible && !counter.classList.contains('counted')) {
                    counter.classList.add('counted');
                    const target = parseInt(counter.textContent.replace(/\D/g, ''));
                    const prefix = counter.textContent.replace(/[\d,]/g, '');
                    const suffix = counter.textContent.replace(/^[\D]*[\d,]+/, '');
                    
                    this.animateCounter(counter, 0, target, 1000, prefix, suffix);
                }
            });
        };

        window.addEventListener('scroll', animateCounters);
        animateCounters(); // Check on load
    }

    animateCounter(element, start, end, duration, prefix = '', suffix = '') {
        const startTime = performance.now();
        
        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(start + (end - start) * progress);
            
            element.textContent = prefix + current.toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        };
        
        requestAnimationFrame(updateCounter);
    }

    bindEvents() {
        // Load more updates button
        const loadMoreBtn = document.getElementById('load-more-updates');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.loadMoreUpdates();
            });
        }

        // Newsletter subscription
        const subscribeBtn = document.querySelector('.sidebar-card button');
        if (subscribeBtn) {
            subscribeBtn.addEventListener('click', () => {
                const emailInput = document.querySelector('.sidebar-card input[type="email"]');
                if (emailInput && emailInput.value) {
                    this.subscribeToNewsletter(emailInput.value);
                    emailInput.value = '';
                }
            });
        }

        // Social link tracking
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('click', (e) => {
                const platform = link.querySelector('i').className;
                console.log(`Social link clicked: ${platform}`);
            });
        });
    }

    loadMoreUpdates() {
        const loadMoreBtn = document.getElementById('load-more-updates');
        if (!loadMoreBtn) return;

        loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        loadMoreBtn.disabled = true;

        // Simulate loading more updates
        setTimeout(() => {
            this.showNotification('No more updates to load', 'info');
            loadMoreBtn.innerHTML = '<i class="fas fa-refresh"></i> Load More Updates';
            loadMoreBtn.disabled = false;
        }, 1000);
    }

    subscribeToNewsletter(email) {
        this.showNotification(`Successfully subscribed ${email} to newsletter!`, 'success');
    }

    startAnimations() {
        // Start background animations
        this.initBackgroundEffects();
        this.initFloatingElements();
    }

    initBackgroundEffects() {
        // Add subtle background particle effects
        const createBackgroundParticle = () => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 2px;
                height: 2px;
                background: var(--primary-color);
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                opacity: 0.3;
                animation: backgroundParticle 10s linear forwards;
            `;
            
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = window.innerHeight + 'px';
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 10000);
        };

        // Add background particle animation
        if (!document.getElementById('background-particle-styles')) {
            const styles = document.createElement('style');
            styles.id = 'background-particle-styles';
            styles.textContent = `
                @keyframes backgroundParticle {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.3;
                    }
                    90% {
                        opacity: 0.3;
                    }
                    100% {
                        transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        // Create particles periodically
        setInterval(createBackgroundParticle, 3000);
    }

    initFloatingElements() {
        // Add floating animation to hero images and cards
        const floatingElements = document.querySelectorAll('.hero-image img, .gamemode-card, .rank-card');
        
        floatingElements.forEach((element, index) => {
            element.style.animation = `float 3s ease-in-out infinite`;
            element.style.animationDelay = `${index * 0.5}s`;
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show notification-toast`;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1050;
            min-width: 300px;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
        `;
        
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-${icons[type]} me-2"></i>
                <span>${message}</span>
                <button type="button" class="btn-close ms-auto" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        // Add notification styles
        if (!document.getElementById('notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                .notification-toast {
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(10px);
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideInRight 0.3s ease reverse';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.glacierApp = new GLACIERMCApp();
});

// Add global error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});
