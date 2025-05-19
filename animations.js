// Анимациялар мен визуалды эффектілер
document.addEventListener('DOMContentLoaded', () => {
    // Барлық элементтерге fade-in эффектісі
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 + (index * 100));
    });

    // Параллакс эффектісі жақсартылған
    const parallaxScroll = () => {
        const parallaxElements = document.querySelectorAll('.parallax');
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const rect = element.getBoundingClientRect();
            const visible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (visible) {
                const yPos = (rect.top * speed) / 2;
                element.style.transform = `translate3d(0, ${yPos}px, 0) scale(1.02)`;
            }
        });
    };
    window.addEventListener('scroll', parallaxScroll);
    parallaxScroll();

    // Жақсартылған hover эффектісі
    const hoverElements = document.querySelectorAll('.hover-effect');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.transform = 'scale(1.05) translateY(-5px)';
            element.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            element.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'scale(1) translateY(0)';
            element.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        });
    });

    // Жақсартылған smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollBy({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Жақсартылған текст анимациясы
    const textElements = document.querySelectorAll('.animate-text');
    textElements.forEach(element => {
        const html = element.innerHTML;
        element.textContent = '';
        let i = 0;
        let delay = 0;
        
        while (i < html.length) {
            if (html.slice(i, i+4) === '<br>') {
                element.appendChild(document.createElement('br'));
                i += 4;
            } else if (html[i] === ' ') {
                element.appendChild(document.createTextNode(' '));
                i++;
            } else {
                const span = document.createElement('span');
                span.textContent = html[i];
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                span.style.transition = `all 0.3s ease ${delay * 0.05}s`;
                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.transform = 'translateY(0)';
                }, 100);
                element.appendChild(span);
                i++;
                delay++;
            }
        }
    });

    // Жаңа: Skill иконкаларына анимация
    const skillIcons = document.querySelectorAll('.skills-section i');
    skillIcons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'scale(0.5)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        icon.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                        icon.style.opacity = '1';
                        icon.style.transform = 'scale(1)';
                    }, index * 100);
                    observer.unobserve(icon);
                }
            });
        });
        
        observer.observe(icon);
    });

    // Жаңа: Жоба карточкаларына анимация
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, index * 200);
                    observer.unobserve(card);
                }
            });
        });
        
        observer.observe(card);
    });

    // Жаңа: Навигация анимациясы
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transition = 'all 0.3s ease';
            link.style.transform = 'translateY(-2px)';
        });
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });

    animateFreeGuideSection();
    const btn = document.getElementById('download-guide-btn');
    if (btn) {
        btn.addEventListener('click', (e) => {
            launchConfetti();
            showGuideCongrats();
        });
    }
});

// ТЕГІН ГАЙД бөліміне анимация және confetti
function animateFreeGuideSection() {
    const section = document.getElementById('free-guide-section');
    if (section) {
        section.style.opacity = '0';
        section.style.transform = 'scale(0.95)';
        section.style.transition = 'opacity 1s cubic-bezier(.4,0,.2,1), transform 1s cubic-bezier(.4,0,.2,1)';
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'scale(1)';
        }, 400);
    }
}

function launchConfetti() {
    const holder = document.getElementById('confetti-holder');
    if (!holder) return;
    const colors = ['#2563eb', '#10b981', '#f59e42', '#e11d48', '#fbbf24', '#6366f1'];
    const confettiCount = 42;
    for (let i = 0; i < confettiCount; i++) {
        const conf = document.createElement('div');
        const size = Math.random() * 10 + 8;
        conf.style.position = 'absolute';
        conf.style.width = `${size}px`;
        conf.style.height = `${size * 0.4}px`;
        conf.style.background = colors[Math.floor(Math.random() * colors.length)];
        conf.style.left = `${Math.random() * 90 + 5}%`;
        conf.style.top = '40%';
        conf.style.opacity = '0.85';
        conf.style.borderRadius = '50%';
        conf.style.transform = `rotate(${Math.random() * 360}deg)`;
        conf.style.zIndex = '100';
        conf.style.transition = 'transform 1.2s cubic-bezier(.4,0,.2,1), top 1.2s cubic-bezier(.4,0,.2,1), opacity 1.2s';
        holder.appendChild(conf);
        setTimeout(() => {
            conf.style.top = `${90 + Math.random() * 10}%`;
            conf.style.transform += ` translateY(${80 + Math.random() * 40}px) rotate(${Math.random() * 360}deg)`;
            conf.style.opacity = '0';
        }, 30);
        setTimeout(() => {
            conf.remove();
        }, 1400);
    }
}

function showGuideCongrats() {
    const section = document.getElementById('free-guide-section');
    if (!section) return;
    let msg = document.getElementById('guide-congrats-msg');
    if (!msg) {
        msg = document.createElement('div');
        msg.id = 'guide-congrats-msg';
        msg.textContent = 'Құттықтаймыз! Гайд жүктелді 🎉';
        msg.style.position = 'absolute';
        msg.style.left = '50%';
        msg.style.top = '18%';
        msg.style.transform = 'translate(-50%, -50%)';
        msg.style.background = 'rgba(255,255,255,0.97)';
        msg.style.color = '#2563eb';
        msg.style.fontWeight = '700';
        msg.style.fontSize = '1.25rem';
        msg.style.padding = '16px 32px';
        msg.style.borderRadius = '16px';
        msg.style.boxShadow = '0 4px 24px rgba(59,130,246,0.10)';
        msg.style.zIndex = '200';
        msg.style.opacity = '0';
        msg.style.transition = 'opacity 0.4s';
        section.appendChild(msg);
    }
    setTimeout(() => { msg.style.opacity = '1'; }, 100);
    setTimeout(() => { msg.style.opacity = '0'; }, 1800);
    setTimeout(() => { if (msg) msg.remove(); }, 2400);
} 