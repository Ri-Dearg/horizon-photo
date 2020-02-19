const contactF = document.getElementById("emailform");

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
    $('#emailmodalheader').html(`Thank You`);
    $('#emailmodalbody').html(`You will receive a response shortly.`);
    $('#emailmodal').modal('show');
    clearInput();
}

// Posts failure message into modal
function errorResponse(error) {
    $('#emailmodalheader').html(`Sorry!`);
    $('#emailmodalbody').html(`There appears to be a problem! <br>
                            Error Info: <br>
                            ${error.status}${error.text}`);
    $('#emailmodal').modal('show');;
}

// Sends email with all parameters
function sendMailContact(contactForm) {
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

function sendMailNews(contactForm) {
    emailjs.send('horizon_photo', 'basic', {
        'user_email': contactForm.email.value,
    })
        .then(function (response) {
            okResponse();
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
            errorResponse(error);
        });
}