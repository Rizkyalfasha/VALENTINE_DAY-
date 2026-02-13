// ============================================
//  ULTRA PREMIUM VALENTINE WEBSITE - JavaScript
//  FIXED VERSION - Auto Scroll Issue
// ============================================

// ===== GLOBAL STATE =====
const AppState = {
    currentSection: 1,
    totalSections: 8,
    quizScore: 0,
    currentQuiz: 1,
    totalQuizQuestions: 4,
    isPlayingMusic: false,
    musicVolume: 0.7,
    particlesCreated: false,
    fireworksActive: false,
    envelopeOpened: false,
    giftOpened: false
};

// ===== DOM CACHE =====
const DOM = {};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c💝 Valentine Website Ultra Loading... 💝', 'color: #ff69b4; font-size: 20px; font-weight: bold;');
    
    cacheDOMElements();
    initializeApp();
    showLoadingScreen();
    
    console.log('%c✨ All Systems Ready! ✨', 'color: #9c27b0; font-size: 16px;');
});

function cacheDOMElements() {
    DOM.bgMusic = document.getElementById('bgMusic');
    DOM.musicBtn = document.getElementById('musicBtn');
    DOM.musicPanel = document.getElementById('musicPanel');
    DOM.volumeSlider = document.getElementById('volumeSlider');
    DOM.landingPage = document.getElementById('landingPage');
    DOM.mainContainer = document.getElementById('mainContainer');
    DOM.startBtn = document.getElementById('startBtn');
    DOM.progressActive = document.getElementById('progressActive');
    DOM.progressPercentage = document.getElementById('progressPercentage');
    DOM.navDots = document.querySelectorAll('.nav-dot');
    DOM.envelopeUltra = document.getElementById('envelopeUltra');
    DOM.envelopeFlap = document.getElementById('envelopeFlap');
    DOM.letterUltra = document.getElementById('letterUltra');
    DOM.giftUltra = document.getElementById('giftUltra');
    DOM.giftUltraWrapper = document.getElementById('giftUltraWrapper');
    DOM.surpriseUltraContent = document.getElementById('surpriseUltraContent');
    DOM.quizContent = document.getElementById('quizContent');
    DOM.quizResult = document.getElementById('quizResult');
    DOM.quizNextBtn = document.getElementById('quizNextBtn');
    DOM.loadingScreen = document.getElementById('loadingScreen');
    DOM.galaxyCanvas = document.getElementById('galaxyCanvas');
    DOM.fireworksCanvas = document.getElementById('fireworksCanvas');
    DOM.auroraCanvas = document.getElementById('auroraCanvas');
    DOM.heartsUniverse = document.getElementById('heartsUniverse');
    DOM.flowersContainer = document.getElementById('flowersContainer');
    DOM.shootingStars = document.getElementById('shootingStars');
    DOM.cursorTrail = document.getElementById('cursorTrail');
}

function initializeApp() {
    if (DOM.bgMusic) {
        DOM.bgMusic.volume = AppState.musicVolume;
    }
    
    setupEventListeners();
    initializeGalaxy();
    initializeAurora();
    startFloatingHearts();
    startFloatingFlowers();
    startShootingStars();
    initializeCursorTrail();
    initializeNavDots();
}

function showLoadingScreen() {
    setTimeout(() => {
        if (DOM.loadingScreen) {
            DOM.loadingScreen.classList.add('hidden');
        }
    }, 2000);
}

function setupEventListeners() {
    if (DOM.startBtn) {
        DOM.startBtn.addEventListener('click', startJourney);
    }
    
    if (DOM.musicBtn) {
        DOM.musicBtn.addEventListener('click', toggleMusic);
    }
    
    if (DOM.volumeSlider) {
        DOM.volumeSlider.addEventListener('input', changeVolume);
    }
    
    if (DOM.envelopeUltra) {
        DOM.envelopeUltra.addEventListener('click', openEnvelope);
    }
    
    if (DOM.giftUltra) {
        DOM.giftUltra.addEventListener('click', openGift);
    }
    
    document.addEventListener('keydown', handleKeyboard);
    
    DOM.navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const section = parseInt(dot.dataset.section);
            navigateSection(section);
        });
    });
}

