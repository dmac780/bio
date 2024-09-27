document.addEventListener('DOMContentLoaded', function() {

    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.querySelector('.close-modal');
    const readMoreButtons = document.querySelectorAll('.read-more-btn');

    if (modal && modalContent && closeModal) {
        readMoreButtons.forEach(button => {
            button.addEventListener('click', function() {
                const portfolioItem = this.closest('.portfolio-item');
                if (portfolioItem) {
                    const details = portfolioItem.querySelector('.portfolio-item-details');
                    if (details) {
                        modalContent.innerHTML = details.innerHTML;
                        modal.style.display = 'block';
                    }
                }
            });
        });

        closeModal.onclick = function() {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
    } else {
        console.error('One or more required elements are missing from the DOM');
    }
});