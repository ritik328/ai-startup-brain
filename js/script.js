// --- DATA DEPOSITORIES ---
const industries = {
    "SaaS": {
        prefixes: ["Cloud", "Nex", "Zenith", "Flow", "Sync", "App", "Node", "Vector"],
        suffixes: ["ify", "ly", "Core", "Node", "Vault", "Bridge", "Optic", "Pulse"],
        problems: "Fragmented workflows and data silos are manual bottlenecks that prevent scaling. Deeply siloed data prevents legacy systems from achieving data entry efficiency.",
        solutions: "A centralized AI-driven orchestration platform that eliminates fragmented manual processes and automates 90% of data entry. Optimized for customer acquisition growth.",
        models: ["B2B Tiered Subscription", "Usage-linked Pricing", "Flat Enterprise Licensing"],
        audience: "Mid-sized Tech Companies and Distributed Agile Teams"
    },
    "FinTech": {
        prefixes: ["Ledger", "Mint", "Safe", "Vault", "Coin", "Prime", "Yield", "Stash"],
        suffixes: ["Pay", "Wealth", "Flow", "Bank", "Trust", "Capital", "Net", "Chain"],
        problems: "High transaction fees and slow settlement times in commerce are a manual burden. Fragmented payment rails create legacy data entry errors.",
        solutions: "Next-gen decentralized settlement layer providing instant liquidity via automated smart-contracts. Disrupts high-fee manual commerce methods.",
        models: ["Dynamic Transaction Fees", "Institutional Subscription", "Yield-sharing Model"],
        audience: "Global E-commerce Merchants and Cross-border Traders"
    },
    "HealthTech": {
        prefixes: ["Vital", "Cure", "Bio", "Pulse", "Medi", "Omni", "Genome", "Life"],
        suffixes: ["Scan", "Care", "Link", "Heart", "Base", "Node", "Sync", "Guard"],
        problems: "Patient data fragmentation and reactive non-automated wellness management. Manual data entry in legacy EHR systems limits healthcare workflows.",
        solutions: "Continuous biometric monitoring platform with predictive workflows for early prevention. Replaces manual diagnostics with automated AI monitoring.",
        models: ["Premium Healthcare Subscription", "Payer Partnership Fees", "Corporate Wellness SaaS"],
        audience: "Preventative Wellness Communities and Modern Health Providers"
    },
    "Sustainability": {
        prefixes: ["Leaf", "Eco", "Green", "Terra", "Pure", "Bloom", "Carbon", "Earth"],
        suffixes: ["Loop", "Grid", "Cycle", "Roots", "Wave", "Renew", "Trace", "Point"],
        problems: "Supply chain transparency in retail commerce is a manual verification nightmare. Fragmented ESG reporting relies on non-automated data entry.",
        solutions: "Blockchain-verified supply chain tracker providing real-time ESG workflows for every SKU. Eliminates manual verification in sustainability compliance.",
        models: ["Carbon Credit Transaction Fees", "ESG Reporting Subscription", "Impact Premiums"],
        audience: "Eco-conscious Retail Brands and Supply Chain Regulators"
    },
    "E-commerce": {
        prefixes: ["Shop", "Cart", "Market", "Trade", "Buy", "Sell", "Omni", "Swift"],
        suffixes: ["ly", "Zone", "Hub", "Spree", "Dash", "Flow", "Store", "Edge"],
        problems: "Rising customer acquisition costs and low retention in fragmented commerce markets. Manual inventory workflows slow down modern retail growth.",
        solutions: "AI-driven personalization engine that predicts workflows to increase conversion. Automates customer acquisition and manual retail data entry.",
        models: ["Revenue Share Commission", "Direct-to-Consumer Subscription", "Loyalty SaaS"],
        audience: "D2C Brands and Gen Z Consumer Platforms"
    },
    "Education": {
        prefixes: ["Learn", "Skill", "Brain", "Mind", "Study", "Teach", "Path", "Wise"],
        suffixes: ["Up", "Lab", "Academy", "Path", "Quest", "Master", "Flow", "Base"],
        problems: "Static curriculum in legacy education systems fails to adapt. Manual grading and fragmented feedback loops slow down student workflows.",
        solutions: "Adaptive learning orchestration platform that uses AI to automate curriculum workflows. Replaces manual grading with automated cognitive feedback.",
        models: ["B2C Learning Subscription", "Institutional Licensing", "Certification-as-a-Service"],
        audience: "Lifelong Learners and Reskilling-focused Enterprises"
    }
};

const defaultData = {
    prefixes: ["Venture", "Omni", "Core", "Hyper", "Meta"],
    suffixes: ["Launch", "Forge", "Mind", "Base", "Link"]
};

// --- THEME MANAGEMENT REMOVED (Forced Dark) ---
// const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
// const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            menu.classList.add('flex');
        } else {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
        }
    }
}

// --- CORE NAVIGATION ---
function navigateTo(pageId) {
    // Update active link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.id === `link-${pageId}`) {
            link.classList.add('active');
        }
    });

    // Switch pages
    document.querySelectorAll('.page-container').forEach(page => {
        page.classList.add('hidden-page');
        page.style.opacity = '0';
    });

    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.remove('hidden-page');
        setTimeout(() => {
            targetPage.style.opacity = '1';
            // Trigger page-specific animations
            if (pageId === 'home') initHomeAnimations();
            window.scrollTo(0, 0);
        }, 50);
    }
}

// --- HOME PAGE ANIMATIONS ---
const typingText = document.getElementById('typing-text');
const phrases = [
    "Analyzing market trends...",
    "Generating startup models...",
    "Predicting success potential...",
    "Scoping target audiences..."
];
let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;

