// ==========================================================================
// STEPHEN SAM — PERSONAL PORTFOLIO & YOUTUBE EDUCATOR BRAND CONTROLLER
// ==========================================================================

// 1. HERO TYPING EFFECT
const roles = [
    "Senior Cloud, DevOps & SRE Engineer.",
    "Creator · Stephen Sam DevOps Malayalam (YouTube).",
    "Level 3 AWS Infrastructure Engineer.",
    "Terraform, Observability & MLOps Educator."
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById("typingText");

function runTypingLoop() {
    if (!typingEl) return;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        charIndex--;
        typingEl.textContent = currentRole.substring(0, charIndex);
    } else {
        charIndex++;
        typingEl.textContent = currentRole.substring(0, charIndex);
    }

    let delay = isDeleting ? 35 : 65;

    if (!isDeleting && charIndex === currentRole.length) {
        delay = 2200;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
    }

    setTimeout(runTypingLoop, delay);
}

runTypingLoop();

// ==========================================================================
// 2. HERO INTERACTIVE TERMINAL (TAILORED FOR INTERVIEWERS & RECRUITERS)
// ==========================================================================
const terminalScreen = document.getElementById("terminalScreen");
const terminalForm = document.getElementById("terminalForm");
const terminalInput = document.getElementById("terminalInput");
const cmdChips = document.querySelectorAll(".cmd-chip");
const wbTabs = document.querySelectorAll(".wb-tab");

const terminalCommands = {
    profile: {
        cmd: "whoami --summary",
        output: `Name       : Stephen Sam
Role       : Senior Cloud, DevOps & Site Reliability Engineer
Current    : L3 AWS Infrastructure Support Engineer @ Electronikmedia (EM)
YouTube    : Stephen Sam DevOps Malayalam (Observability, Terraform, MLOps)
Location   : Kochi / Thiruvananthapuram, Kerala, India
Creds      : Red Hat Certified System Administrator (RHCSA)`
    },
    youtube: {
        cmd: "youtube --series --channel='@stephen.sam13'",
        output: `Channel : https://www.youtube.com/@stephen.sam13
[1] Observability & Monitoring (Zero to Hero in Malayalam)
    └─ Prometheus, Grafana, ELK Stack, Datadog, CloudWatch, Alerting
[2] Terraform Infrastructure as Code (Zero to Hero in Malayalam)
    └─ AWS S3/CloudFront/ACM, Azure Storage, HCL, Remote State, Modules
[3] MLOps — Machine Learning Operations (Zero to Hero in Malayalam)
    └─ Model Packaging, Containerized Serving, Automated ML Pipelines`
    },
    experience: {
        cmd: "career --timeline",
        output: `* Jan 2026 – Present | L3 AWS Infrastructure Support Engineer @ Electronikmedia
* Jul 2022 – Jan 2026| Senior Cloud & DevOps Engineer @ Grozeo India
* Mar 2020 – Jun 2022| Senior System Administrator @ Sherji Technologies
* Jun 2017 – May 2018| Linux Administrator @ Integralhost`
    },
    skills: {
        cmd: "skills --matrix",
        output: `Cloud        : AWS (L3), Microsoft Azure, Google Cloud
IaC & CI/CD  : Terraform, CloudFormation, Jenkins, GitLab CI, GitHub Actions
Containers   : Docker, Kubernetes (K8s)
Observability: Prometheus, Grafana, ELK Stack, CloudWatch, Datadog
Core & AI Ops: Enterprise Linux (RHCSA), Bash, Networking, Security, MLOps`
    },
    certs: {
        cmd: "certs --verify",
        output: `[✔] Red Hat Certified System Administrator (RHCSA) — Verified
[⟳] Microsoft Certified: Azure Administrator Associate — Pursuing`
    },
    help: {
        cmd: "help",
        output: `Available commands:
  whoami     — Engineer summary & value proposition
  youtube    — View YouTube series & technical contributions
  experience — Production career progression (2017–Present)
  skills     — Full Cloud, DevOps, SRE & MLOps stack
  certs      — Verified industry certifications
  clear      — Clear terminal output`
    }
};

