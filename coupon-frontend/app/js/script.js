var modal = document.getElementById('success');
var form = document.getElementById('js-signup-form');
// close modal if click outside
window.onclick = function(event) {
    if (event.target === modal) modal.style.display = 'none';
}

function submitForm() {
    displayError('');
    var errorMessage = '';

    if (!validatePhone()) {
        error(form.phone);
        errorMessage = 'Missing phone';
    }

    if (!validateEmail()) {
        error(form.email);
        errorMessage += '<br />Missing email';
    }
       
    if (!validateProvider()) {
        error(form.phoneProvider);
        errorMessage += '<br />Missing provider'
    }

    if (errorMessage) {
        displayError(errorMessage);
        return;
    }

    var data = {
        phone: form.phone.value,
        phoneProvider: form.phoneProvider.value
    };

    fetch('/', {
        headers: {
            'Content/Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(data)
    }).then(function(res) {
        if (!res.ok) alert('there was an error :(((');
        modal.style.display = 'block';
    }).catch(function(err) {
        alert('there was an error');
    });
}

function checkOther() {
    if (form.phoneProvider.value === 'other') {
        // create a new input field
        var newInput = document.createElement('input');
        newInput.setAttribute('name', 'iwyfdj');
        form.appendChild(newInput);
    }
}

function error(target) {
    target.style.border = "3px solid #F00";
}

function clearError(target) {
    target.style.border = '';
}

// validates and returns the sanitized string
function validatePhone() {
    var phone = form.phone.value;
    var sanitized = '';
    for (var i = 0; i < phone.length; i++) {
        if (!isNaN(phone[i]) && phone[i] !== ' ')
            sanitized += phone[i];
    }
    if (sanitized.length !== 10) {
        error(form.phone);
        return '';
    }
    return sanitized;
}

// returns true iff valid
function validateEmail() {
    var emailInput = form.email;
    if (!emailInput.value) return true;
    // http://emailregex.com/
    var isValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailInput.value);
    if (!isValid) error(emailInput);
    return isValid;
}

// add field if 'Other' provider
function validateProvider() {
    clearError(form.phoneProvider);
    if (form.phoneProvider.value === 'other') {
        if (form['other-provider'].style.display === 'none') {
            form['other-provider'].style.display = 'inline-block';
            return false;
        }
        else {
            if (!form['other-provider'].value) {
                error(form['other-provider']);
                return false;
            } else return true;
        }
    }
    else {
        form['other-provider'].style.display = 'none';
        if (form.phoneProvider.value === 'null') {
            error(form.phoneProvider);
            return false;
        }
        return true;
    }
}

function clearForm() {
    form.reset();
    clearError(form.email);
    clearError(form.phone);
    clearError(form.phoneProvider);
    clearError('message');
}

function submitSuccess(res) {
}

function submitError(res) {
}

function displayError(message) {
    var errorDiv = document.getElementById('error-message');
    errorDiv.innerHTML = message;
    errorDiv.style.visibility = 'visible';
}
