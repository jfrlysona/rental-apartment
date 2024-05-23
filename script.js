const image = document.querySelector(".image img");
const imageName = document.querySelector(".image .img-name");
const imgOptions = document.querySelectorAll(".img-options img");
const subscribeBtn = document.querySelector(".rules button");
const modal = document.querySelector(".modal-container");
const closeBtn = document.querySelector(".modal .fa-xmark");
const closeBtnSidebar = document.querySelector(".sidebar .fa-xmark");
const modalInput = document.querySelector(".modal input");
const modalBtn = document.querySelector(".modal button");
const subscribeForm = document.getElementById("subscribeForm");
const messageForm = document.getElementById("messageForm");
const rentalForm = document.getElementById("rentalForm");
const menuIcon = document.querySelector("nav .fa-bars");
const sidebar = document.querySelector(".sidebar");

const apiEndpoint = "https://a4b152c817384414a142a289219ce277.api.mockbin.io/";

function setImageUrlAndName(img) {
  const imgUrl = img.getAttribute("src");
  image.setAttribute("src", imgUrl);
  const imgName = img.getAttribute("alt");
  imageName.textContent = imgName;
}

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

function openSidebar() {
  sidebar.style.display = "block";
}

function closeSidebar() {
  sidebar.style.display = "none";
}

function validateEmail() {
  const emailInput = document.getElementById("emailInput");
  const email = emailInput.value;
  const errorMessage = document.getElementById("error-message");

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let isValid = true;

  if (emailPattern.test(email)) {
    errorMessage.style.display = "none";
    setTimeout(() => {
      closeModal();
    }, 700);
  } else {
    errorMessage.style.display = "block";
    errorMessage.textContent = "Invalid email address";
    isValid = false;
  }

  if (email.length === 0) {
    errorMessage.style.display = "block";
    errorMessage.textContent = "Email address is required";
    isValid = false;
  }

  if (isValid) {
    postFormData({ email: email }, () => {
      emailInput.value = "";
    });
  }
}

function validateMessage() {
  const message = document.getElementById("message").value;
  const nameInput = document.getElementById("nameInput").value;
  const messageEmail = document.getElementById("messageEmail");
  const email = messageEmail.value;
  const errorEmail = document.getElementById("errorEmail");
  const errorMessage = document.getElementById("errorMessage");
  const errorName = document.getElementById("errorName");

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let isValid = true;

  if (!emailPattern.test(email)) {
    errorEmail.style.display = "block";
    errorEmail.textContent = "Invalid email address";
    isValid = false;
  } else {
    errorEmail.style.display = "none";
  }
  if (email.length === 0) {
    errorEmail.style.display = "block";
    errorEmail.textContent = "Email address is required";
    isValid = false;
  }

  if (nameInput.length === 0) {
    errorName.style.display = "block";
    isValid = false;
    errorName.textContent = "Name is required";
  } else {
    errorName.style.display = "none";
  }

  if (message.length === 0) {
    errorMessage.style.display = "block";
    isValid = false;
    errorMessage.textContent = "Message is required";
  } else {
    errorMessage.style.display = "none";
  }

  const data = {
    email: email,
    name: nameInput,
    message: message,
  };

  if (isValid) {
    postFormData(data, () => {
      messageEmail.value = "";
      document.getElementById("nameInput").value = "";
      document.getElementById("message").value = "";
    });
  }
}

function validateRental() {
  const checkInInput = document.getElementById("checkIn").value;
  const checkOutInput = document.getElementById("checkOut").value;
  const adultsInput = document.getElementById("adults").value;
  const kidsInput = document.getElementById("kids").value;
  const errorCheckIn = document.getElementById("errorCheckIn");
  const errorCheckOut = document.getElementById("errorCheckOut");
  const errorAdults = document.getElementById("errorAdults");
  const errorKids = document.getElementById("errorKids");

  let isValid = true;

  if (checkInInput.length === 0) {
    errorCheckIn.style.display = "block";
    errorCheckIn.textContent = "Check In date is required";
    isValid = false;
  } else {
    errorCheckIn.style.display = "none";
  }
  if (checkOutInput.length === 0) {
    errorCheckOut.style.display = "block";
    isValid = false;
    errorCheckOut.textContent = "Check Out date  is required";
  } else {
    errorCheckOut.style.display = "none";
  }
  if (adultsInput.length === 0) {
    errorAdults.style.display = "block";
    isValid = false;
    errorAdults.textContent = "Adults count is required";
  } else {
    errorAdults.style.display = "none";
  }
  if (adultsInput === "0") {
    errorAdults.style.display = "block";
    isValid = false;
    errorAdults.textContent = "Adults count can't be 0";
  }
  if (kidsInput.length === 0) {
    errorKids.style.display = "block";
    isValid = false;
    errorKids.textContent = "Kids count is required";
  } else {
    errorKids.style.display = "none";
  }

  const data = {
    checkIn: checkInInput,
    checkOut: checkOutInput,
    adults: adultsInput,
    kids: kidsInput,
  };

  if (isValid) {
    postFormData(data, () => {
      document.getElementById("checkIn").value = "";
      document.getElementById("checkOut").value = "";
      document.getElementById("adults").value = "";
      document.getElementById("kids").value = "";
    });
  }
}

function postFormData(data, callback) {
  fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      if (callback) callback();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

if (imgOptions.length > 0) {
  setImageUrlAndName(imgOptions[0]);
  imgOptions[0].classList.add("active");
}
imgOptions.forEach((imgOption) =>
  imgOption.addEventListener("click", () => {
    imgOptions.forEach((img) => img.classList.remove("active"));
    setImageUrlAndName(imgOption);
    imgOption.classList.add("active");
  })
);

subscribeBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
subscribeForm.addEventListener("submit", function (e) {
  e.preventDefault();
  validateEmail();
});
messageForm.addEventListener("submit", function (e) {
  e.preventDefault();
  validateMessage();
});
rentalForm.addEventListener("submit", function (e) {
  e.preventDefault();
  validateRental();
});
menuIcon.addEventListener("click", openSidebar);
closeBtnSidebar.addEventListener("click", closeSidebar);
