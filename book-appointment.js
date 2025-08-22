document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic validation
            const name = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const date = document.getElementById('appointmentDate').value;
            const service = document.getElementById('service').value;

            if (!name || !email || !phone || !date || !service) {
                alert('Please fill out all required fields.');
                return;
            }

            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for booking! We will confirm your appointment via email shortly.';

            // Style the message
            successMessage.style.position = 'fixed';
            successMessage.style.top = '20px';
            successMessage.style.right = '20px';
            successMessage.style.backgroundColor = 'var(--primary-color)';
            successMessage.style.color = 'white';
            successMessage.style.padding = '15px 25px';
            successMessage.style.borderRadius = '5px';
            successMessage.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            successMessage.style.zIndex = '10000';
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateX(20px)';
            successMessage.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';

            // Add message to the page
            document.body.appendChild(successMessage);

            // Animate in
            setTimeout(() => {
                successMessage.style.opacity = '1';
                successMessage.style.transform = 'translateX(0)';
            }, 10);

            // Reset form
            form.reset();

            // Remove message after 5 seconds
            setTimeout(() => {
                successMessage.style.opacity = '0';
                successMessage.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    document.body.removeChild(successMessage);
                }, 300);
            }, 5000);
        });
    }

    // Set min date for appointment date input to today
    const dateInput = document.getElementById('appointmentDate');
    if(dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});