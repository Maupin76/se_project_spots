const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
  },
];

//----------------------------------Modal form window------------------------------------
// Select modals and buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const newPostButton = document.querySelector('.profile__new-post-button');

const editProfileModal = document.querySelector('#edit-profile-modal');
const addCardModal = document.querySelector('#add-card-modal');

const closeEditProfileModal = editProfileModal.querySelector('.modal__close-button');
const closeCardButton = addCardModal.querySelector('.modal__close-button');

// Profile info elements
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');

// Form elements
const editProfileForm = document.forms['edit-profile']; // ✅ select by name
const addCardForm = document.forms['add-card']; // ✅ select by name

const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');
const cardImageInput = document.querySelector('#link');
const cardCaptionInput = document.querySelector('#caption');

// Modal utilities
function openModal(modal) {
  modal.classList.add('modal_opened');
}

function closeModal(modal) {
  modal.classList.remove('modal_opened');
}

// Open/close modals
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal);
});

closeEditProfileModal.addEventListener('click', () => closeModal(editProfileModal));

newPostButton.addEventListener('click', () => openModal(addCardModal));
closeCardButton.addEventListener('click', () => closeModal(addCardModal));

// Handle Edit Profile form submission
function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editProfileModal);
}

// Handle Add Card form submission
function handleAddCardFormSubmit(event) {
  event.preventDefault();

  const newCardData = {
    name: cardCaptionInput.value,
    link: cardImageInput.value
  };

  const newCardElement = getCardElement(newCardData);
  cardsContainer.prepend(newCardElement);
  closeModal(addCardModal);
  addCardForm.reset();
}

// Add event listeners to forms
editProfileForm.addEventListener('submit', handleFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

//----------------------------------Card elements------------------------------------
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.cards__list');

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.card__img');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsContainer.appendChild(cardElement);
});


// for (let i = 0; i < initialCards.length; i++) {
//   const cardElement = getCardElement(initialCards[i]); // Create a card element
//   cardsContainer.append(cardElement); // Add the card to the container
// }