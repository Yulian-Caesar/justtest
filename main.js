const URL_HOME = 'https://payproglobal.com/';
let emailInput = document.getElementById('email-input');
let urlInput = document.getElementById('url-input');
let submitButton = document.getElementById('submit-button');
let form = document.getElementById('form');

let isEmailInputValid = false;
let isUrlInputValid = false;

function validateEmailInput() {
    if(emailInput.value !== '' && !emailInput.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        isInputInvalid(emailInput, true);
        isEmailInputValid = false;
        return false;
    }
    isInputInvalid(emailInput, false);
    isEmailInputValid = true;
    isFormValid();
}

function validateUrlInput() {
    if(urlInput.value === '') {
        isInputInvalid(urlInput, false);
        isFormValid();
        return true;
    }

    if(!urlInput.value.startsWith('https://')) {
        isInputInvalid(urlInput, true);
        isUrlInputValid = false;
        isFormValid();
        return false;
    }
    
    try {
        new URL(urlInput.value);
        isInputInvalid(urlInput, false);
        isUrlInputValid = true;
        isFormValid();
        return true;
    } catch (err) {
        isInputInvalid(urlInput, true);
        isUrlInputValid = false;
        isFormValid();
        return false;
    }
}


function isInputInvalid(elInput, showError) {
    if (showError) {
        elInput.setAttribute('data-error', '');
    } else {
        elInput.removeAttribute('data-error');
    }
}

function isFormValid() {
    if (isEmailInputValid && isUrlInputValid) {
        submitButton.disabled = false;
        console.log('not disabled');
    } else {
        submitButton.disabled = true;
        console.log('disabled')
    }
}

async function fetchForm() {
    (async function () {
        try {
            let result = await fetch(urlInput.nodeValue, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: emailInput.value,
                    url: urlInput.value
                })
            })
            console.log('work');
            console.log(urlInput.value);
            console.log(urlInput.nodeValue);
            } catch(err) {
                console.log("Something failed");
            } finally {
                // window.location.href = URL_HOME;
        }
    })();
}


emailInput.addEventListener('blur', validateEmailInput);
urlInput.addEventListener('blur', validateUrlInput);
// form.addEventListener('blur', isFormValid, true);
submitButton.addEventListener("click", fetchForm);
