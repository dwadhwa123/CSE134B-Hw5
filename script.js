
const button = document.querySelector('.theme_button');


if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark_mode');
  button.textContent = 'Switch to Ocean Mode'; 
} 
else if (localStorage.getItem('theme') === 'ocean') {
  document.body.classList.add('ocean_mode');
  button.textContent = 'Switch to Light Mode'; 
} 
else {
  button.textContent = 'Switch to Dark Mode';
}

button.addEventListener('click', () => {
  // Cycle through the themes: Dark -> Ocean -> Light
  if (document.body.classList.contains('dark_mode')) {
    document.body.classList.remove('dark_mode');
    document.body.classList.add('ocean_mode');
    localStorage.setItem('theme', 'ocean');
    button.textContent = 'Switch to Light Mode'; 
  } 
  else if (document.body.classList.contains('ocean_mode')) {
    document.body.classList.remove('ocean_mode');
    document.body.classList.add('light_mode');
    localStorage.setItem('theme', 'light');
    button.textContent = 'Switch to Dark Mode'; 
  } 
  else {
    document.body.classList.remove('light_mode');
    document.body.classList.add('dark_mode');
    localStorage.setItem('theme', 'dark');
    button.textContent = 'Switch to Ocean Mode'; 
  }
});


const commentsField = document.querySelector('.comments');
const errorMessage = document.querySelector('.error-message');
const nameField = document.querySelector('.name');
const form = document.querySelector('.info_form');
const emailField = document.querySelector('.email');
const submitButton = document.querySelector('.submit_button')
const phoneField = document.querySelector('.number');
const errorField = document.querySelector('.form-errors')


commentsField.addEventListener('input', function() {
  const regex = /[^a-zA-Z0-9\s.,!?'-]/; 
  
  if (regex.test(commentsField.value)) {
    errorMessage.style.display = 'block';
    errorMessage.innerText = 'The comments have an illegal character';
    setTimeout(() => {
      errorMessage.style.display = 'none';
  }, 3000);
  } 
  else {
    errorMessage.style.display = 'none';
  }

  const length = commentsField.value.length;
  const charactersLeft = 500 - length;

  const charCount = document.querySelector('.info-message');

  charCount.textContent = `${charactersLeft} characters remaining`;

});

let form_errors;

function captureFormErrors() {
  form_errors = []; 
  let isValid = true;

  if (nameField.value.trim() === '') {
    form_errors.push({
      nameError: 'Name cannot be empty'
    });
    if(isValid){
      errorMessage.style.display = 'block';
      errorMessage.innerText = "Name cannot be empty";
    }
    isValid = false;

    nameField.style.borderColor = 'red';
  }
  else{
    nameField.style.borderColor = 'green';
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
  if (emailField.value.trim() === '') {
    form_errors.push({
      emailError: 'Email cannot be empty'
    });
    if(isValid){
      errorMessage.style.display = 'block';
      errorMessage.innerText = "Email cannot be empty";
    }
    isValid = false;

    emailField.style.borderColor = 'red';
  }
  else if (!emailRegex.test(emailField.value)) {
    form_errors.push({
      emailError: 'Invalid email address format'
    });
    if(isValid){
      errorMessage.style.display = 'block';
      errorMessage.innerText = "Invalid email address format";
    }

    isValid = false;

    emailField.style.borderColor = 'red';
  }
  else{
    emailField.style.borderColor = 'green';
  }

  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  if (!phoneRegex.test(phoneField.value) && phoneField.value.trim() !== '') {
    form_errors.push({
      phoneError: 'Invalid phone number format'
    });
    if(isValid){
      errorMessage.style.display = 'block';
      errorMessage.innerText = "Invalid phone number format";
    }

    isValid = false;

    phoneField.style.borderColor = 'red';
  }
  else{
    phoneField.style.borderColor = 'green';
  }

  const commentsRegex = /[^a-zA-Z0-9\s.,!?'-]/; 
  if (commentsField.value.length < 10 && commentsRegex.test(commentsField.value)) {
    form_errors.push({
      commentsError: 'Comments must be at least 10 characters long and cannot contain special characters'
    });
    if(isValid){
      errorMessage.style.display = 'block';
      errorMessage.innerText = "Comments must be at least 10 characters long and cannot contain special characters";
    }

    isValid = false;
    commentsField.style.borderColor = 'red';
  }
  else if(commentsRegex.test(commentsField.value)){
    form_errors.push({
      commentsError: 'Invalid comments format. Comments cannot contain special characters'
    });
    if(isValid){
      errorMessage.style.display = 'block';
      errorMessage.innerText = "Invalid comments format. Comments cannot contain special characters";
    }
    isValid = false;
    commentsField.style.borderColor = 'red';
  }
  else if(commentsField.value.length < 10){
    form_errors.push({
      commentsError: 'Comments must be at least 10 characters long'
    });
    if(isValid){
      errorMessage.style.display = 'block';
      errorMessage.innerText = "Comments must be at least 10 characters long";
    }
    isValid = false;
    commentsField.style.borderColor = 'red';
  }
  else{
    commentsField.style.borderColor = 'green';
  }

  errorField.value = JSON.stringify(form_errors, null, 2);

  return isValid;
}

submitButton.addEventListener('click', function(event) {
  event.preventDefault();

  const isValid = captureFormErrors();

  if (isValid) {
    form.submit();
    console.log('Form is valid.');

  } else {
    console.log('Form errors:', form_errors);
  }
});


