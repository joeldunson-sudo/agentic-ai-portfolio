/**
 * AGENTIC AI PORTFOLIO - ENHANCEMENT SCRIPT
 * Makes every page feel ALIVE with particles, animations, and interactivity
 * Auto-injects into all pages that include this script
 */

(function() {
  'use strict';

  // === CONFIGURATION ===
  const CONFIG = {
    particles: {
      count: 50,
      colors: ['#00A0FB', '#32B8C6', '#00C853'],
      minSize: 2,
      maxSize: 6
    },
    animations: {
      staggerDelay: 100,
      revealThreshold: 0.1
    }
  };

  // === PARTICLE SYSTEM ===
  function createParticles() {
    const container = document.createElement('div');
    container.className = 'particles-container';
    container.id = 'particles';
    
    for (let i = 0; i < CONFIG.particles.count; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random properties
      const size = Math.random() * (CONFIG.particles.maxSize - CONFIG.particles.minSize) + CONFIG.particles.minSize;
      const color = CONFIG.particles.colors[Math.floor(Math.random() * CONFIG.particles.colors.length)];
      const left = Math.random() * 100;
      const delay = Math.random() * 15;
      const duration = 15 + Math.random() * 10;
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${left}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        box-shadow: 0 0 ${size * 2}px ${color};
      `;
      
      container.appendChild(particle);
    }
    
    document.body.appendChild(container);
  }

  // === MAGNETIC CURSOR EFFECT ===
  function initMagneticEffect() {
    const magneticTargets = document.querySelectorAll('.btn, button, .card, nav button, a.btn');
    
    magneticTargets.forEach(target => {
      target.classList.add('magnetic-target');
      
      target.addEventListener('mousemove', (e) => {
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        target.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });
      
      target.addEventListener('mouseleave', () => {
        target.style.transform = '';
      });
    });
  }

  // === SCROLL-TRIGGERED ANIMATIONS ===
  function initScrollAnimations() {
    const observerOptions = {
      threshold: CONFIG.animations.revealThreshold,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Stagger children animations
          const children = entry.target.querySelectorAll('.card, .stat-card, .evidence-item, .deal-card-interactive');
          children.forEach((child, index) => {
            child.style.animationDelay = `${index * CONFIG.animations.staggerDelay}ms`;
            child.classList.add('stagger-item');
          });
        }
      });
    }, observerOptions);

    document.querySelectorAll('.section, section, .grid, .stats-grid').forEach(el => {
      observer.observe(el);
    });
  }

  // === AUTO-ENHANCE ELEMENTS ===
  function autoEnhanceElements() {
    // Add glow hover to cards
    document.querySelectorAll('.card, .stat-card, .deal-card-interactive, .evidence-item').forEach(el => {
      el.classList.add('glow-hover', 'spotlight');
    });

    // Add breathing effect to CTA elements
    document.querySelectorAll('.cta-section, .calculator-output').forEach(el => {
      el.classList.add('breathing');
    });

    // Add ripple to buttons
    document.querySelectorAll('button, .btn, nav button').forEach(el => {
      el.classList.add('ripple');
    });

    // Add hover underline to nav links
    document.querySelectorAll('nav a, .nav-bar a').forEach(el => {
      el.classList.add('hover-underline');
    });

    // Add neon effect to headings
    document.querySelectorAll('.hero h1, .section-title').forEach(el => {
      el.classList.add('neon-text');
    });

    // Add float animation to key elements
    document.querySelectorAll('.card-icon, .stat-value').forEach(el => {
      el.classList.add('float-element');
    });
  }

  // === MOUSE TRAIL EFFECT ===
  function initMouseTrail() {
    const trail = [];
    const trailLength = 10;
    
    for (let i = 0; i < trailLength; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position: fixed;
        width: ${8 - i * 0.5}px;
        height: ${8 - i * 0.5}px;
        background: rgba(0, 160, 251, ${0.5 - i * 0.04});
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        opacity: 0;
      `;
      document.body.appendChild(dot);
      trail.push(dot);
    }

    let mouseX = 0, mouseY = 0;
    let positions = [];

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateTrail() {
      positions.unshift({ x: mouseX, y: mouseY });
      if (positions.length > trailLength) positions.pop();

      trail.forEach((dot, index) => {
        if (positions[index]) {
          dot.style.left = positions[index].x + 'px';
          dot.style.top = positions[index].y + 'px';
          dot.style.opacity = '1';
        }
      });

      requestAnimationFrame(animateTrail);
    }

    animateTrail();
  }

  // === TYPING EFFECT FOR TEXT ===
  function initTypingEffect() {
    document.querySelectorAll('[data-typing]').forEach(el => {
      const text = el.textContent;
      el.textContent = '';
      el.style.visibility = 'visible';
      
      let i = 0;
      const type = () => {
        if (i < text.length) {
          el.textContent += text.charAt(i);
          i++;
          setTimeout(type, 50);
        }
      };
      type();
    });
  }

  // === COUNTER ANIMATION ===
  function initCounters() {
    const counters = document.querySelectorAll('.stat-value, .value, [data-count]');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const text = target.textContent;
          const match = text.match(/[\d,]+/);
          
          if (match) {
            const endValue = parseInt(match[0].replace(/,/g, ''));
            const duration = 2000;
            const startTime = performance.now();
            
            const animate = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              
              // Easing
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(eased * endValue);
              
              target.textContent = text.replace(match[0], current.toLocaleString());
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            
            requestAnimationFrame(animate);
            observer.unobserve(target);
          }
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  // === SMOOTH SCROLL ===
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
          e.preventDefault();
          const target = document.querySelector(targetId);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }

  // === PARALLAX SCROLLING ===
  function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(el => {
        const speed = el.dataset.parallax || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }

  // === TILT EFFECT ON CARDS ===
  function initTiltEffect() {
    document.querySelectorAll('.card, .deal-card-interactive').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const tiltX = (y - 0.5) * 10;
        const tiltY = (x - 0.5) * -10;
        
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // === KEYBOARD SHORTCUTS ===
  function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Press 'P' to toggle particles
      if (e.key === 'p' && !e.ctrlKey && !e.metaKey) {
        const particles = document.getElementById('particles');
        if (particles) {
          particles.style.display = particles.style.display === 'none' ? 'block' : 'none';
        }
      }
    });
  }

  // === LIVE STATUS INDICATOR ===
  function addLiveIndicator() {
    const headers = document.querySelectorAll('.header h1, .hero h1');
    headers.forEach(header => {
      if (!header.querySelector('.live-dot')) {
        const dot = document.createElement('span');
        dot.className = 'live-dot';
        dot.style.marginLeft = '10px';
        header.appendChild(dot);
      }
    });
  }

  // === INITIALIZE EVERYTHING ===
  function init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAll);
    } else {
      initAll();
    }
  }

  function initAll() {
    console.log('🚀 Agentic AI Portfolio Enhancement Loaded');
    
    // Core enhancements
    createParticles();
    autoEnhanceElements();
    
    // Interactive effects
    initMagneticEffect();
    initScrollAnimations();
    initTiltEffect();
    
    // Visual polish
    initCounters();
    initSmoothScroll();
    addLiveIndicator();
    
    // Optional features (can be resource-intensive)
    // initMouseTrail(); // Uncomment for mouse trail
    
    // Keyboard shortcuts
    initKeyboardShortcuts();
    
    console.log('✨ All enhancements applied!');
  }

  // Start!
  init();
})();
