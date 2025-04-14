const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__disable_submit-button",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error"
};

// Disable a submit button and apply styling
const disableButton = (buttonElement, config) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(settings.inactiveButtonClass);
};

// Show error message for a specific input
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorMsgElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorMsgElement.classList.add(settings.errorClass);
  errorMsgElement.textContent = errorMessage;
};

// Hide error message for a specific input
const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = "";
};

// Check if a specific input is valid
const checkInputValidity = (formElement, inputElement, settings) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

// Reset all input errors and disable button
const resetFormState = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, settings);
  });

  disableButton(buttonElement, settings);
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => !inputElement.validity.valid);
  };

  const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
      disableButton(buttonElement, settings);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(settings.inactiveButtonClass);
    }
  };

  // Initial state
  toggleButtonState(inputList, buttonElement, settings);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

// Kick off validation setup
enableValidation(settings);
