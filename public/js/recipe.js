// 初始化 GSAP
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener("DOMContentLoaded", () => {
    // 導航欄動畫
    const header = document.querySelector("header");
    gsap.to("nav", {
        scrollTrigger: {
            start: "top top",
            end: "+=100",
            toggleClass: {
                targets: "nav",
                className: "scrolled"
            }
        }
    });

    // 首頁標題動畫
    const headerTimeline = gsap.timeline();
    headerTimeline
        .from(".header h1", {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
        .from(".header p", {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5");

    // 背景視差效果
    gsap.to(".header", {
        scrollTrigger: {
            trigger: ".header",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        backgroundPosition: "50% 100%",
        ease: "none"
    });

    // 卡片動畫
    const cards = gsap.utils.toArray(".card");
    cards.forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            y: 60,
            opacity: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power2.out"
        });
    });

    // 食材部分滾動動畫
    gsap.utils.toArray(".ingredient-card").forEach((card, i) => {
        const direction = i % 2 === 0 ? -50 : 50;
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            },
            x: direction,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // 技巧步驟動畫
    gsap.utils.toArray(".step-item").forEach((step, i) => {
        gsap.from(step, {
            scrollTrigger: {
                trigger: step,
                start: "top bottom-=50",
                toggleActions: "play none none reverse"
            },
            x: -50,
            opacity: 0,
            duration: 0.5,
            delay: i * 0.2,
            ease: "power1.out"
        });
    });

    // 文化部分淡入動畫
    const cultureSections = gsap.utils.toArray(".culture-card");
    cultureSections.forEach(section => {
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            }
        });

        timeline
            .from(section.querySelector(".culture-image"), {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            })
            .from(section.querySelector(".culture-text"), {
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.4");
    });

    // 平滑滾動
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 70
                },
                ease: "power2.inOut"
            });
        });
    });

    // 表單動畫
    const formElements = document.querySelectorAll('.contact-form .form-control, .contact-form .form-select');
    formElements.forEach((element, i) => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top bottom-=50",
                toggleActions: "play none none reverse"
            },
            y: 20,
            opacity: 0,
            duration: 0.4,
            delay: i * 0.1,
            ease: "power2.out"
        });
    });

    // 圖片載入動畫
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (img.complete) {
            imageLoaded(img);
        } else {
            img.addEventListener('load', () => imageLoaded(img));
        }
    });

    function imageLoaded(img) {
        gsap.from(img, {
            duration: 0.6,
            opacity: 0,
            scale: 1.1,
            ease: "power2.out"
        });
    }

    // 滾動進度指示器
    gsap.to(".progress-bar", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });
});

// 頁面載入完成後的動畫
window.addEventListener('load', () => {
    const loadTimeline = gsap.timeline();
    
    loadTimeline
        .to('body', {
            visibility: 'visible',
            duration: 0
        })
        .from('.navbar', {
            y: -100,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        })
        .from('.header-content', {
            y: 100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.4");
});

// 滾動到頂部按鈕動畫
const scrollTopButton = document.querySelector('.scroll-top');
if (scrollTopButton) {
    ScrollTrigger.create({
        start: 400,
        end: 99999,
        toggleClass: {
            targets: scrollTopButton,
            className: "active"
        }
    });

    scrollTopButton.addEventListener('click', () => {
        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: 0
            },
            ease: "power2.inOut"
        });
    });
}