function startJourney() {
    if (DOM.bgMusic && !AppState.isPlayingMusic) {
        DOM.bgMusic.play().then(() => {
            AppState.isPlayingMusic = true;
            updateMusicButton();
        }).catch(err => {
            console.log('Autoplay prevented:', err);
        });
    }
    
    if (DOM.landingPage) {
        DOM.landingPage.style.opacity = '0';
        setTimeout(() => {
            DOM.landingPage.classList.remove('active');
            DOM.landingPage.style.display = 'none';
        }, 800);
    }
    
    setTimeout(() => {
        if (DOM.mainContainer) {
            DOM.mainContainer.classList.add('active');
        }
        navigateSection(1);
        createMagicEntrance();
    }, 1000);
}

function toggleMusic() {
    if (AppState.isPlayingMusic) {
        DOM.bgMusic.pause();
        AppState.isPlayingMusic = false;
    } else {
        DOM.bgMusic.play().then(() => {
            AppState.isPlayingMusic = true;
        }).catch(err => {
            console.log('Play error:', err);
        });
    }
    updateMusicButton();
}

function updateMusicButton() {
    if (!DOM.musicBtn) return;
    
    const statusText = DOM.musicBtn.querySelector('.music-status');
    if (statusText) {
        statusText.textContent = AppState.isPlayingMusic ? 'Now Playing ♫' : 'Play Music';
    }
    
    const bars = document.querySelectorAll('.music-visualizer .bar');
    bars.forEach(bar => {
        bar.style.animationPlayState = AppState.isPlayingMusic ? 'running' : 'paused';
    });
}

function changeVolume(e) {
    const volume = e.target.value / 100;
    AppState.musicVolume = volume;
    if (DOM.bgMusic) {
        DOM.bgMusic.volume = volume;
    }
}

// ===== FIXED NAVIGATION FUNCTION =====
function navigateSection(sectionNum) {
    if (sectionNum < 1 || sectionNum > AppState.totalSections) return;
    
    // CRITICAL FIX: Scroll to top FIRST before anything else
    window.scrollTo({
        top: 0,
        behavior: 'instant' // Changed from 'smooth' to 'instant' for immediate effect
    });
    
    // Force scroll to top again (backup)
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Hide all sections
    for (let i = 1; i <= AppState.totalSections; i++) {
        const section = document.getElementById(`section${i}`);
        if (section) {
            section.classList.add('hidden');
        }
    }
    
    // Show target section
    const targetSection = document.getElementById(`section${sectionNum}`);
    if (targetSection) {
        targetSection.classList.remove('hidden');
        
        // Update state
        AppState.currentSection = sectionNum;
        
        // Update UI
        updateProgress();
        updateNavDots();
        
        // Trigger section-specific effects
        setTimeout(() => {
            triggerSectionEffects(sectionNum);
        }, 100);
    }
    
    // Force scroll to top one more time after a tiny delay
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 50);
}

function updateProgress() {
    const progress = (AppState.currentSection / AppState.totalSections) * 100;
    
    if (DOM.progressActive) {
        DOM.progressActive.style.width = `${progress}%`;
    }
    
    if (DOM.progressPercentage) {
        DOM.progressPercentage.textContent = `${Math.round(progress)}%`;
    }
}

