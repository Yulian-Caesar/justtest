const URL_HOME = 'https://payproglobal.com/';
let emailInput = document.getElementById('email-input');
let emailError = document.getElementById('email-error');
let urlInput = document.getElementById('url-input');
let urlError = document.getElementById('url-error');
let submitButton = document.getElementById('submit-button');
let form = document.getElementById('form');

let isEmailInputValid = false;
let isUrlInputValid = false;

// console.log(form)

function validateEmailInput() {
    if(emailInput.value !== '' && !emailInput.value.match(/^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
        isInputInvalid(emailError, emailInput, true);
        isEmailInputValid = false;
        return false;
    }
    isInputInvalid(emailError, emailInput, false);
    isEmailInputValid = true;
}

function validateUrlInput() {
    if(!urlInput.value.startsWith('https://')) {
        isInputInvalid(urlError, urlInput, true);
        isUrlInputValid = false;
        return false
    }
    
    try {
        new URL(urlInput.value);
        isInputInvalid(urlError, urlInput, false);
        isUrlInputValid = true;
        return true;
    } catch (err) {
        isInputInvalid(urlError, urlInput, true);
        isUrlInputValid = false;
        return false;
    }
}


function isInputInvalid(elError, elInput, showError) {
    if (showError) {
        elInput.setAttribute('data-error', '');
    } else {
        elInput.removeAttribute('data-error');
    }
}

function isFormValid() {
    if (isEmailInputValid && isUrlInputValid) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

// async function sendData(e) {
//     e.preventDefault();
//     console.log('work');
//     const xhr = new XMLHttpRequest();
//     let json = JSON.stringify({
//         email: emailInput.value,
//         url: urlInput.value
//     });
//     xhr.open("POST", urlInput.value);
//     xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
//     xhr.send(json);

// }



emailInput.addEventListener('keyup', validateEmailInput);
urlInput.addEventListener('keyup', validateUrlInput);
form.addEventListener('blur', isFormValid, true);
// form.addEventListener('submit', sendData);

async function fetchForm() {
    const response = await fetch(urlInput.nodeValue, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({a: 1, b: 'Textual content'})
    })
    .then(console.log('its work'))
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    console.log('hello');

    (async function () {
        try {
            let result = await fetchForm();
            console.log('work')
          } catch(err) {
            alert("Something failed");
          } finally {
            console.log('All Tasks are Done');
            // window.location.href = URL_HOME;
          }
    })();
  });


// Умови:
// 1) перевірка першого інпута на валідність email
// 2) перевіряти другий інпут, URL-адреса повинно перевіряти чи введене значення починається з "https://" 
// 3) перевіряти другий інпут, чи введене значення є дійсною URL-адресою.
// 4) після того як ввів коректні дані для двох полей вводу, 
// коли останнє поле вводу втратить focus - кнопка повинна стати доступною для натискання
// 5) після нажаття кнопки відправлення форми, 
//  форма має бути відправлена за посиланням із введеної URL-адреси підтвердження. Для надсилання використовуйте метод POST
// 6)клієнта слід перенаправити на  payproglobal.com.


// form onsubmit, при submit виконувати функцію sendData (переробити у fetch (async await)) і потім викликати redicrect

