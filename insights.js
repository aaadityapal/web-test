// This file is ready for any custom JavaScript for the insights page.
// For example, you could add filtering logic or animations here.

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('article-modal');
    if (!modal) return;

    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.querySelector('.modal-close');

    const blogCards = document.querySelectorAll('.blog-card');

    blogCards.forEach(card => {
        const readMoreLink = card.querySelector('.read-more');
        if (readMoreLink) {
            readMoreLink.addEventListener('click', function(e) {
                e.preventDefault();

                // Get data from the card
                const imageSrc = card.querySelector('.blog-card-image img').src;
                const title = card.querySelector('.blog-card-title').textContent;
                const excerpt = card.querySelector('.blog-card-excerpt').textContent;

                // Populate the modal
                modalImg.src = imageSrc;
                modalTitle.textContent = title;
                // Using placeholder content for the full article
                modalBody.innerHTML = `
                    <p>${excerpt}</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Cras mattis consectetur purus sit amet fermentum. Curabitur blandit tempus porttitor. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                    <img src="https://images.unsplash.com/photo-1488998427799-e3362cec87c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Additional article image 1" style="width: 100%; border-radius: 10px; margin-bottom: 20px;">
                    <p>Donec ullamcorper nulla non metus auctor fringilla. Maecenas sed diam eget risus varius blandit sit amet non magna. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Aenean lacinia bibendum nulla sed consectetur. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper.</p>
                    <img src="https://images.unsplash.com/photo-1503437313881-503a91226c02?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Additional article image 2" style="width: 100%; border-radius: 10px; margin-bottom: 20px;">
                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Sed posuere consectetur est at lobortis. Donec id elit non mi porta gravida at eget metus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum.</p>
                    <img src="https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" alt="Additional article image 3" style="width: 100%; border-radius: 10px; margin-bottom: 20px;">
                `;

                // Show the modal
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('show');
                    document.body.classList.add('modal-open');
                }, 10); // Small delay for transition
            });
        }
    });

    function closeModal() {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Match transition duration
    }

    // Close modal via close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal by clicking on the overlay
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});