function updateNavDots() {
    DOM.navDots.forEach(dot => {
        const dotSection = parseInt(dot.dataset.section);
        if (dotSection === AppState.currentSection) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function initializeNavDots() {
    updateNavDots();
}

function triggerSectionEffects(sectionNum) {
    switch(sectionNum) {
        case 1:
            animateWelcomeMessages();
            break;
        case 2:
            animateGalleryItems();
            break;
        case 3:
            animateReasonCards();
            break;
        case 4:
            resetEnvelope();
            break;
        case 5:
            resetQuiz();
            break;
        case 6:
            animateWishCards();
            break;
        case 7:
            resetGiftBox();
            break;
        case 8:
            startCelebrationFireworks();
            break;
    }
}

function animateWelcomeMessages() {
    const messages = document.querySelectorAll('.message-line');
    messages.forEach((msg, index) => {
        setTimeout(() => {
            msg.style.animation = 'none';
            setTimeout(() => {
                msg.style.animation = '';
            }, 10);
        }, index * 200);
    });
}

function animateGalleryItems() {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
        item.style.setProperty('--index', index + 1);
        setTimeout(() => {
            item.style.animation = 'none';
            setTimeout(() => {
                item.style.animation = '';
            }, 10);
        }, index * 150);
    });
}

function animateReasonCards() {
    const cards = document.querySelectorAll('.reason-ultra-card');
    cards.forEach((card, index) => {
        card.style.setProperty('--reason', index + 1);
        setTimeout(() => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = '';
            }, 10);
        }, index * 100);
    });
}

function animateWishCards() {
    const cards = document.querySelectorAll('.wish-ultra-card');
    cards.forEach((card, index) => {
        card.style.setProperty('--wish', index + 1);
        setTimeout(() => {
            card.style.animation = 'none';
            setTimeout(() => {
                card.style.animation = '';
            }, 10);
        }, index * 150);
    });
}

function openEnvelope() {
    if (AppState.envelopeOpened) return;
    
    AppState.envelopeOpened = true;
    DOM.envelopeUltra.classList.add('opening');
    
    createHeartBurst();
    
    setTimeout(() => {
        DOM.envelopeUltra.style.display = 'none';
        if (DOM.letterUltra) {
            DOM.letterUltra.classList.remove('hidden');
        }
    }, 1200);
}

function resetEnvelope() {
    if (!DOM.envelopeUltra || !DOM.letterUltra) return;
    
    AppState.envelopeOpened = false;
    DOM.envelopeUltra.classList.remove('opening');
    DOM.envelopeUltra.style.display = 'block';
    DOM.letterUltra.classList.add('hidden');
}

function resetQuiz() {
    AppState.quizScore = 0;
    AppState.currentQuiz = 1;
    
    const cards = document.querySelectorAll('.quiz-card');
    cards.forEach(card => card.classList.remove('active'));
    
    const firstCard = document.querySelector('.quiz-card[data-question="1"]');
    if (firstCard) {
        firstCard.classList.add('active');
    }
    
    if (DOM.quizResult) {
        DOM.quizResult.classList.add('hidden');
        DOM.quizResult.classList.remove('active');
    }
    
    if (DOM.quizNextBtn) {
        DOM.quizNextBtn.style.display = 'none';
    }
    
    const options = document.querySelectorAll('.option-ultra');
    options.forEach(opt => {
        opt.classList.remove('correct', 'wrong');
        opt.disabled = false;
    });
    
    updateQuizProgress();
}

function answerQuiz(questionNum, isCorrect, element) {
    const currentCard = document.querySelector(`.quiz-card[data-question="${questionNum}"]`);
    const options = currentCard.querySelectorAll('.option-ultra');
    options.forEach(opt => opt.disabled = true);
    
    if (isCorrect) {
        element.classList.add('correct');
        AppState.quizScore++;
        createSparkles(element);
    } else {
        element.classList.add('wrong');
        options.forEach(opt => {
            if (opt.dataset.correct === 'true') {
                setTimeout(() => {
                    opt.classList.add('correct');
                }, 500);
            }
        });
    }
    
    setTimeout(() => {
        if (questionNum < AppState.totalQuizQuestions) {
            AppState.currentQuiz = questionNum + 1;
            currentCard.classList.remove('active');
            const nextCard = document.querySelector(`.quiz-card[data-question="${AppState.currentQuiz}"]`);
            if (nextCard) {
                nextCard.classList.add('active');
            }
            updateQuizProgress();
        } else {
            setTimeout(() => {
                showQuizResult();
            }, 1000);
        }
    }, 1500);
}

