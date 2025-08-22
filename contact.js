document.addEventListener('DOMContentLoaded', function() {
    const fab = document.getElementById('chat-fab');
    const popup = document.getElementById('chat-popup');

    if (!fab || !popup) {
        console.error('Chat widget elements not found.');
        return;
    }

    fab.addEventListener('click', function() {
        popup.classList.toggle('show');
        fab.classList.toggle('open');
    });

    // Optional: Close popup when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideWidget = fab.contains(event.target) || popup.contains(event.target);

        if (!isClickInsideWidget && popup.classList.contains('show')) {
            popup.classList.remove('show');
            fab.classList.remove('open');
        }
    });
});