const contactF = document.getElementById("contact-form");
const newsF = document.getElementById("news-form");


if (contactF) {
contactF.addEventListener('submit', submitAct);}
newsF.addEventListener('submit', submitAct);


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
    $('#email-modal-header').html(`Thank You`);
    $('#email-modal-body').html(`You will receive a response shortly.`);
    $('#email-modal').modal('show');
    clearInput();
}

// Posts failure message into modal
function errorResponse(error) {
    $('#email-modal-header').html(`Sorry!`);
    $('#email-modal-body').html(`There appears to be a problem! <br>
                            Error Info: <br>
                            ${error.status}${error.text}`);
    $('#email-modal').modal('show');;
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