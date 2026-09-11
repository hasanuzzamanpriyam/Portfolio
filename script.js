const documentRoot = document.documentElement;
documentRoot.classList.add('js');

const sectionLinks = Array.from(document.querySelectorAll('[data-section]'));
const sections = sectionLinks
    .map((link) => document.getElementById(link.dataset.section))
    .filter(Boolean);

function setActiveSection(sectionId) {
    sectionLinks.forEach((link) => {
        const isActive = link.dataset.section === sectionId;
        if (isActive) {
            link.setAttribute('aria-current', 'true');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

sectionLinks.forEach((link) => {
    link.addEventListener('click', () => {
        setActiveSection(link.dataset.section);
    });
});

if ('IntersectionObserver' in window && sections.length > 0) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
            }
        });
    }, {
        rootMargin: '-25% 0px -65% 0px',
        threshold: 0
    });

    sections.forEach((section) => sectionObserver.observe(section));
} else {
    const updateSectionFromScroll = () => {
        const marker = window.scrollY + 140;
        const currentSection = sections.reduce((current, section) => (
            section.offsetTop <= marker ? section : current
        ), sections[0]);
        if (currentSection) {
            setActiveSection(currentSection.id);
        }
    };

    window.addEventListener('scroll', updateSectionFromScroll, { passive: true });
    updateSectionFromScroll();
}

const revealElements = Array.from(document.querySelectorAll('.reveal'));
const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function revealAll() {
    revealElements.forEach((element) => element.classList.add('is-revealed'));
}

function observeReveals() {
    if (reducedMotionQuery.matches || !('IntersectionObserver' in window)) {
        revealAll();
        return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
        });
    }, {
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.08
    });

    revealElements.forEach((element) => revealObserver.observe(element));
}

observeReveals();

reducedMotionQuery.addEventListener?.('change', () => {
    if (reducedMotionQuery.matches) {
        revealAll();
    } else {
        revealElements.forEach((element) => element.classList.remove('is-revealed'));
        observeReveals();
    }
});
