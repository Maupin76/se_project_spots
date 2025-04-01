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
// Select the edit modal and the button to open it
const profileEditButton = document.querySelector('.profile__edit-button');
const newPostButton = document.querySelector('.profile__new-post-button');
const editProfileModal = document.querySelector('#edit-profile-modal');
const closeEditProfileModal = editProfileModal.querySelector('.modal__close-button');
// Select the profile elements
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
// Select the form inputs
const editProfileForm = document.querySelector('.modal__form');
const nameInput = document.querySelector('#name');
const descriptionInput = document.querySelector('#description');


const cardModal = document.querySelector('#add-card-modal');
const closeCardButton = cardModal.querySelector('.modal__close-button');

//open the modals
function openModal(modal) {
  modal.classList.add('modal_opened');
}

//close the modals
function closeModal(modal) {
  modal.classList.remove('modal_opened');
}

// Open edit profile modal when the edit button is clicked
profileEditButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(editProfileModal)
});

// close edit profile modal on close button click
closeEditProfileModal.addEventListener('click', () => {
 closeModal(editProfileModal)
});

// Handle form submission to update profile and close modal
function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editProfileModal);
}

//Handle form submission
editProfileForm.addEventListener('submit', handleFormSubmit);

newPostButton.addEventListener('click', () => {
  openModal(cardModal); // Open the add card modal when the new post button is clicked
});

closeCardButton.addEventListener('click', () => {
  closeModal(cardModal);
});


//----------------------------------Card elements------------------------------------

// Select the template for the card and the container where cards will be added
const cardTemplate = document.querySelector('#card-template').content; // Template for the card
const cardsContainer = document.querySelector('.cards__list'); // Container for the cards

// Function to create a card element
function getCardElement(data) {
  // Clone the card template
  const cardElement = cardTemplate.cloneNode(true);

  // Select and update the card elements
  const cardImage = cardElement.querySelector('.card__img');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = data.link; // Set the image source
  cardImage.alt = data.name; // Set the alt text
  cardTitle.textContent = data.name; // Set the card title

  return cardElement; // Return the card element
}

// Iterate over the initialCards array and add each card to the page
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData); // Create a card element
  cardsContainer.appendChild(cardElement); // Add the card to the container
});

// for (let i = 0; i < initialCards.length; i++) {
//   const cardElement = getCardElement(initialCards[i]); // Create a card element
//   cardsContainer.append(cardElement); // Add the card to the container
// }