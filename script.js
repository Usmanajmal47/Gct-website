document.addEventListener('DOMContentLoaded', function () {

    // 1. Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Check if there are counters inside the revealed element
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.innerText; // Get target number
                        const count = +counter.getAttribute('data-count') || 0; // Current count stored in attr
                        const speed = 200; // Lower is faster
                        const inc = target / speed;

                        if (count < target) {
                            const newCount = Math.ceil(count + inc);
                            counter.setAttribute('data-count', newCount);
                            counter.innerText = newCount;
                            setTimeout(updateCount, 20);
                        } else {
                            counter.innerText = target;
                        }
                    };

                    // Only start if not already started
                    if (!counter.getAttribute('data-count')) {
                        // Store original text as target, and set visible to 0 initially
                        // But since we want to be safe, we just animate from 0 to current text
                        // We assume current text IS the target
                        updateCount();
                    }
                });
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // 2. Navbar Scrolled Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile menu
                const toggler = document.querySelector('.navbar-toggler');
                const collapse = document.querySelector('.navbar-collapse');
                if (window.getComputedStyle(toggler).display !== 'none' && collapse.classList.contains('show')) {
                    toggler.click();
                }
            }
        });
    });


    // 4. Form Validation
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                if (form.id === 'contactForm') {
                    event.preventDefault();
                    // Simulate success
                    alert("Thank you! Your message has been sent successfully.");
                    form.reset();
                    form.classList.remove('was-validated');
                    return;
                }
            }
            form.classList.add('was-validated');
        }, false);
    });

});
