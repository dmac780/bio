document.addEventListener('DOMContentLoaded', function() {
    
    // Select all acnhor tags with anchor scroll href values
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {

            e.preventDefault();

            // grab the href of the click and smooov scoll bruh
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL without page refresh
                history.pushState(null, null, this.getAttribute('href'));
            }
        });
    });

    // Handle initial load with hash in URL
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }
});