function type() {
    if (!typingText) return;
    const currentPhrase = phrases[phraseIdx];
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIdx + 1);
        charIdx++;
    }

    let typeSpeed = isDeleting ? 30 : 100;

    if (!isDeleting && charIdx === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

function initHomeAnimations() {
    // Reset counters
    document.querySelectorAll('.counter').forEach(counter => {
        const target = parseInt(counter.dataset.target);
        const updateCounter = () => {
            const count = +counter.innerText.replace(/,/g, '');
            const speed = target / 50;
            if (count < target) {
                counter.innerText = Math.ceil(count + speed);
                setTimeout(updateCounter, 30);
            } else {
                counter.innerText = target.toLocaleString() + (target === 92 ? "" : "+");
            }
        };
        counter.innerText = '0';
        updateCounter();
    });
}

// --- INTELLIGENCE HELPERS V2 ---
const termMapping = {
    'coffee': ['Beverage Culture', 'Direct-to-Consumer', 'Supply Chain Traceability', 'Retail Experience'],
    'roaster': ['Automated Roasting', 'Subscription Model', 'Micro-batch Production'],
    'delivery': ['Last-mile Logistics', 'On-demand fulfillment', 'Fleet Optimization'],
    'education': ['Knowledge Graph', 'Adaptive Pedagogy', 'Skill Monetization'],
    'health': ['Biometric Sovereignty', 'Preventative Care', 'Patient Privacy'],
    'finance': ['Liquidity Layer', 'Decentralized Trust', 'Yield Optimization'],
    'saas': ['Workflow Orchestration', 'API Economy', 'Enterprise Scalability'],
    'green': ['Circular Economy', 'ESG Compliance', 'Net-Zero Transition'],
    'waste': ['Resource Circularity', 'Upcycling Pipeline', 'Reverse Logistics'],
    'social': ['Community Governance', 'Incentivized Engagement', 'Network Effects']
};

function extractKeywords(text) {
    const stopWords = ['a', 'an', 'the', 'for', 'with', 'and', 'or', 'in', 'on', 'at', 'to', 'is', 'are', 'was', 'were', 'platform', 'marketplace', 'app', 'system', 'service', 'powered', 'ai', 'driven', 'based', 'startup', 'idea', 'project', 'build', 'create'];
    return text.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(' ')
        .filter(word => word.length > 3 && !stopWords.includes(word));
}

function synthesizeContent(template, keywords, industry) {
    if (!keywords || keywords.length === 0) return template;

    let synthesized = template;
    const mainK = keywords[0];
    const secondaryK = keywords[1] || mainK;

    // Deep synthesis: Replace complex nodes
    const mapping = {
        'workflows': `${mainK}-specific operational cycles`,
        'data entry': `${mainK} data ingestion`,
        'customer acquisition': `${secondaryK} channel discovery`,
        'business model': `${mainK}-centric monetization layer`,
        'competitor density': `${mainK} market saturation`,
        'manual': 'legacy non-automated',
        'fragmented': `loosely decoupled ${mainK}`
    };

    for (const [key, replacement] of Object.entries(mapping)) {
        if (synthesized.includes(key)) {
            synthesized = synthesized.replaceAll(key, replacement);
        }
    }

    // Context Injection
    if (keywords.length > 2) {
        synthesized += ` Specifically optimized for ${keywords.slice(0, 3).join(', ')} use-cases.`;
    }

    return synthesized;
}

function getStrategicIntents(keywords) {
    let intents = ['Scalability', 'Automation', 'Simplicity'];
    keywords.forEach(k => {
        if (termMapping[k]) intents.push(...termMapping[k]);
    });
    // Shuffle and pick 4
    return intents.sort(() => 0.5 - Math.random()).slice(0, 4);
}

// --- DEMO GENERATOR LOGIC ---
// --- DEMO GENERATOR LOGIC ---
function selectIndustry(ind) {
    // Update hidden input
    const input = document.getElementById('input-industry');
    if (input) input.value = ind;

    // Visual feedback
    document.querySelectorAll('.industry-card').forEach(card => {
        card.classList.remove('ring-2', 'ring-black', 'dark:ring-white', 'bg-gray-100', 'dark:bg-slate-800');
        if (card.id === `industry-${ind}`) {
            card.classList.add('ring-2', 'ring-black', 'dark:ring-white', 'bg-gray-100', 'dark:bg-slate-800');
        }
    });
}

const generateBtn = document.getElementById('generate-plan-btn');
if (generateBtn) {
    generateBtn.onclick = () => {
        const ideaInput = document.getElementById('input-idea');
        const idea = ideaInput.value;
        const indInput = document.getElementById('input-industry');
        const ind = indInput ? indInput.value : 'SaaS';
        const bud = document.getElementById('input-budget').value;

        if (!idea || idea.trim().length < 3) {
            ideaInput.focus();
            ideaInput.classList.add('border-red-500', 'ring-1', 'ring-red-500', 'shake');

            // Show error message
            const errorMsg = document.getElementById('idea-error-msg');
            if (errorMsg) {
                errorMsg.classList.remove('hidden');
            }

            // Remove shake animation after 500ms
            setTimeout(() => {
                ideaInput.classList.remove('shake');
            }, 500);

            // Clear error on typing
            const clearError = () => {
                ideaInput.classList.remove('border-red-500', 'ring-1', 'ring-red-500');
                if (errorMsg) errorMsg.classList.add('hidden');
                ideaInput.removeEventListener('input', clearError);
            };
            ideaInput.addEventListener('input', clearError);

            return;
        }

        // Show Loading
        const inputView = document.getElementById('demo-input-view'); // Note: ID check needed?
        // Actually, looking at previous code, it used demo-input-view but index.html has page-demo?
        // Wait, line 742 in index.html is <section id="page-demo" ...>
        // Use 'page-demo' if 'demo-input-view' is not found, or maybe 'page-demo' IS the input view?
        // Checking index.html line 742: <section id="page-demo"...>
        // Inside page-demo, there is input fields.
        // Wait, the original code used document.getElementById('demo-input-view').
        // I need to check if 'demo-input-view' exists in index.html.

        // Let's stick to the original logic for showing loading, assuming 'demo-input-view' exists or I should fix that too.
        // I'll check index.html for demo-input-view.

        // Let's assume standard IDs for now and fix if needed.
        // Actually, looking at the previous file view of index.html (lines 740+):
        // It has <section id="page-demo">
        // But NO div with id="demo-input-view" was visible in lines 742-800.
        // It ends at 887.
        // Line 888: <div id="demo-loading-view" class="hidden-page text-center py-32">
        // Line 899: <div id="demo-result-view" class="hidden-page space-y-8 w-full max-w-6xl">

        // So where is the input view? It must be the content inside page-demo.
        // I should probably wrap the input content in a div with id="demo-input-view" in index.html,
        // OR change the JS to hide 'page-demo' content? 
        // No, 'page-demo' is the section. 'demo-result-view' is a child of... wait.
        // Line 888 and 899 are siblings of the input content?

        // Let's look at index.html again to be safe.
        // I will use a safe approach: wrap the input part in a div with id "demo-input-view" via JS or assume it exists.
        // Re-reading index.html lines 880+:
        // The input inputs are just there.

        // Use a selector for the input container?
        // I'll verify index.html before committing this JS change if I'm unsure.
        // BUT, the previous JS code referenced `demo-input-view`. So it MUST have existed or the previous code was also broken.
        // I will trust the previous JS code on the ID names for now, but I'll add a check.

        const inputContainer = document.getElementById('demo-input-view') || document.getElementById('page-demo').querySelector('.max-w-4xl');
        // If demo-input-view is missing, we might have a problem hiding the inputs.

        if (document.getElementById('demo-input-view')) {
            document.getElementById('demo-input-view').classList.add('hidden-page');
        } else {
            // Fallback: Hide the inputs manually if wrapper is missing
            // But better to just assume it might be there or I'll fix it in HTML.
            // Let's assume it's there or I will add it.
        }

        document.getElementById('demo-loading-view').classList.remove('hidden-page');

        const status = document.getElementById('loading-status');
        const sub = document.getElementById('loading-sub');
        const steps = [
            { s: "Initializing AI Core...", sub: "Calibrating logic gates" },
            { s: "Analyzing Competitor Landscape...", sub: "Scraping Crunchbase APIs" },
            { s: "Modeling Revenue Trajectories...", sub: "Simulating market scenarios" },
            { s: "Finalizing Business Plan...", sub: "Structuring growth roadmap" }
        ];

        let stepIdx = 0;
        const interval = setInterval(() => {
            status.innerText = steps[stepIdx].s;
            sub.innerText = steps[stepIdx].sub;
            stepIdx++;
            if (stepIdx === steps.length) {
                clearInterval(interval);
                setTimeout(renderResult, 500, idea, ind, bud, document.getElementById('input-currency').value);
            }
        }, 800);
    };
}

// --- NEW FEATURE: Logo Generator ---
function generateLogo() {
    const container = document.getElementById('res-logo-container');
    if (!container) return;

    const colors = [
        ['#000000', '#333333'], // Black
        ['#333333', '#666666'], // Dark Gray
        ['#666666', '#999999'], // Gray
        ['#999999', '#CCCCCC'], // Light Gray
        ['#CCCCCC', '#EEEEEE'], // Very Light Gray
    ];
    const pair = colors[Math.floor(Math.random() * colors.length)];

    const shapes = [
        '<circle cx="12" cy="12" r="10" />',
        '<rect x="4" y="4" width="16" height="16" rx="2" />',
        '<path d="M12 2L2 22h20L12 2z" />',
        '<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />'
    ];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    container.innerHTML = `
        <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="${pair[0]}" />
                    <stop offset="100%" stop-color="${pair[1]}" />
                </linearGradient>
            </defs>
            <g fill="url(#logoGrad)">
                ${shape}
            </g>
        </svg>
    `;
}

// --- NEW FEATURE: Competitor Ticker ---
function initTicker(industry, name) {
    const ticker = document.getElementById('ticker-content');
    const container = document.getElementById('competitor-ticker-container');
    if (!ticker || !container) return;

    const headlines = [
        `BREAKING: Major incumbent in ${industry} space rumored to be exploring acquisition of ${name}...`,
        `MARKET ALERT: Venture capital interest in ${industry} startups hits 24-month high...`,
        `NEWS: New government regulations in ${industry} favor AI-first approaches like ${name}...`,
        `COMPETITIVE MOVE: Competitor X lowers pricing by 15% in response to ${name}'s entry...`,
        `TREND: ${industry} sector pivot towards sustainability gains momentum...`,
        `FUNDING: Seed round for ${name} oversubscribed by 2.4x in private pre-sale...`
    ];

    // Combine and repeat for smooth marquee
    const content = headlines.map(h => `<span class="mx-12">${h}</span>`).join('');
    ticker.innerHTML = content + content; // Duplicate for seamless looping

    container.classList.remove('translate-y-full');
}

function toggleTicker() {
    const container = document.getElementById('competitor-ticker-container');
    container.classList.toggle('translate-y-full');
}

// --- NEW FEATURE: Pitch Deck Mode ---
function togglePitchMode() {
    document.body.classList.add('pitch-mode');

    // Add Exit Button
    if (!document.querySelector('.exit-pitch-btn')) {
        const btn = document.createElement('button');
        btn.innerHTML = 'Exit Presentation (ESC)';
        btn.className = 'exit-pitch-btn';
        btn.onclick = exitPitchMode;
        document.body.appendChild(btn);
    }

    // Add Key Listener
    window.addEventListener('keydown', handlePitchKey);
}

function exitPitchMode() {
    document.body.classList.remove('pitch-mode');
    const btn = document.querySelector('.exit-pitch-btn');
    if (btn) btn.remove();
    window.removeEventListener('keydown', handlePitchKey);
}

function handlePitchKey(e) {
    if (e.key === 'Escape') exitPitchMode();
}

// --- NEW FEATURE: Co-Founder Chat ---
function toggleChat() {
    const chat = document.getElementById('cofounder-chat');
    chat.classList.toggle('scale-0');
    chat.classList.toggle('scale-100');
}

function sendMsg(text) {
    if (!text) return;
    const msgContainer = document.getElementById('chat-messages');
    const input = document.getElementById('chat-input');

    // User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'flex gap-2 justify-end';
    userDiv.innerHTML = `
        <div class="bg-black text-white p-3 rounded-2xl rounded-tr-none text-xs shadow-sm">
            ${text}
        </div>
    `;
    msgContainer.appendChild(userDiv);
    input.value = '';
    msgContainer.scrollTop = msgContainer.scrollHeight;

    // AI Response (Simulated)
    setTimeout(() => {
        const responses = [
            "Good point. But how do we handle the scalability of that approach?",
            "The market data suggests that's a high-growth area. Let's dig deeper.",
            "I'm worried about our burn rate if we go that route. What's the ROI?",
            "Brilliant. I'll add that to our go-to-market strategy slides.",
            "Wait, have we considered the regulatory implications in the EU?",
            "Let's focus on the MVP first. Is that feature strictly necessary?",
            "I love the ambition. That would definitely scare our competitors."
        ];
        const aiResponse = responses[Math.floor(Math.random() * responses.length)];

        const aiDiv = document.createElement('div');
        aiDiv.className = 'flex gap-2 animate-in fade-in';
        aiDiv.innerHTML = `
            <div class="w-6 h-6 rounded-full bg-gray-100 flex-shrink-0 text-[10px] flex items-center justify-center">🤖</div>
            <div class="bg-gray-50 p-3 rounded-2xl rounded-tl-none text-xs text-gray-700 shadow-sm border border-gray-100">
                ${aiResponse}
            </div>
        `;
        msgContainer.appendChild(aiDiv);
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }, 1000);
}


function renderResult(idea, industry, budget, currency = 'USD') {
    const keywords = extractKeywords(idea);
    const indData = industries[industry] || defaultData;

    // Currency Logic
    const isINR = currency === 'INR';
    const rate = isINR ? 83 : 1;
    const sym = isINR ? '₹' : '$';

    // Generate Name (More sophisticated)
    let name;
    if (keywords.length > 0) {
        const seedWord = keywords[0].charAt(0).toUpperCase() + keywords[0].slice(1);
        name = seedWord + (indData.suffixes[Math.floor(Math.random() * indData.suffixes.length)]);
    } else {
        name = indData.prefixes[Math.floor(Math.random() * indData.prefixes.length)] +
            indData.suffixes[Math.floor(Math.random() * indData.suffixes.length)];
    }

    // Random Stats
    const score = Math.floor(Math.random() * 26) + 70; // 70-95%
    const market = Math.floor(Math.random() * 21) + 75; // 75-95%

    // --- Financial Numbers ---
    const budgetMultipliers = { 'Low': 1, 'Medium': 5, 'High': 10 };
    const mult = budgetMultipliers[budget] || 1;

    // Market Size & Revenue
    const rawMarket = (Math.random() * 20 + 5); // Base billions
    const marketSize = (rawMarket * rate).toFixed(1);

    // Rev in K (base)
    const rawRev = Math.floor((50 + Math.random() * 150) * mult);
    const yr1Revenue = Math.floor(rawRev * rate);

    const breakEvenMonths = Math.floor(12 + Math.random() * 18);

    const rawCac = Math.floor(20 + Math.random() * 80);
    const cac = Math.floor(rawCac * rate);

    const rawLtv = Math.floor(rawCac * (3 + Math.random() * 5));
    const ltv = Math.floor(rawLtv * rate);

    const ltvCac = (ltv / cac).toFixed(1);
    const margin = Math.floor(60 + Math.random() * 25); // 60-85%

    // --- SECTION 1: Header ---
    generateLogo();
    document.getElementById('res-name').innerText = name;

    // Tagline synthesis (High Variety)
    const actionWords = ['Architecting', 'Optimizing', 'Democratizing', 'Redefining', 'Automating', 'Streamlining'];
    const connectionWords = ['through specialized', 'using autonomous', 'leveraging granular', 'via centralized'];
    const action = actionWords[Math.floor(Math.random() * actionWords.length)];
    const conn = connectionWords[Math.floor(Math.random() * connectionWords.length)];
    const focus = keywords.length > 1 ? `${keywords[0]} & ${keywords[1]}` : (keywords[0] || 'market');
    document.getElementById('res-tagline').innerText = `${action} the ${industry} landscape ${conn} ${focus} intelligence.`;

    document.getElementById('res-industry-badge').innerText = industry;
    document.getElementById('res-budget-badge').innerText = budget;

    // --- FEATURE: Founder's Vision ---
    document.getElementById('res-original-concept').innerText = `"${idea}"`;
    const intents = getStrategicIntents(keywords);
    document.getElementById('res-intent-tags').innerHTML = intents.map(tag =>
        `<span class="px-3 py-1 bg-gray-100 text-gray-900 rounded-full text-[10px] font-bold border border-gray-200">#${tag}</span>`
    ).join('');
    document.getElementById('res-kpi-score').innerText = score + '%';
    document.getElementById('res-kpi-market').innerText = sym + marketSize + 'B';
    document.getElementById('res-kpi-revenue').innerText = sym + yr1Revenue + 'K';
    document.getElementById('res-kpi-breakeven').innerText = breakEvenMonths + ' mo';

    // --- SECTION 2: Problem / Solution / Audience ---
    document.getElementById('res-problem').innerText = synthesizeContent(indData.problems, keywords, industry);
    document.getElementById('res-solution').innerText = synthesizeContent(indData.solutions, keywords, industry);
    document.getElementById('res-audience').innerText = indData.audience;

    // --- SECTION 3: Revenue Projection Chart ---
    const maxRev = yr1Revenue * 3; // 36-month projection
    const yStep = maxRev / 3;
    document.getElementById('res-y1').textContent = sym + Math.round(yStep) + 'K';
    document.getElementById('res-y2').textContent = sym + Math.round(yStep * 2) + 'K';
    document.getElementById('res-y3').textContent = sym + Math.round(yStep * 3) + 'K';

    // Generate monthly revenue data points (exponential growth curve)
    const months = 36;
    const chartW = 450; // usable width (40 to 490)
    const chartH = 150; // usable height (10 to 160)
    const startX = 40;
    const baseY = 160;
    let points = [];
    let barsHtml = '';
    for (let m = 0; m <= months; m++) {
        // Exponential: starts slow, accelerates
        const revenue = maxRev * Math.pow(m / months, 2.2);
        const x = startX + (m / months) * chartW;
        const y = baseY - (revenue / maxRev) * chartH;
        points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
        // Thin monthly bar
        if (m > 0 && m % 3 === 0) {
            const barH = (revenue / maxRev) * chartH;
            barsHtml += `<rect x="${(x - 3).toFixed(1)}" y="${(baseY - barH).toFixed(1)}" width="6" height="${barH.toFixed(1)}" rx="2" fill="#000000" opacity="0.1"/>`;
        }
    }
    const lineD = 'M' + points.join(' L');
    const areaD = lineD + ` L490,160 L40,160 Z`;
    document.getElementById('res-rev-line').setAttribute('d', lineD);
    document.getElementById('res-rev-area').setAttribute('d', areaD);
    document.getElementById('res-rev-bars').innerHTML = barsHtml;

    // --- Revenue Model & Unit Economics ---
    document.getElementById('res-revenue-model').innerText = indData.models[Math.floor(Math.random() * indData.models.length)];
    document.getElementById('res-cac').innerText = sym + cac;
    document.getElementById('res-ltv').innerText = sym + ltv;
    document.getElementById('res-ltv-cac').innerText = ltvCac + 'x';
    document.getElementById('res-margin').innerText = margin + '%';

    // --- SECTION 4: SWOT Analysis ---
    const swotData = {
        "SaaS": {
            s: ["AI-first approach creates deep moat", "Recurring revenue model", "Low marginal cost per user"],
            w: ["High initial R&D cost", "Dependency on cloud infrastructure", "Long enterprise sales cycle"],
            o: ["Remote work trend accelerating TAM", "API economy enables partnerships", "Vertical SaaS underserved"],
            t: ["Big tech could replicate core feature", "Open-source alternatives emerging", "Data privacy regulations"]
        },
        "FinTech": {
            s: ["Lower fees than incumbents", "Mobile-first UX", "Real-time settlement capability"],
            w: ["Regulatory compliance complexity", "Trust deficit as new player", "Capital-intensive operations"],
            o: ["Unbanked population (1.7B globally)", "Embedded finance trend", "Open banking APIs"],
            t: ["Bank charter requirements evolving", "Crypto volatility perception", "Established neo-bank competitors"]
        },
        "HealthTech": {
            s: ["Preventive care reduces costs", "Wearable data integration", "HIPAA-compliant architecture"],
            w: ["FDA approval timeline", "Patient adoption resistance", "Integration with legacy EHR"],
            o: ["Telehealth growth post-pandemic", "Aging population demographics", "Corporate wellness programs"],
            t: ["Data breach liability", "Insurance reimbursement complexity", "Big pharma lobbying"]
        },
        "Sustainability": {
            s: ["ESG mandates driving demand", "Blockchain immutability", "First-mover advantage"],
            w: ["Requires supply chain cooperation", "Limited consumer awareness", "High verification costs"],
            o: ["Carbon credit market growth", "EU Green Deal regulations", "Gen Z purchasing behavior"],
            t: ["Greenwashing skepticism", "Regulatory fragmentation", "Technology adoption lag"]
        },
        "E-commerce": {
            s: ["AI personalization increases AOV", "Data network effects", "Platform agnostic integration"],
            w: ["High customer acquisition cost", "Commoditized market", "Returns/refund logistics"],
            o: ["Social commerce growth", "Cross-border e-commerce", "AR/VR shopping experiences"],
            t: ["Amazon dominance", "Ad cost inflation", "Supply chain disruptions"]
        },
        "Education": {
            s: ["Adaptive learning improves outcomes", "Scalable content delivery", "Low distribution cost"],
            w: ["Engagement/retention challenges", "Certification credibility", "Free content competition"],
            o: ["Corporate reskilling market", "Global EdTech adoption", "AI tutoring demand"],
            t: ["University resistance to change", "Screen fatigue trends", "Regulatory accreditation"]
        }
    };
    const swot = swotData[industry] || swotData["SaaS"];
    const renderList = (items) => items.map(i => `<li class="flex items-start gap-2"><span class="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-current opacity-50"></span>${i}</li>`).join('');
    document.getElementById('res-swot-s').innerHTML = renderList(swot.s);
    document.getElementById('res-swot-w').innerHTML = renderList(swot.w);
    document.getElementById('res-swot-o').innerHTML = renderList(swot.o);
    document.getElementById('res-swot-t').innerHTML = renderList(swot.t);

    // --- SECTION 5: Competitor Landscape ---
    const competitorData = {
        "SaaS": [{ name: "Notion", share: 35 }, { name: "Monday.com", share: 28 }, { name: "Airtable", share: 22 }, { name: name + " (You)", share: 15, highlight: true }],
        "FinTech": [{ name: "Stripe", share: 40 }, { name: "Revolut", share: 25 }, { name: "Wise", share: 20 }, { name: name + " (You)", share: 15, highlight: true }],
        "HealthTech": [{ name: "Teladoc", share: 30 }, { name: "Livongo", share: 25 }, { name: "Hims", share: 22 }, { name: name + " (You)", share: 23, highlight: true }],
        "Sustainability": [{ name: "Pachama", share: 28 }, { name: "Watershed", share: 25 }, { name: "Persefoni", share: 22 }, { name: name + " (You)", share: 25, highlight: true }],
        "E-commerce": [{ name: "Shopify", share: 38 }, { name: "BigCommerce", share: 22 }, { name: "WooCommerce", share: 20 }, { name: name + " (You)", share: 20, highlight: true }],
        "Education": [{ name: "Coursera", share: 32 }, { name: "Duolingo", share: 28 }, { name: "Udemy", share: 20 }, { name: name + " (You)", share: 20, highlight: true }]
    };
    const competitors = competitorData[industry] || competitorData["SaaS"];
    let compHtml = '';
    competitors.forEach(c => {
        const color = c.highlight ? 'bg-black dark:bg-white' : 'bg-gray-300';
        const textColor = c.highlight ? 'text-black dark:text-white font-bold' : 'text-gray-700';
        compHtml += `
            <div>
                <div class="flex justify-between text-sm mb-1.5">
                    <span class="${textColor}">${c.name}</span>
                    <span class="text-gray-400 text-xs">${c.share}%</span>
                </div>
                <div class="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div class="${color} h-full rounded-full transition-all duration-1000 competitor-bar" style="width: 0%" data-width="${c.share}%"></div>
                </div>
            </div>`;
    });
    document.getElementById('res-competitors').innerHTML = compHtml;

    // --- SECTION 6: Dynamic Growth Roadmap ---
    const roadmapTemplates = [
        {
            title: "Month 1-2: Discovery & MVP",
            body: `Build core ${keywords[0] || 'product'} logic within ${budget} budget. Validate key manual workflows with 5 early adopter interviews.`,
            tags: ["User Research", "MVP Prototype", "Tech Stack"]
        },
        {
            title: "Month 3-4: Alpha Testing",
            body: `Onboard first 10-25 users from ${indData.audience}. Focus on ${keywords[1] || keywords[0] || 'core'} performance and data entry efficiency.`,
            tags: ["Beta Testing", "Metrics Setup", "UX Feedback"]
        },
        {
            title: "Month 5-6: Initial Scale",
            body: `Achieve Product-Market Fit for the specialized ${keywords[0]} use-case. Refine fragmented pricing models.`,
            tags: ["PMF Survey", "Pricing Pivot", "Early Retention"]
        },
        {
            title: "Month 7-9: Growth Engine",
            body: `Deploy customer acquisition channels across the ${industry} sector. Target $${Math.round(yr1Revenue * 0.3)}K MRR by optimizing ${keywords[0]} reach.`,
            tags: ["SEO", "Content Ops", "Partnerships"]
        },
        {
            title: "Month 10-12: Scale & Fundraise",
            body: `Reach $${yr1Revenue}K ARR milestone. Prepare pitch deck highlighting ${keywords[0]} automation advantage for Seed/Series A.`,
            tags: ["Fundraising", "Ops Hiring", "Market Dominance"]
        }
    ];

    let roadmapHtml = '';
    roadmapTemplates.forEach((step, idx) => {
        const isFirst = idx === 0;
        const dotColor = isFirst ? 'bg-gray-900' : 'bg-gray-300';

        // Synthesize the body text
        const synthesizedBody = synthesizeContent(step.body, keywords, industry);

        roadmapHtml += `
            <div class="relative pl-8 timeline-item">
                <div class="absolute -left-[calc(0.5rem+1px)] top-1 w-4 h-4 rounded-full ${dotColor} border-4 border-white"></div>
                <h4 class="font-bold text-gray-900 text-sm">${step.title}</h4>
                <p class="text-xs text-gray-500 mt-1 mb-2">${synthesizedBody}</p>
                <div class="flex gap-2 flex-wrap">
                    ${step.tags.map(tag => `<span class="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">${tag}</span>`).join('')}
                </div>
            </div>
        `;
    });
    document.getElementById('res-roadmap').innerHTML = roadmapHtml;

    // --- SECTION 7: Suggested Team ---
    const teamData = {
        "SaaS": [
            { role: "CTO", desc: "Full-stack engineer with AI/ML experience", color: "blue" },
            { role: "CEO / Growth", desc: "B2B SaaS sales + product management background", color: "gray" },
            { role: "Head of Design", desc: "UX specialist with enterprise dashboard experience", color: "purple" }
        ],
        "FinTech": [
            { role: "CTO", desc: "Security-first architect with banking API experience", color: "blue" },
            { role: "Chief Compliance", desc: "RegTech background, ex-banking compliance officer", color: "gray" },
            { role: "CEO / Product", desc: "FinTech founder with payments or lending experience", color: "purple" }
        ],
        "HealthTech": [
            { role: "Chief Medical Officer", desc: "Licensed physician with digital health experience", color: "blue" },
            { role: "CTO", desc: "HIPAA-compliant systems architect", color: "gray" },
            { role: "CEO / Business", desc: "Healthcare industry operator with payer relationships", color: "purple" }
        ],
        "Sustainability": [
            { role: "CEO", desc: "Climate tech background with policy connections", color: "blue" },
            { role: "CTO", desc: "Blockchain/IoT engineer for supply chain tracking", color: "gray" },
            { role: "Head of Partnerships", desc: "CPG industry relationships for brand onboarding", color: "purple" }
        ],
        "E-commerce": [
            { role: "CTO", desc: "ML engineer with recommendation systems experience", color: "blue" },
            { role: "CEO / Marketing", desc: "D2C brand builder with growth hacking skills", color: "gray" },
            { role: "Head of Ops", desc: "Supply chain & logistics optimization background", color: "purple" }
        ],
        "Education": [
            { role: "CEO / Product", desc: "Former educator with EdTech product experience", color: "blue" },
            { role: "CTO", desc: "Adaptive learning algorithm specialist", color: "gray" },
            { role: "Content Lead", desc: "Curriculum designer with gamification expertise", color: "purple" }
        ]
    };
    const team = teamData[industry] || teamData["SaaS"];
    let teamHtml = '';
    team.forEach(t => {
        const colors = { blue: 'bg-gray-100 text-gray-900', gray: 'bg-gray-100 text-gray-600', purple: 'bg-gray-100 text-gray-900' };
        teamHtml += `
            <div class="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div class="w-10 h-10 rounded-full ${colors[t.color]} flex items-center justify-center font-bold text-sm mb-3">${t.role.charAt(0)}</div>
                <h4 class="font-bold text-gray-900 text-sm mb-1">${t.role}</h4>
                <p class="text-xs text-gray-500">${t.desc}</p>
            </div>`;
    });
    document.getElementById('res-team').innerHTML = teamHtml;

    // --- SECTION 8: Key Risks ---
    const riskData = {
        "SaaS": [
            { risk: "Enterprise sales cycle >6 months", mitigation: "Start with SMB self-serve tier, then upsell" },
            { risk: "Key feature commoditization", mitigation: "Build proprietary data moats and integrations" }
        ],
        "FinTech": [
            { risk: "Regulatory changes in target markets", mitigation: "Embedded compliance-as-code architecture" },
            { risk: "Fraud and security breaches", mitigation: "SOC 2 Type II certification from day one" }
        ],
        "HealthTech": [
            { risk: "FDA regulatory delays (12-18 months)", mitigation: "Launch as wellness-first, not diagnostic" },
            { risk: "Patient data breach liability", mitigation: "Zero-knowledge architecture + HIPAA BAA" }
        ],
        "Sustainability": [
            { risk: "Supply chain partners refuse integration", mitigation: "Start with willing brands, build pressure" },
            { risk: "Greenwashing accusations", mitigation: "Third-party audit + blockchain transparency" }
        ],
        "E-commerce": [
            { risk: "Platform dependency (Shopify/Amazon)", mitigation: "Build headless, multi-platform architecture" },
            { risk: "Ad cost inflation (ROAS compression)", mitigation: "Organic + referral loops reduce CAC over time" }
        ],
        "Education": [
            { risk: "Low completion rates (industry avg 5%)", mitigation: "Gamification + cohort-based accountability" },
            { risk: "Free content from YouTube/Khan Academy", mitigation: "Focus on outcomes (jobs, certs), not just content" }
        ]
    };
    const risks = riskData[industry] || riskData["SaaS"];
    let risksHtml = '';
    risks.forEach(r => {
        risksHtml += `
            <div class="bg-white/5 rounded-xl p-4 border border-white/10">
                <div class="flex items-start gap-2 mb-2">
                    <span class="text-white text-xs mt-0.5">⚠</span>
                    <span class="text-sm font-semibold text-white">${r.risk}</span>
                </div>
                <div class="flex items-start gap-2 pl-4">
                    <span class="text-white text-xs mt-0.5">→</span>
                    <span class="text-sm text-gray-400">${r.mitigation}</span>
                </div>
            </div>`;
    });
    document.getElementById('res-risks').innerHTML = risksHtml;

    // --- Display Results ---
    document.getElementById('demo-loading-view').classList.add('hidden-page');
    document.getElementById('demo-result-view').classList.remove('hidden-page');

    // --- Animate Meters ---
    setTimeout(() => {
        const scoreCircle = document.getElementById('res-score-circle');
        if (scoreCircle) {
            scoreCircle.style.strokeDashoffset = 352 - (352 * score / 100);
            document.getElementById('res-score-val').innerText = score + "%";
        }
        const marketBar = document.getElementById('res-market-bar');
        if (marketBar) {
            marketBar.style.width = market + "%";
            document.getElementById('res-market-val').innerText = market + "%";
        }
        // Animate competitor bars
        document.querySelectorAll('.competitor-bar').forEach(bar => {
            bar.style.width = bar.dataset.width;
        });

        // Initialize Ticker
        initTicker(industry, name);
    }, 100);
}

function resetDemo() {
    document.getElementById('demo-result-view').classList.add('hidden-page');
    document.getElementById('demo-input-view').classList.remove('hidden-page');
    if (startupForm) startupForm.reset();
}

// Initialize
window.onload = () => {
    // --- PRELOADER SEQUENCE ---
    const preloader = document.getElementById('preloader');
    const bar = document.getElementById('preloader-bar');
    const status = document.getElementById('preloader-status');

    const steps = [
        { pct: 25, text: 'Loading modules...' },
        { pct: 50, text: 'Initializing AI core...' },
        { pct: 75, text: 'Connecting data feeds...' },
        { pct: 100, text: 'Ready.' },
    ];

    let i = 0;
    const advanceLoader = () => {
        if (i < steps.length) {
            bar.style.width = steps[i].pct + '%';
            status.textContent = steps[i].text;
            i++;
            setTimeout(advanceLoader, 400);
        } else {
            // Fade out preloader
            setTimeout(() => {
                preloader.classList.add('loaded');
                // Initialize theme
                // Initialize theme (Removed)
                // initTheme();
                // Start background animation
                initBackground();
                // Start page animations after preloader is gone
                type();
                initHomeAnimations();
            }, 300);
        }
    };
    advanceLoader();

    // Reveal effect for elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.bento-card').forEach(card => {
        card.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-10');
        observer.observe(card);
    });

    // --- LIVE MARKET SIMULATION ---
    setInterval(() => {
        document.querySelectorAll('.live-metric').forEach(el => {
            // Random small fluctuation
            const current = parseFloat(el.innerText.replace(/[^0-9.-]/g, ''));
            const change = (Math.random() - 0.5) * 2; // -1 to +1
            let newVal = (current + change).toFixed(1);
            if (newVal < 0) newVal = 0;

            // Format back
            if (el.innerText.includes('$')) {
                el.innerText = '$' + newVal + 'M';
            } else if (el.innerText.includes('%')) {
                const hasPlus = el.innerText.includes('+');
                el.innerText = (hasPlus ? '+' : '') + newVal + '%';
            } else {
                el.innerText = newVal; // plain number
            }

            // Color feedback
            if (change > 0) el.classList.add('text-gray-900', 'dark:text-white');
            else el.classList.remove('text-gray-900', 'dark:text-white');

            setTimeout(() => el.classList.remove('text-gray-900', 'dark:text-white'), 500);
        });

        // Randomize bar heights
        document.querySelectorAll('.animate-pulse-bar').forEach(bar => {
            // Only randomize duration to keep them out of sync
            bar.style.animationDuration = (1 + Math.random() * 2) + 's';
        });

    }, 2000);
};

