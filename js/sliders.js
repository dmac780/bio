// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Function to initialize a slider
    function initializeSlider(sliderClass) {
        // Select the slider element
        const slider = document.querySelector(sliderClass);
        if (!slider) return;

        // Get slider components
        const sliderContent = slider.querySelector('.slider-content');
        const prevButton = slider.querySelector('.slider-button.prev');
        const nextButton = slider.querySelector('.slider-button.next');
        const sliderItems = slider.querySelectorAll('.slider-item');
        let currentIndex = 0;
        let startX, startY, currentX, currentY;
        let isDragging = false;
        let isScrolling = false;

        // Function to display a specific slide
        function showSlide(index) {
            currentIndex = Math.max(0, Math.min(index, sliderItems.length - 1));
            const offset = currentIndex * 100;
            sliderContent.style.transform = `translateX(-${offset}%)`;
            updateButtons();
        }

        // Function to update button states
        function updateButtons() {
            prevButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === sliderItems.length - 1;
        }

        // Event listeners for navigation buttons
        prevButton.addEventListener('click', () => showSlide(currentIndex - 1));
        nextButton.addEventListener('click', () => showSlide(currentIndex + 1));

        // Function to handle the start of a drag
        function handleDragStart(e) {
            isDragging = true;
            isScrolling = false;
            startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
            startY = e.type.includes('mouse') ? e.pageY : e.touches[0].pageY;
            currentX = startX;
            currentY = startY;
            sliderContent.style.transition = 'none';
        }

        // Function to handle drag movement
        function handleDragMove(e) {
            if (!isDragging) return;
            currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
            currentY = e.type.includes('mouse') ? e.pageY : e.touches[0].pageY;
            const diffX = currentX - startX;
            const diffY = currentY - startY;

            // Detect if user is trying to scroll vertically
            if (!isScrolling && Math.abs(diffY) > Math.abs(diffX)) {
                isScrolling = true;
                isDragging = false;
                return;
            }

            if (isScrolling) return;

            e.preventDefault();
            const translateX = -currentIndex * 100 + (diffX / sliderContent.offsetWidth) * 100;
            sliderContent.style.transform = `translateX(${translateX}%)`;
        }

        // Function to handle the end of a drag
        function handleDragEnd() {
            if (!isDragging) return;
            isDragging = false;
            sliderContent.style.transition = '';
            const diff = currentX - startX;
            if (Math.abs(diff) > sliderContent.offsetWidth / 4) {
                if (diff > 0) {
                    showSlide(currentIndex - 1);
                } else {
                    showSlide(currentIndex + 1);
                }
            } else {
                showSlide(currentIndex);
            }
        }

        // Add touch event listeners
        sliderContent.addEventListener('touchstart', handleDragStart, { passive: true });
        sliderContent.addEventListener('touchmove', handleDragMove, { passive: false });
        sliderContent.addEventListener('touchend', handleDragEnd);

        // Add mouse event listeners
        sliderContent.addEventListener('mousedown', handleDragStart);
        sliderContent.addEventListener('mousemove', handleDragMove);
        sliderContent.addEventListener('mouseup', handleDragEnd);
        sliderContent.addEventListener('mouseleave', handleDragEnd);

        // Prevent default drag behavior
        sliderContent.addEventListener('dragstart', (e) => e.preventDefault());

        // Initialize slider
        updateButtons();
        showSlide(0);
    }

    // Initialize both sliders
    initializeSlider('.timeline-slider');
    initializeSlider('.portfolio-slider');
});