/* ===================================================================
   GOPIKA SADANAND - PORTFOLIO INTERACTIVITY SCRIPT
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Authentication Guard
    const isAuthenticated = sessionStorage.getItem('gopika_auth') === 'true' || localStorage.getItem('gopika_auth') === 'true';
    if (!isAuthenticated) {
        window.location.replace('login.html');
        return;
    }

    // Display logged-in user if element exists
    const currentUser = sessionStorage.getItem('gopika_user') || localStorage.getItem('gopika_user') || 'Gopika';
    const userGreetingEl = document.getElementById('userGreeting');
    if (userGreetingEl) {
        userGreetingEl.textContent = currentUser;
    }

    // 2. Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('gopika_auth');
            sessionStorage.removeItem('gopika_user');
            localStorage.removeItem('gopika_auth');
            localStorage.removeItem('gopika_user');
            window.location.replace('login.html');
        });
    }

    // 3. Mobile Navigation Menu Toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.className = navLinks.classList.contains('active') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
            }
        });

        // Close mobile nav when clicking any link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars';
            });
        });
    }

    // 4. Scroll Spy - Active navigation link
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 120;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = sectionId;
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // 5. Project Data Dictionary
    const projectDatabase = {
        'quick-creation': {
            title: 'QUICK CREATION',
            category: 'Web Platform & Prototyping',
            tagline: 'Student Designer Platform for Rapid Web UI Synthesis & Collaboration',
            tech: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express', 'MongoDB'],
            overview: 'Quick Creation is an interactive student designer platform built to bridge the gap between creative visual ideation and ready-to-use production UI templates. It empowers novice designers and students to scaffold, preview, and share responsive design assets effortlessly.',
            objectives: [
                'Engineered an intuitive drag-and-drop & schema-driven web design environment.',
                'Implemented persistent cloud storage and versioning for user templates using MongoDB.',
                'Reduced initial UI prototyping turnaround time by over 60% for academic cohorts.'
            ],
            features: [
                'Responsive asset catalog with instant live canvas preview',
                'Modular UI component builder and code exporter',
                'Secure user authentication and workspace asset saving',
                'Optimized asset loading with lightweight REST APIs'
            ],
            demoAction: 'Simulate Quick Creation Studio'
        },
        'textoon': {
            title: 'TEXTOON',
            category: 'Generative AI & Immersive VR',
            tagline: 'AI-Based Text-to-3D Cartoon Experience in Virtual Reality',
            tech: ['Python', 'NLP', 'Stable Diffusion', 'MiDaS Depth Model', 'Three.js', 'WebXR', 'WebGL'],
            overview: 'TEXTOON is an advanced AI pipeline that transforms natural language descriptive prompts into vibrant, stereoscopic 3D cartoon scenes navigable in immersive WebVR. It couples generative diffusion models with neural monocular depth estimation.',
            objectives: [
                'Developed a multi-stage pipeline converting descriptive sentences into styled cartoon assets.',
                'Leveraged MiDaS neural network to estimate depth geometry from 2D diffusion outputs.',
                'Synthesized 3D mesh representations and rendered in real-time WebXR/Three.js viewpoints.'
            ],
            features: [
                'Natural Language Prompt Processor with semantic keyword booster',
                'Automated 2.5D/3D depth mesh extrusion from Stable Diffusion outputs',
                'Full 6-DOF WebVR headset and desktop spatial exploration',
                'Direct GLTF/OBJ model export for 3D animators and game developers'
            ],
            demoAction: 'Run AI VR Prompt Simulator'
        },
        'voteassist': {
            title: 'VOTEASSIST IDUKKI',
            category: 'Civic Tech & Conversational AI',
            tagline: 'Multilingual Citizen Election Guidance WhatsApp Chatbot',
            tech: ['Node.js', 'Dialogflow NLP', 'Twilio WhatsApp API', 'MySQL', 'Express'],
            overview: 'VoteAssist Idukki is a specialized civic engagement chatbot deployed to assist citizens during elections across Idukki district. Operating directly on WhatsApp, it provides multilingual answers (Malayalam & English) on polling booths, voter registration, and candidate details.',
            objectives: [
                'Engineered a scalable WhatsApp chatbot serving voters across rural and hilly terrains of Idukki.',
                'Trained Google Dialogflow NLP models with regional Malayalam and English colloquial phrasing.',
                'Connected secure MySQL database to deliver real-time polling station GPS coordinates.'
            ],
            features: [
                'Automated polling booth locator using voter ID or area pincode',
                'Real-time FAQ handling: Voter slip eligibility, ID proofs, and code of conduct',
                'Bilingual language toggle: Seamless switch between Malayalam and English',
                'Handled 5,000+ active citizen queries during election cycles with 96% accuracy'
            ],
            demoAction: 'Launch WhatsApp Bot Demo'
        }
    };

    // 6. Project Modal Logic
    const modalOverlay = document.getElementById('projectModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalTagline = document.getElementById('modalTagline');
    const modalTech = document.getElementById('modalTech');
    const modalOverview = document.getElementById('modalOverview');
    const modalObjectives = document.getElementById('modalObjectives');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalActionBtn = document.getElementById('modalActionBtn');

    function openProjectModal(key) {
        const data = projectDatabase[key];
        if (!data) return;

        modalTitle.textContent = data.title;
        modalTagline.textContent = data.tagline;
        modalOverview.textContent = data.overview;

        // Populate Tech Tags
        modalTech.innerHTML = data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

        // Populate Objectives
        modalObjectives.innerHTML = data.objectives.map(o => `<li>${o}</li>`).join('');

        // Populate Features
        modalFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join('');

        // Set action button text
        if (modalActionBtn) {
            modalActionBtn.textContent = data.demoAction;
            modalActionBtn.onclick = () => {
                triggerSimulation(key, data.title);
            };
        }

        modalOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (modalOverlay) {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Attach listeners to "View Details" buttons
    document.querySelectorAll('.open-project-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const key = e.currentTarget.getAttribute('data-project');
            openProjectModal(key);
        });
    });

    // 7. Interactive Simulation Trigger
    function triggerSimulation(key, title) {
        if (key === 'voteassist') {
            alert(`🗳️ [VOTEASSIST IDUKKI DEMO]\n\nWhatsApp Bot Simulation:\nUser: "Where is my polling booth in Idukki?"\nBot: "📍 Booth #42 located at Government High School, Painavu, Idukki. Click for Google Maps directions!"\n\nTotal queries handled during elections: 5,000+`);
        } else if (key === 'textoon') {
            alert(`🎨 [TEXTOON AI DEMO]\n\nPrompt: "A floating enchanted cartoon castle in clouds in 3D VR"\n1. NLP Parser -> Extracts keywords\n2. Stable Diffusion -> Generates cartoon texture\n3. MiDaS -> Estimates 3D depth field\n4. Three.js / WebXR -> Ready for VR headset preview!`);
        } else {
            alert(`🚀 [QUICK CREATION DEMO]\n\nLoading Rapid Designer Workspace...\n• UI Canvas initialized\n• Connected to MongoDB asset store\n• Exporting clean HTML/CSS/JS template successfully!`);
        }
    }

    // 8. Contact Form Demo Handler
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending message...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                formFeedback.style.display = 'block';
                formFeedback.className = 'alert-msg';
                formFeedback.style.background = 'rgba(16, 185, 129, 0.15)';
                formFeedback.style.border = '1px solid rgba(16, 185, 129, 0.35)';
                formFeedback.style.color = '#6ee7b7';
                formFeedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent to Gopika Sadanand.';
                contactForm.reset();

                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 5000);
            }, 900);
        });
    }
});