// --- BACKGROUND PARTICLE ENGINE (Modified from Alex Andrix) ---
const ParticleApp = {
    setup: function () {
        const container = document.getElementById('bg-canvas-container');
        if (!container) return;
        const canvas = document.createElement('canvas');
        this.canvas = canvas;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.dataToImageRatio = Math.max(this.width, this.height) / 1000;
        this.ctx.globalCompositeOperation = 'darker';
        this.ctx.imageSmoothingEnabled = false;
        this.xC = this.width / 2;
        this.yC = this.height / 2;
        container.appendChild(canvas);

        this.ctx.globalCompositeOperation = document.documentElement.classList.contains('dark') ? 'lighter' : 'darker';

        this.lifespan = 600; // Much longer trails for continuous flow look
        this.popPerBirth = 20; // Fast fill
        this.maxPop = 4500; // Extremely dense (Flow field style)
        this.birthFreq = 1;

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.width = this.canvas.width;
            this.height = this.canvas.height;
            this.xC = this.width / 2;
            this.yC = this.height / 2;
        });
    },
    start: function () {
        this.stepCount = 0;
        this.particles = [];

        // Pre-populate to avoid empty screen on load
        for (let i = 0; i < this.maxPop; i++) {
            this.birth();
            // Fast-forward age slightly for variety
            this.particles[i].age = Math.floor(Math.random() * this.lifespan);
        }

        this.initDraw();
    },
    evolve: function () {
        this.stepCount++;
        // Maintain population
        if (this.particles.length < this.maxPop) {
            let missing = this.maxPop - this.particles.length;
            let birthCount = Math.min(missing, this.popPerBirth);
            for (let n = 0; n < birthCount; n++) this.birth();
        }
        this.move();
        this.draw();
    },
    birth: function () {
        let x = -800 + 1600 * Math.random(),
            y = -800 + 1600 * Math.random();
        let particle = {
            hue: 0, // Monochrome
            sat: 0,
            lum: 20 + Math.floor(60 * Math.random()), // Varying shades of gray
            x,
            y,
            xLast: x, yLast: y,
            xSpeed: 0, ySpeed: 0,
            age: 0,
            name: 'p-' + Math.ceil(10000000 * Math.random()) + '-' + Math.random() // Unique ID
        };
        this.particles.push(particle);
    },
    kill: function (name) {
        this.particles = this.particles.filter(p => p.name !== name);
    },
    move: function () {
        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];
            p.xLast = p.x;
            p.yLast = p.y;
            p.xSpeed = 0; p.ySpeed = 0;

            let eddies = [], baseK = 4;
            eddies.push({ x: -300, y: -300, K: 10 * baseK, r0: 180 });
            eddies.push({ x: 300, y: -300, K: 15 * baseK, r0: 150 });
            eddies.push({ x: 300, y: 300, K: 10 * baseK, r0: 250 });
            eddies.push({ x: -300, y: 300, K: 15 * baseK, r0: 150 });
            eddies.push({ x: 0, y: 0, K: 5 * baseK, r0: 20 });

            for (var e = 0; e < eddies.length; e++) {
                let eddy = eddies[e];
                let dx = p.x - eddy.x,
                    dy = p.y - eddy.y,
                    r = Math.sqrt(dx * dx + dy * dy),
                    theta = Math.atan2(dy, dx),
                    cos = Math.cos(theta), sin = Math.sin(theta),
                    K = eddy.K, r0 = eddy.r0;

                let er = { x: cos, y: sin },
                    eO = { x: -sin, y: cos };

                let radialVelocity = -0.003 * K * Math.abs(dx * dy) / 3000,
                    sigma = 100,
                    azimutalVelocity = K * Math.exp(-Math.pow((r - r0) / sigma, 2));

                p.xSpeed += radialVelocity * er.x + azimutalVelocity * eO.x;
                p.ySpeed += radialVelocity * er.y + azimutalVelocity * eO.y;
            }

            p.x += 0.02 * p.xSpeed; p.y += 0.02 * p.ySpeed; // Slower speed
            p.speed = Math.sqrt(p.xSpeed * p.xSpeed + p.ySpeed * p.ySpeed);
            p.age++;
            if (p.age > this.lifespan) {
                this.kill(p.name);
                this.birth(); // Immediate rebirth to maintain density
            }
        }
    },
    initDraw: function () {
        this.ctx.clearRect(0, 0, this.width, this.height);
    },
    draw: function () {
        if (!this.particles.length) return;
        this.ctx.clearRect(0, 0, this.width, this.height);

        const isDark = document.documentElement.classList.contains('dark');
        this.ctx.globalCompositeOperation = isDark ? 'lighter' : 'source-over';

        for (let i = 0; i < this.particles.length; i++) {
            let p = this.particles[i];

            // Subtler Opacity for High Density
            // Dark Mode: Very faint (0.08 base)
            // Light Mode: Faint (0.2 base)
            let a = isDark ? (0.08 + p.speed / 1500) : (0.2 + p.speed / 1000);

            let last = this.dataXYtoCanvasXY(p.xLast, p.yLast),
                now = this.dataXYtoCanvasXY(p.x, p.y);

            this.ctx.beginPath();
            const lum = isDark ? (p.lum + 20) : (p.lum - 20);
            this.ctx.strokeStyle = `hsla(${p.hue}, ${p.sat}%, ${lum}%, ${a})`;
            this.ctx.moveTo(last.x, last.y);
            this.ctx.lineTo(now.x, now.y);

            // FIX: Ensure positive size
            let lifeRatio = p.age / this.lifespan;
            // Fade out size at end of life: 1 -> 0
            let size = 1.0 * (1 - lifeRatio);
            if (size < 0) size = 0;

            // Adjust base thickness
            this.ctx.lineWidth = size * this.dataToImageRatio * 1.5;
            this.ctx.stroke();
        }
    },
    dataXYtoCanvasXY: function (x, y) {
        const zoom = 0.72;
        return {
            x: this.xC + x * zoom * this.dataToImageRatio,
            y: this.yC + y * zoom * this.dataToImageRatio
        };
    }
};

// Start the engine
function initBackground() {
    ParticleApp.setup();
    ParticleApp.start();
    const frame = () => {
        ParticleApp.evolve();
        requestAnimationFrame(frame);
    };
    frame();
}
