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

// Select the modal and the button to open it
const profileEditButton = document.querySelector('.profile__edit-button');
const editProfileModal = document.querySelector('#edit-profile-modal');
const closeEditProfileModal = editProfileModal.querySelector('.modal__close-button');

//open the modal
// This creates the function that will add the class 'modal_opened' to the modal
function openModal() {
  editProfileModal.classList.add('modal_opened');
}
// Add an event listener to the overlay to close the modal
profileEditButton.addEventListener('click', openModal);

//close the modal
// This function removes the class 'modal_opened' from the modal
function closeModal() {
  editProfileModal.classList.remove('modal_opened');
}
// Add an event listener to the overlay to close the modal
closeEditProfileModal.addEventListener('click', closeModal);
