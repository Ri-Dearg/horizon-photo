const contactF = document.getElementById("contactform");

contactF.addEventListener('submit', submitAct);

// Prevents form refreshing the page
function submitAct(event) {
    event.preventDefault();
}

function clearInput() {
    setTimeout( function() {
    $('.clear').val('');
    $('textarea').val('')
    }, 1000)
}

// Posts thank you message into modal
function okResponse() {
    $('#contactheader').html(`Thank You`);
    $('#contactbody').html(`Your email has been sent. You will receive a response shortly.`);
    $('#contactmodal').modal('show');
    clearInput();
}

// Posts failure message into modal
function errorResponse(error) {
    $('#contactheader').html(`Sorry!`);
    $('#contactbody').html(`There appears to be a problem sending your email. <br>
                            Error Info: <br>
                            ${error.status}${error.text}`);
    $('#contactmodal').modal('show');;
}

// Sends email with all parameters
function sendMail(contactForm) {
    emailjs.send('horizon_photo', 'basic', {
        'user_name': contactForm.name.value,
        'user_email': contactForm.email.value,
        'user_number': contactForm.number.value,
        'user_message': contactForm.message.value,
    })
        .then(function (response) {
            okResponse();
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
            errorResponse(error);
        });
}