function updateQuizProgress() {
    const steps = document.querySelectorAll('.progress-step');
    steps.forEach((step, index) => {
        const stepNum = index + 1;
        if (stepNum === AppState.currentQuiz) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else if (stepNum < AppState.currentQuiz) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else {
            step.classList.remove('active', 'completed');
        }
    });
}

function showQuizResult() {
    const cards = document.querySelectorAll('.quiz-card');
    cards.forEach(card => card.classList.remove('active'));
    
    if (DOM.quizResult) {
        DOM.quizResult.classList.remove('hidden');
        DOM.quizResult.classList.add('active');
    }
    
    const scoreElement = document.getElementById('scoreNumber');
    if (scoreElement) {
        scoreElement.textContent = AppState.quizScore;
    }
    
    const messageElement = document.getElementById('resultMessage');
    const iconElement = document.getElementById('resultIcon');
    const starsElement = document.getElementById('resultStars');
    
    let message = '';
    let icon = '🎉';
    let stars = '';
    
    if (AppState.quizScore === 4) {
        message = 'SEMPURNA! Kamu benar-benar mengenalku dengan sangat baik! Aku sangat tersentuh! 😊💖';
        icon = '🎉';
        stars = '⭐⭐⭐⭐⭐';
        createMegaFireworks();
    } else if (AppState.quizScore === 3) {
        message = 'Hebat sekali! Kamu mengenalku dengan baik! Masih ada satu yang terlewat, tapi tidak apa-apa! 😄✨';
        icon = '👏';
        stars = '⭐⭐⭐⭐';
        createConfettiExplosion();
    } else if (AppState.quizScore === 2) {
        message = 'Bagus! Kamu cukup mengenalku! Kita masih punya banyak waktu untuk saling mengenal lebih dalam! 😊';
        icon = '💕';
        stars = '⭐⭐⭐';
    } else if (AppState.quizScore === 1) {
        message = 'Tidak apa-apa! Ini berarti kita punya banyak hal menarik untuk dipelajari satu sama lain! 🤗';
        icon = '💪';
        stars = '⭐⭐';
    } else {
        message = 'Hehe, sepertinya kita perlu menghabiskan lebih banyak waktu bersama ya! Dan itu adalah hal yang menyenangkan! 😅💝';
        icon = '🎭';
        stars = '⭐';
    }
    
    if (messageElement) messageElement.textContent = message;
    if (iconElement) iconElement.textContent = icon;
    if (starsElement) starsElement.textContent = stars;
    
    if (DOM.quizNextBtn) {
        DOM.quizNextBtn.style.display = 'inline-flex';
    }
}

function openGift() {
    if (AppState.giftOpened) return;
    
    AppState.giftOpened = true;
    DOM.giftUltra.classList.add('opening');
    
    createMegaConfetti();
    
    setTimeout(() => {
        if (DOM.giftUltraWrapper) {
            DOM.giftUltraWrapper.classList.add('hidden');
        }
        if (DOM.surpriseUltraContent) {
            DOM.surpriseUltraContent.classList.remove('hidden');
        }
        createHeartExplosion();
    }, 1200);
}

function resetGiftBox() {
    if (!DOM.giftUltra || !DOM.giftUltraWrapper || !DOM.surpriseUltraContent) return;
    
    AppState.giftOpened = false;
    DOM.giftUltra.classList.remove('opening');
    DOM.giftUltraWrapper.classList.remove('hidden');
    DOM.surpriseUltraContent.classList.add('hidden');
}

