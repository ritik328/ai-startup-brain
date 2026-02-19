/* 
   AI STARTUP BRAIN — Core Logic
   Handles: Scroll reveals, Typing animation, Counter animation, AI simulation
*/

document.addEventListener('DOMContentLoaded', function () {

    // --- 0. THEME TOGGLE ---
    const html = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';

    // Apply saved theme immediately
    html.setAttribute('data-theme', savedTheme);
    updateToggleIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateToggleIcon(next);
        });
    }

    function updateToggleIcon(theme) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // --- 1. SCROLL REVEAL ANIMATION ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // If it's a counter, trigger count up
                if (entry.target.classList.contains('count-up-trigger')) {
                    startCounters(entry.target);
                }
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 2. TYPING ANIMATION (HERO) ---
    const typingSpan = document.querySelector('.typing-text');
    if (typingSpan) {
        const words = [
            "Analyzing global market trends...",
            "Generating winning startup models...",
            "Predicting growth potential...",
            "Designing your success roadmap..."
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 50;

        function type() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typingSpan.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 30;
            } else {
                typingSpan.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 50;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before new word
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1000);
    }

    // --- 3. COUNTER ANIMATION ---
    let countersStarted = false;
    function startCounters(section) {
        if (countersStarted) return;
        const counters = section.querySelectorAll('.counter-anim');

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.innerText = Math.ceil(current).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target.toLocaleString() + (counter.getAttribute('data-suffix') || '');
                }
            };
            updateCounter();
        });
        countersStarted = true;
    }

    // --- 4. ADVANCED AI SIMULATION LOGIC (DEMO PAGE) ---
    const startupForm = document.getElementById('startup-form');
    if (startupForm) {
        startupForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const inputPanel = document.getElementById('input-panel');
            const loadingPanel = document.getElementById('loading-panel');
            const resultsPanel = document.getElementById('results-panel');

            // Hide input, show loading
            inputPanel.classList.add('d-none');
            loadingPanel.classList.remove('d-none');

            // Animate loading steps
            const steps = loadingPanel.querySelectorAll('.loading-step');
            steps.forEach((step, i) => {
                const delay = parseInt(step.getAttribute('data-delay'));
                setTimeout(() => {
                    step.classList.add('active');
                    setTimeout(() => step.classList.add('done'), 300);
                }, delay);
            });

            // Animate loading bar
            setTimeout(() => {
                document.getElementById('loading-bar').style.width = '100%';
            }, 100);

            // Show results after loading
            setTimeout(() => {
                loadingPanel.classList.add('d-none');
                resultsPanel.classList.remove('d-none');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                generateAdvancedResults();
            }, 3800);
        });
    }

    function generateAdvancedResults() {
        const industry = document.getElementById('industry-select').value;
        const budget = document.getElementById('budget-select').value;
        const skill = document.getElementById('skill-select').value;

        // ─── DATA ENGINE ───
        const data = {
            tech: {
                names: ["CodeNova", "SyncStack", "DevPulse AI", "InfraHive", "NexaCloud"],
                taglines: [
                    "Engineering the future of work.",
                    "Where code meets intelligence.",
                    "Build faster. Ship smarter."
                ],
                audience: "Tech startups, SMB developers, and engineering teams building modern products.",
                problem: "Small development teams waste 30-40% of their time on repetitive infrastructure tasks, slowing down product innovation and increasing time-to-market.",
                solution: "An AI-powered dev platform that automates boilerplate, optimizes CI/CD pipelines, and provides intelligent code suggestions — reducing setup time by 70%.",
                model: "SaaS Subscription — Free tier (1 project), Pro ($29/mo), Teams ($99/mo per seat).",
                marketing: "Developer content marketing via technical blogs, open-source contributions, and conference sponsorships. Product-led growth with a generous free tier.",
                roadmap: [
                    "Validate demand with 50 beta users from developer communities",
                    "Launch MVP with core automation features on Product Hunt",
                    "Build integrations with GitHub, GitLab, and VS Code",
                    "Introduce team collaboration and enterprise SSO",
                    "Scale to 10k+ users with Series A funding and API marketplace"
                ]
            },
            ecommerce: {
                names: ["ShopVerse", "CartWave", "BuyLoop", "TrendBridge", "NexStore"],
                taglines: [
                    "Shopping, reinvented.",
                    "Where trends meet transactions.",
                    "Discover. Click. Delivered."
                ],
                audience: "Gen Z and millennial online shoppers who value convenience, personalization, and sustainability.",
                problem: "Online shoppers are overwhelmed by generic product recommendations and fragmented shopping experiences across multiple platforms.",
                solution: "A unified AI-curated shopping platform that personalizes product discovery across brands, with one-click checkout and sustainable packaging options.",
                model: "Marketplace Commission (8-12%) + Premium Seller Subscriptions ($49/mo for analytics dashboard).",
                marketing: "Influencer partnerships on TikTok and Instagram, referral rewards program, and seasonal flash sale campaigns.",
                roadmap: [
                    "Launch a curated marketplace with 50 verified sustainable brands",
                    "Build AI recommendation engine based on browsing behavior",
                    "Introduce social shopping features (wishlists, group buys)",
                    "Expand to mobile app with AR try-on for fashion items",
                    "Scale internationally with local fulfillment partnerships"
                ]
            },
            health: {
                names: ["VitalSync", "MindBody AI", "PulseTrack", "WellNova", "ZenCore"],
                taglines: [
                    "Wellness, powered by data.",
                    "Your health. Your insights. Your control.",
                    "Feel better, live smarter."
                ],
                audience: "Health-conscious professionals aged 25-45 seeking data-driven wellness and preventive care solutions.",
                problem: "People struggle to maintain consistent health habits due to lack of personalized guidance and disconnected health data from wearables, labs, and apps.",
                solution: "A unified health dashboard that aggregates data from wearables, provides AI-powered lifestyle recommendations and connects users with certified coaches.",
                model: "Freemium App — Free (basic tracking), Premium ($14.99/mo for AI coaching and lab integrations).",
                marketing: "Partnerships with fitness influencers, corporate wellness programs, and content marketing through health-focused podcasts and newsletters.",
                roadmap: [
                    "Launch basic health tracking app with Apple Health / Google Fit sync",
                    "Add AI nutrition and sleep recommendations engine",
                    "Partner with 20+ corporate wellness programs for B2B revenue",
                    "Integrate lab results and telehealth consultations",
                    "Expand globally with localized health benchmarks and multilingual support"
                ]
            },
            fintech: {
                names: ["PayGrid", "CoinFlow", "LedgerAI", "FinStack", "VaultEdge"],
                taglines: [
                    "Smart money. Smarter decisions.",
                    "Finance without the friction.",
                    "Your money, automated."
                ],
                audience: "Small business owners and freelancers who need simple, intelligent financial management tools.",
                problem: "Small businesses lose an average of $10k/year due to poor invoicing, late payments, and manual bookkeeping errors.",
                solution: "An AI-powered financial assistant that automates invoicing, predicts cash flow, flags anomalies, and provides real-time tax optimization suggestions.",
                model: "Transaction Fees (1.2% per payment processed) + Premium Plan ($39/mo for advanced analytics and multi-currency).",
                marketing: "Partnerships with accounting firms, SMB-focused webinars, and strategic integrations with platforms like Shopify, QuickBooks, and Stripe.",
                roadmap: [
                    "Launch smart invoicing with automated payment reminders",
                    "Add AI cash flow prediction and expense categorization",
                    "Obtain payment processing license and launch payment gateway",
                    "Build API for third-party integrations and accounting tools",
                    "Expand to multi-currency support and cross-border payments"
                ]
            },
            edtech: {
                names: ["LearnPulse", "SkillForge", "BrainPath AI", "EduNova", "ClassVerse"],
                taglines: [
                    "Learn anything. Master everything.",
                    "Education that adapts to you.",
                    "Knowledge, without limits."
                ],
                audience: "Students and lifelong learners aged 16-35 seeking personalized, adaptive learning paths.",
                problem: "Traditional online courses have a 90% dropout rate because they use a one-size-fits-all approach that ignores individual learning styles and pacing.",
                solution: "An adaptive learning platform that uses AI to adjust content difficulty, format, and pacing in real-time based on each student's performance and engagement.",
                model: "Course Subscription — Free (3 courses/mo), Student ($9.99/mo), Pro ($24.99/mo with certifications).",
                marketing: "Partnerships with universities, student ambassador programs, and SEO-driven content targeting high-intent learning queries.",
                roadmap: [
                    "Launch with 100 curated micro-courses across tech and business",
                    "Build adaptive AI engine that personalizes learning paths",
                    "Partner with 10+ universities for credit-bearing certifications",
                    "Introduce peer learning, study groups, and mentorship matching",
                    "Expand to corporate L&D market with enterprise dashboards"
                ]
            }
        };

        const plan = data[industry] || data.tech;

        // ─── POPULATE PLAN ───
        const name = plan.names[Math.floor(Math.random() * plan.names.length)];
        const tagline = plan.taglines[Math.floor(Math.random() * plan.taglines.length)];

        document.getElementById('res-name').innerText = name;
        document.getElementById('res-tagline').innerText = '"' + tagline + '"';
        document.getElementById('res-audience').innerText = plan.audience;
        document.getElementById('res-model').innerText = plan.model;
        document.getElementById('res-problem').innerText = plan.problem;
        document.getElementById('res-solution').innerText = plan.solution;
        document.getElementById('res-marketing').innerText = plan.marketing;

        // Funding estimate based on budget
        const fundingMap = {
            low: "$500 – $2,000 (Bootstrap Phase)",
            medium: "$5,000 – $25,000 (Pre-Seed)",
            high: "$50,000 – $250,000 (Seed Round)"
        };
        document.getElementById('res-funding').innerText = fundingMap[budget] || fundingMap.medium;

        // Roadmap
        const roadmapContainer = document.getElementById('res-roadmap');
        roadmapContainer.innerHTML = '';
        plan.roadmap.forEach((step, i) => {
            roadmapContainer.innerHTML += `
                <div class="roadmap-step">
                    <div class="step-num">${i + 1}</div>
                    <div class="step-text">${step}</div>
                </div>
            `;
        });

        // ─── METRICS ───
        const confidence = Math.floor(Math.random() * 13) + 85; // 85-97
        const market = Math.floor(Math.random() * 18) + 78; // 78-95
        const strength = Math.floor(Math.random() * 15) + 82; // 82-96
        const circumference = 339.3; // 2 * π * 54

        document.getElementById('res-confidence').innerText = confidence + '%';
        document.getElementById('res-market').innerText = market + '%';
        document.getElementById('res-strength').innerText = strength;

        setTimeout(() => {
            document.getElementById('confidence-circle').style.strokeDashoffset =
                circumference - (circumference * confidence / 100);
            document.getElementById('market-circle').style.strokeDashoffset =
                circumference - (circumference * market / 100);
            document.getElementById('strength-circle').style.strokeDashoffset =
                circumference - (circumference * strength / 100);
        }, 200);
    }

    // --- 5. REVENUE GRAPH ANIMATION (FEATURES PAGE) ---
    const revenueGraph = document.querySelector('.revenue-graph');
    if (revenueGraph) {
        const graphObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    const bars = entry.target.querySelectorAll('.revenue-bar');
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.height = bar.getAttribute('data-height');
                        }, index * 200);
                    });
                    graphObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        graphObserver.observe(revenueGraph);
    }

    // --- 6. NAVBAR SCROLL SHADOW ---
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 10) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    // --- 7. 3D TILT EFFECT ---
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation based on mouse position (max 10 degrees)
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease'; // Smooth reset
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease-out'; // Fast response on enter
        });
    });
});
