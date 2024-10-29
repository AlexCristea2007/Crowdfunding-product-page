/* menu */
const hamburgerBtn = document.getElementById("hamburger-btn");
const hamburgerMenu = document.getElementById("hamburger-menu");
const closeMenuBtn = document.getElementById("close-menu-btn");

hamburgerBtn.addEventListener("click", () => {
  hamburgerBtn.style.visibility = "hidden";
  hamburgerMenu.style.display = "flex";
  closeMenuBtn.style.display = "inline-block";
});

closeMenuBtn.addEventListener("click", () => {
  hamburgerBtn.style.visibility = "visible";
  hamburgerMenu.style.display = "none";
  closeMenuBtn.style.display = "none";
});

/* bookmark */
const bookmarkBtn = document.querySelector(".bookmark-btn");
const bookmarkIcon = document.querySelector(".bookmark-icon");
const bookmarkCircle = document.querySelector(".bookmark-circle");
const bookmarkText = document.querySelector(".bookmark-btn p");
let isBookmarked = false;

bookmarkBtn.addEventListener("click", () => {
  bookmarkBtn.style.backgroundColor = isBookmarked
    ? "hsl(0, 0%, 94%)"
    : "hsl(176, 28%, 94%)";
  bookmarkCircle.style.fill = isBookmarked
    ? "hsl(0, 0%, 18%)"
    : "var(--darkCyan)";
  bookmarkIcon.style.fill = isBookmarked
    ? "hsl(0, 0%, 69%)"
    : "hsl(0, 0%, 100%)";
  bookmarkText.style.color = isBookmarked
    ? "hsl(0, 0%, 0%)"
    : "var(--darkCyan)";
  isBookmarked = !isBookmarked;
});

/* modal */
const backModalBtn = document.getElementById("back-project-btn");
const closeModalBtn = document.querySelector(".close-modal-btn");
const modal = document.getElementById("modal");
const brightnessScreen = document.getElementById("brightness-screen");

const selectPlanBtns = document.querySelectorAll(".select-plan-btn");
const modalPlans = document.querySelectorAll(".modal-plan");
const pledges = document.querySelectorAll(".pledge-confirm");
const checkBoxes = document.querySelectorAll(".checkbox");
const checkBoxesContent = document.querySelectorAll(".checkbox-content");

const priceBoxes = document.querySelectorAll(".price-box");
const pledgesInput = document.querySelectorAll(".pledge-input");
const confirmBtns = document.querySelectorAll(".confirm-btn");

const modalCompleted = document.getElementById("modal-completed");
const completedBtn = document.getElementById("completed-btn");

let inputValidity = [false, false];

backModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
  brightnessScreen.style.display = "inline-block";
});

closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
  brightnessScreen.style.display = "none";

  modalPlans.forEach((modalPlan) => {
    modalPlan.style.border = "1px solid var(--darkGray)";
  });

  checkBoxesContent.forEach((checkBoxContent) => {
    checkBoxContent.style.display = "none";
  });

  pledges.forEach((pledge) => {
    pledge.style.display = "none";
  });
});

checkBoxes.forEach((checkbox, index) => {
  checkbox.addEventListener("click", () => {
    checkBoxesContent.forEach((content) => {
      content.style.display = "none";
    });
    checkBoxesContent[index].style.display = "inline-block";

    modalPlans.forEach((modalPlan) => {
      modalPlan.style.border = "1px solid var(--darkGray)";
    });
    modalPlans[index].style.border = "2px solid var(--darkCyan)";

    pledges.forEach((pledge) => {
      pledge.style.display = "none";
    });
    pledges[index].style.display = "flex";
  });
});

selectPlanBtns.forEach((selectPlanBtn, index) => {
  selectPlanBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    brightnessScreen.style.display = "inline-block";

    modalPlans.forEach((modalPlan) => {
      modalPlan.style.border = "1px solid var(--darkGray)";
    });
    checkBoxesContent.forEach((content) => {
      content.style.display = "none";
    });
    pledges.forEach((pledge) => {
      pledge.style.display = "none";
    });

    modalPlans[index + 1].style.border = "2px solid var(--darkCyan)";
    checkBoxes[index + 1].checked = true;
    checkBoxesContent[index + 1].style.display = "inline-block";
    pledges[index + 1].style.display = "flex";
  });
});

pledgesInput.forEach((input, index) => {
  input.addEventListener("input", () => {
    let value = input.value.replace(/[^0-9]/g, "");
    input.value = value;

    if (value === "") {
      priceBoxes[index].style.borderColor = "var(--darkGray)";
      inputValidity[index] = false;
      return;
    }

    const numericValue = Number(value);

    if (index === 0) {
      inputValidity[0] = numericValue >= 25;
      priceBoxes[index].style.borderColor = inputValidity[0]
        ? "var(--darkGray)"
        : "red";
    }

    if (index === 1) {
      inputValidity[1] = numericValue >= 75;
      priceBoxes[index].style.borderColor = inputValidity[1]
        ? "var(--darkGray)"
        : "red";
    }
  });
});

confirmBtns.forEach((confirmBtn, index) => {
  confirmBtn.addEventListener("click", () => {
    console.log("Clicked confirm button index: ", index);
    console.log("pledgesInput length: ", pledgesInput.length);

    const isFirstButton = index === 0;
    const isSecondButtonValid = index === 1 && inputValidity[0];
    const isThirdButtonValid = index === 2 && inputValidity[1];

    if (isFirstButton || isSecondButtonValid || isThirdButtonValid) {
      checkBoxesContent[index].style.display = "none";
      modalPlans[index].style.border = "1px solid var(--darkGray)";
      pledges[index].style.display = "none";

      modal.style.display = "none";
      modalCompleted.style.display = "flex";
      completedBtn.style.display = "inline-block";
    } else {
      console.log("Input not valid for button: ", index);
    }
  });
});

completedBtn.addEventListener("click", () => {
  modalCompleted.style.display = "none";
  brightnessScreen.style.display = "none";
});