function createHeartBurst() {
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.textContent = ['💖', '💝', '💗', '💕', '💓'][Math.floor(Math.random() * 5)];
        heart.style.position = 'fixed';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.fontSize = '30px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '10000';
        
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 5 + Math.random() * 3;
        
        document.body.appendChild(heart);
        
        let x = 0;
        let y = 0;
        let opacity = 1;
        
        const animate = () => {
            x += Math.cos(angle) * velocity;
            y += Math.sin(angle) * velocity;
            opacity -= 0.015;
            
            heart.style.transform = `translate(${x}px, ${y}px) rotate(${x}deg)`;
            heart.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                heart.remove();
            }
        };
        
        animate();
    }
}

function createHeartExplosion() {
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.textContent = ['💖', '💝', '💗', '💕', '💓', '❤️'][Math.floor(Math.random() * 6)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * window.innerWidth + 'px';
            heart.style.top = '-50px';
            heart.style.fontSize = (Math.random() * 40 + 30) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '10000';
            
            document.body.appendChild(heart);
            
            let y = -50;
            let rotation = 0;
            let opacity = 1;
            
            const animate = () => {
                y += 8;
                rotation += 10;
                
                heart.style.top = y + 'px';
                heart.style.transform = `rotate(${rotation}deg)`;
                
                if (y > window.innerHeight + 50) {
                    opacity -= 0.1;
                    heart.style.opacity = opacity;
                }
                
                if (y < window.innerHeight + 100) {
                    requestAnimationFrame(animate);
                } else {
                    heart.remove();
                }
            };
            
            animate();
        }, i * 80);
    }
}

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    
    for (let i = 0; i < 15; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = rect.left + (rect.width / 2) + 'px';
        sparkle.style.top = rect.top + (rect.height / 2) + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '10000';
        sparkle.style.fontSize = '25px';
        
        document.body.appendChild(sparkle);
        
        const angle = (Math.PI * 2 * i) / 15;
        let distance = 0;
        let opacity = 1;
        
        const animate = () => {
            distance += 5;
            opacity -= 0.02;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            sparkle.style.transform = `translate(${x}px, ${y}px) rotate(${distance * 2}deg)`;
            sparkle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                sparkle.remove();
            }
        };
        
        animate();
    }
}

function createConfettiExplosion() {
    const container = document.getElementById('confettiExplosion');
    if (!container) return;
    
    const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#c71585', '#ffd700', '#9c27b0'];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        
        container.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

function createMegaConfetti() {
    for (let i = 0; i < 200; i++) {
        const confetti = document.createElement('div');
        const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffc0cb', '#c71585', '#ffd700', '#9c27b0', '#673ab7'];
        confetti.textContent = '🎊';
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-50px';
        confetti.style.fontSize = (Math.random() * 30 + 20) + 'px';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '10000';
        confetti.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(confetti);
        
        let y = -50;
        let rotation = 0;
        let opacity = 1;
        const speed = Math.random() * 5 + 3;
        
        const animate = () => {
            y += speed;
            rotation += 15;
            
            confetti.style.top = y + 'px';
            confetti.style.transform = `rotate(${rotation}deg)`;
            
            if (y > window.innerHeight) {
                opacity -= 0.1;
                confetti.style.opacity = opacity;
            }
            
            if (opacity > 0 && y < window.innerHeight + 100) {
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        };
        
        setTimeout(() => {
            animate();
        }, i * 20);
    }
}

function createMagicEntrance() {
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const star = document.createElement('div');
            star.textContent = '⭐';
            star.style.position = 'fixed';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.fontSize = '30px';
            star.style.pointerEvents = 'none';
            star.style.zIndex = '10000';
            star.style.opacity = '0';
            
            document.body.appendChild(star);
            
            let scale = 0;
            let opacity = 0;
            
            const animate = () => {
                scale += 0.05;
                opacity += 0.05;
                
                star.style.transform = `scale(${scale}) rotate(${scale * 100}deg)`;
                star.style.opacity = opacity;
                
                if (opacity < 1) {
                    requestAnimationFrame(animate);
                } else {
                    setTimeout(() => {
                        let fadeOpacity = 1;
                        const fadeOut = () => {
                            fadeOpacity -= 0.02;
                            star.style.opacity = fadeOpacity;
                            if (fadeOpacity > 0) {
                                requestAnimationFrame(fadeOut);
                            } else {
                                star.remove();
                            }
                        };
                        fadeOut();
                    }, 1000);
                }
            };
            
            animate();
        }, i * 50);
    }
}

