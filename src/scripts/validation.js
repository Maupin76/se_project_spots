export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error",
};

// Disable a submit button and apply styling
export const disableButton = (buttonElement, config) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
};

// Show error message for a specific input
const showInputError = (formElement, inputElement, errorMessage, settings) => {
  const errorMsgElement = formElement.querySelector(
    `#${inputElement.id}-error`
  );
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
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      settings
    );
  } else {
    hideInputError(formElement, inputElement, settings);
  }
};

// Reset all input errors and disable button
export const resetFormState = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });

  disableButton(buttonElement, config);
};

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(
    formElement.querySelectorAll(settings.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );

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

  formElement.addEventListener("reset", () => {
    disableButton(buttonElement, settings);
  });

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    });
  });
};

export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

// Kick off validation setup
// enableValidation(settings);
