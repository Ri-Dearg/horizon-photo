// Prevents form refresh
var form = document.getElementById("contactform");
function stopRefresh(event) { event.preventDefault(); } 
form.addEventListener('submit', stopRefresh);

// Sends email with all parameters
function sendMail(contactForm) {
    emailjs.send('horizon_photo', 'basic', {
        'user_name': contactForm.name.value,
        'user_email': contactForm.email.value,
        'user_number': contactForm.number.value,
        'user_message': contactForm.message.value,
    })
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });
}