function createMegaFireworks() {
    if (!DOM.fireworksCanvas) return;
    
    DOM.fireworksCanvas.style.display = 'block';
    const ctx = DOM.fireworksCanvas.getContext('2d');
    DOM.fireworksCanvas.width = window.innerWidth;
    DOM.fireworksCanvas.height = window.innerHeight;
    
    const fireworks = [];
    const particles = [];
    
    class Firework {
        constructor() {
            this.x = Math.random() * DOM.fireworksCanvas.width;
            this.y = DOM.fireworksCanvas.height;
            this.targetY = Math.random() * DOM.fireworksCanvas.height / 2;
            this.speed = 8;
            this.exploded = false;
        }
        
        update() {
            if (!this.exploded) {
                this.y -= this.speed;
                if (this.y <= this.targetY) {
                    this.explode();
                    this.exploded = true;
                }
            }
        }
        
        draw() {
            if (!this.exploded) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.fill();
            }
        }
        
        explode() {
            const colors = ['#ff69b4', '#ff1493', '#ffd700', '#9c27b0', '#00f2fe', '#43e97b'];
            const particleCount = 80;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(
                    this.x,
                    this.y,
                    colors[Math.floor(Math.random() * colors.length)]
                ));
            }
        }
    }
    
    class Particle {
        constructor(x, y, color) {
            this.x = x;
            this.y = y;
            this.color = color;
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 8 + 4;
            this.velocity = {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
            };
            this.alpha = 1;
            this.decay = Math.random() * 0.015 + 0.01;
            this.gravity = 0.2;
        }
        
        update() {
            this.velocity.y += this.gravity;
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            this.alpha -= this.decay;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.restore();
        }
    }
    
    let frameCount = 0;
    const maxFrames = 300;
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, DOM.fireworksCanvas.width, DOM.fireworksCanvas.height);
        
        if (frameCount < maxFrames && Math.random() < 0.15) {
            fireworks.push(new Firework());
        }
        
        for (let i = fireworks.length - 1; i >= 0; i--) {
            fireworks[i].update();
            fireworks[i].draw();
            if (fireworks[i].exploded) {
                fireworks.splice(i, 1);
            }
        }
        
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].alpha <= 0) {
                particles.splice(i, 1);
            }
        }
        
        frameCount++;
        
        if (frameCount < maxFrames || particles.length > 0) {
            requestAnimationFrame(animate);
        } else {
            DOM.fireworksCanvas.style.display = 'none';
        }
    }
    
    animate();
}

function startCelebrationFireworks() {
    createMegaFireworks();
    createHeartExplosion();
}

function restartJourney() {
    navigateSection(1);
}

function handleKeyboard(e) {
    if (!DOM.mainContainer.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight' && AppState.currentSection < AppState.totalSections) {
        navigateSection(AppState.currentSection + 1);
    } else if (e.key === 'ArrowLeft' && AppState.currentSection > 1) {
        navigateSection(AppState.currentSection - 1);
    }
}

function startFloatingHearts() {
    setInterval(() => {
        if (!DOM.heartsUniverse) return;
        
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = ['💖', '💝', '💗', '💕', '💓', '❤️'][Math.floor(Math.random() * 6)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 5 + 10) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        DOM.heartsUniverse.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 17000);
    }, 3000);
}