function appendTerminalCommand(key, customRaw) {
    if (!terminalScreen) return;
    const normalized = key.trim().toLowerCase();

    if (normalized === "clear") {
        terminalScreen.innerHTML = "";
        return;
    }

    const entry = terminalCommands[normalized];
    const lineWrap = document.createElement("div");
    lineWrap.className = "term-line";

    if (entry) {
        lineWrap.innerHTML = `
            <div><span class="term-prompt">recruiter@stephensam.com:~$</span><span class="term-cmd">${entry.cmd}</span></div>
            <div class="term-output">${entry.output}</div>
        `;
    } else {
        const safeText = (customRaw || key).replace(/[<>&"']/g, "");
        lineWrap.innerHTML = `
            <div><span class="term-prompt">recruiter@stephensam.com:~$</span><span class="term-cmd">${safeText}</span></div>
            <div class="term-output">Command not found: "${safeText}". Try <span class="term-highlight">whoami</span>, <span class="term-highlight">youtube</span>, <span class="term-highlight">experience</span>, <span class="term-highlight">skills</span>, or <span class="term-highlight">help</span>.</div>
        `;
    }

    terminalScreen.appendChild(lineWrap);
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
}

// Initial boot output in terminal: show Profile + YouTube Contributions immediately!
if (terminalScreen) {
    appendTerminalCommand("profile");
    appendTerminalCommand("youtube");
}

cmdChips.forEach(chip => {
    chip.addEventListener("click", () => {
        cmdChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        const cmdKey = chip.getAttribute("data-cmd");
        appendTerminalCommand(cmdKey);
    });
});

if (terminalForm) {
    terminalForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const raw = terminalInput.value.trim();
        if (!raw) return;
        const mapAlias = {
            "whoami": "profile",
            "youtube --series": "youtube",
            "career --timeline": "experience",
            "skills --matrix": "skills"
        };
        const resolved = mapAlias[raw.toLowerCase()] || raw.toLowerCase();
        appendTerminalCommand(resolved, raw);
        terminalInput.value = "";
    });
}

// Workbench Tab Switching (Terminal vs "Why Hire Me" Diagram)
wbTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        wbTabs.forEach(t => {
            t.classList.remove("active");
            t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("active");
        tab.setAttribute("aria-selected", "true");

        const target = tab.getAttribute("data-wb-tab");
        document.querySelectorAll(".workbench-body").forEach(body => {
            body.classList.remove("active");
        });
        const activeBody = document.getElementById(`wb-${target}`);
        if (activeBody) activeBody.classList.add("active");
    });
});

// ==========================================================================
// 3. SCROLL REVEAL, ACTIVE NAV & MOBILE NAVIGATION
// ==========================================================================
const revealEls = document.querySelectorAll(".scroll-reveal");
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
        }
    });
}, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });

revealEls.forEach(el => revealObserver.observe(el));

const hamburgerBtn = document.getElementById("hamburgerBtn");
const navLinks = document.getElementById("navLinks");

if (hamburgerBtn && navLinks) {
    hamburgerBtn.addEventListener("click", () => {
        const expanded = navLinks.classList.toggle("active");
        hamburgerBtn.setAttribute("aria-expanded", String(expanded));
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburgerBtn.setAttribute("aria-expanded", "false");
        });
    });
}

// Highlight active section in navbar on scroll
const sections = document.querySelectorAll("main .section[id]");
const navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

window.addEventListener("scroll", () => {
    let currentId = "";
    sections.forEach(sec => {
        const top = sec.offsetTop - 160;
        if (window.scrollY >= top) {
            currentId = sec.getAttribute("id");
        }
    });

    navAnchors.forEach(a => {
        a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`);
    });
});
