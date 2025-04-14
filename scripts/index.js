const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Landscape Test",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
];

//------------------- DOM Elements -------------------
const profileEditButton = document.querySelector(".profile__edit-button");
const newPostButton = document.querySelector(".profile__new-post-button");

const editProfileModal = document.querySelector("#edit-profile-modal");
const addCardModal = document.querySelector("#add-card-modal");
const previewModal = document.querySelector("#preview-modal");

const closeEditProfileModal = editProfileModal.querySelector(".modal__close-button");
const closeCardButton = addCardModal.querySelector(".modal__close-button");
const closePreviewButton = previewModal.querySelector(".modal__close_type_preview");

const cardSubmitButton = addCardModal.querySelector(".modal__submit-button");

const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editProfileForm = document.forms["edit-profile"];
const addCardForm = document.forms["add-card"];

const nameInput = document.querySelector("#name");
const descriptionInput = document.querySelector("#description");
const cardImageInput = document.querySelector("#link");
const cardCaptionInput = document.querySelector("#caption");

const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".cards__list");

//------------------- Modal Utilities -------------------
function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

// Close the edit profile modal when its close button is clicked
closeEditProfileModal.addEventListener("click", () => {
  closeModal(editProfileModal);
});

// Close the add card modal when its close button is clicked
closeCardButton.addEventListener("click", () => {
  closeModal(addCardModal);
});

// Close the preview modal when its close button is clicked
closePreviewButton.addEventListener("click", () => {
  closeModal(previewModal);
});


// Close modal if user clicks on the overlay (outside the modal content)
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (event) => {
    // Only close if the user clicked directly on the overlay
    if (event.target === modal) {
      closeModal(modal);
    }
  });
});

//------------------- Event Listeners -------------------
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  resetFormState(editProfileForm, settings); // Reset error state and disable button
  openModal(editProfileModal);
});

newPostButton.addEventListener("click", () => {
  resetFormState(addCardForm); // Reset error state and disable button
  openModal(addCardModal);
});


newPostButton.addEventListener("click", () => openModal(addCardModal));

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editProfileModal);

  const button = editProfileForm.querySelector(".modal__submit-button");
  disableButton(button, settings); // Disable again after submission
});

addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const newCardData = {
    name: cardCaptionInput.value,
    link: cardImageInput.value,
  };
  cardsContainer.prepend(createCardElement(newCardData));
  closeModal(addCardModal);
  addCardForm.reset();

  const button = addCardForm.querySelector(".modal__submit-button");
  disableButton(button); // Disable again after submission
});

//------------------- Card Generation -------------------
function createCardElement(data) {
  const card = cardTemplate.cloneNode(true);
  const cardRoot = card.querySelector(".card");
  const cardImage = card.querySelector(".card__img");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardDeleteButton = card.querySelector(".card__delete-button");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_liked");
  });

  cardDeleteButton.setAttribute("aria-label", "Delete card");
  cardDeleteButton.addEventListener("click", () => {
    cardRoot.remove();
  });

  cardImage.addEventListener("click", () => {
    previewImage.src = data.link;
    previewImage.alt = data.name;
    previewCaption.textContent = data.name;
    openModal(previewModal);
  });

  return card;
}

initialCards.forEach((card) =>
  cardsContainer.append(createCardElement(card))
);