function startFloatingFlowers() {
    setInterval(() => {
        if (!DOM.flowersContainer) return;
        
        const flower = document.createElement('div');
        flower.className = 'floating-flower';
        flower.textContent = ['🌹', '🌺', '🌸', '🌼', '🌻', '🌷'][Math.floor(Math.random() * 6)];
        flower.style.left = Math.random() * 100 + '%';
        flower.style.animationDuration = (Math.random() * 8 + 15) + 's';
        flower.style.animationDelay = Math.random() * 3 + 's';
        
        DOM.flowersContainer.appendChild(flower);
        
        setTimeout(() => {
            flower.remove();
        }, 25000);
    }, 5000);
}

function startShootingStars() {
    if (!DOM.shootingStars) return;
    
    setInterval(() => {
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.top = Math.random() * 50 + '%';
        star.style.right = '0';
        
        DOM.shootingStars.appendChild(star);
        
        setTimeout(() => {
            star.remove();
        }, 3000);
    }, 8000);
}

function initializeGalaxy() {
    if (!DOM.galaxyCanvas) return;
    
    const ctx = DOM.galaxyCanvas.getContext('2d');
    DOM.galaxyCanvas.width = window.innerWidth;
    DOM.galaxyCanvas.height = window.innerHeight;
    
    const stars = [];
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * DOM.galaxyCanvas.width,
            y: Math.random() * DOM.galaxyCanvas.height,
            radius: Math.random() * 2.5,
            opacity: Math.random(),
            speed: Math.random() * 0.5 + 0.2
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, DOM.galaxyCanvas.width, DOM.galaxyCanvas.height);
        
        stars.forEach(star => {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.fill();
            
            star.opacity += star.speed * 0.01;
            if (star.opacity > 1 || star.opacity < 0) {
                star.speed *= -1;
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

function initializeAurora() {
    if (!DOM.auroraCanvas) return;
    
    const ctx = DOM.auroraCanvas.getContext('2d');
    DOM.auroraCanvas.width = window.innerWidth;
    DOM.auroraCanvas.height = window.innerHeight;
    
    let time = 0;
    
    function drawAurora() {
        ctx.clearRect(0, 0, DOM.auroraCanvas.width, DOM.auroraCanvas.height);
        
        const gradient = ctx.createLinearGradient(0, 0, DOM.auroraCanvas.width, DOM.auroraCanvas.height);
        gradient.addColorStop(0, `rgba(255, 105, 180, ${0.1 + Math.sin(time) * 0.05})`);
        gradient.addColorStop(0.5, `rgba(156, 39, 176, ${0.1 + Math.cos(time) * 0.05})`);
        gradient.addColorStop(1, `rgba(103, 58, 183, ${0.1 + Math.sin(time + 1) * 0.05})`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, DOM.auroraCanvas.width, DOM.auroraCanvas.height);
        
        time += 0.01;
        requestAnimationFrame(drawAurora);
    }
    
    drawAurora();
}

function initializeCursorTrail() {
    if (!DOM.cursorTrail) return;
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (Math.random() < 0.3) {
            const dot = document.createElement('div');
            dot.className = 'trail-dot';
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
            
            DOM.cursorTrail.appendChild(dot);
            
            setTimeout(() => {
                dot.remove();
            }, 800);
        }
    });
}

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (DOM.galaxyCanvas) {
            DOM.galaxyCanvas.width = window.innerWidth;
            DOM.galaxyCanvas.height = window.innerHeight;
        }
        if (DOM.auroraCanvas) {
            DOM.auroraCanvas.width = window.innerWidth;
            DOM.auroraCanvas.height = window.innerHeight;
        }
        if (DOM.fireworksCanvas) {
            DOM.fireworksCanvas.width = window.innerWidth;
            DOM.fireworksCanvas.height = window.innerHeight;
        }
    }, 250);
});

console.log('%c💝 VALENTINE WEBSITE ULTRA 💝', 'color: #ff69b4; font-size: 24px; font-weight: bold;');
console.log('%c✨ Dibuat dengan penuh kasih sayang ✨', 'color: #9c27b0; font-size: 16px;');
