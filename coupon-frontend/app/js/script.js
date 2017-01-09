var modal = document.getElementById('success');
var form = document.getElementById('signup-form');
// close modal if click outside
window.onclick = function(event) {
    if (event.target === modal) modal.style.display = 'none';
}

function submitForm() {
}

function error(target) {
}

function clearError(target) {
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
