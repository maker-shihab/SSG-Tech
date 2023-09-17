const overlay = document.querySelector('.overlay');
const notificationBtn = document.querySelector('.db-notifications');
const notificationSection = document.querySelector('.notification-section');


notificationBtn.addEventListener('click', notificationPopup);


function notificationPopup(event) {
  event.stopPropagation();
  notificationSection.classList.toggle('active');
}

// Modal Dialog
// Function to open the modal
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

// Function to close the modal
function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// Event delegation for modal triggers
document.body.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("modal-trigger")) {
    const modalId = target.getAttribute("data-modal-target");
    openModal(modalId);
    event.stopPropagation();
    event.preventDefault();
  }
});

// Event listener for the close button
document.body.addEventListener("click", function (event) {
  const target = event.target;
  const closeBtn = target.closest(".modal_close");

  if (closeBtn) {
    console.log("Close button clicked");
    const modalId = closeBtn.getAttribute("data-modal-close");
    console.log("Modal ID to close: ", modalId);
    closeModal(modalId);
  }
});

// Close the modals when clicking outside of them
document.body.addEventListener("click", function (event) {
  if (event.target.classList.contains("modal")) {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      closeModal(modal.id);
    });
  }
});
// To redirect a button to another page
const redirectToIndexButton = document.getElementById("redirectToIndex");

redirectToIndexButton.addEventListener("click", function () {
  // Replace 'index.html' with the actual URL of your index page
  window.location.href = "index.html";
});

