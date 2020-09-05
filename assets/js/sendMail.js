// variables for the contact form or newsletter form
const contactF = document.getElementById("contact-form");
const newsF = document.getElementById("news-form");

// selects contact form if present. Newsletter form is present on every page
if (contactF) {
contactF.addEventListener('submit', submitAct);}
newsF.addEventListener('submit', submitAct);

/**
 * Prevents form refreshing the page on submission.
 * @param {Object} event 
 */
function submitAct(event) {
    event.preventDefault();
    $('#email-modal-header').html(`Sending...`);
    $('#email-modal-body').html(`Please wait...`);
    $('#email-modal').modal('show');
}

/**
 * Clears the form fields after a successful response. Does not clear on error.
 */
function clearInput() {
    setTimeout( function() {
    $('.clear').val('');
    $('textarea').val('');
    }, 1000);
}

/**
 * Posts thank you message into modal after successful response.
 */
function okResponse() {
    $('#email-modal-header').html(`Thank You`);
    $('#email-modal-body').html(`You will receive a response shortly.`);
    $('#email-modal').modal('show');
    clearInput();
}

/**
 * Posts failure message into modal after error
 * @param {Object} error 
 */
function errorResponse(error) {
    $('#email-modal-header').html(`Sorry!`);
    $('#email-modal-body').html(`There appears to be a problem! <br>
                            Error Info: <br>
                            ${error.status}${error.text}`);
    $('#email-modal').modal('show');
}


/**
 * Sends form with all necessary parameters for the contact page form.
 * @param {Object} contactForm 
 */
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

/**
 * Sends form with all necessary parameters for the newsletter form.
 * @param {Object} contactForm 
 */
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