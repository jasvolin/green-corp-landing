const INCREASE_NUMBER_ANIMATION_SPEED = 50;
let animationInited = false;
function increaseNumberAnimationStep(i, element, endNumber) {
  if (i <= endNumber) {
    if (i === endNumber) {
      element.innerText = i + "+";
    } else {
      element.innerText = i;
    }
    i += 100;
  }
  setTimeout(
    () => increaseNumberAnimationStep(i, element, endNumber),
    INCREASE_NUMBER_ANIMATION_SPEED
  );
}

function initIncreaseNumberAnimation() {
  let element = document.querySelector(".features__clients-count");
  increaseNumberAnimationStep(0, element, 5000);
}

document
  .querySelector("#budget")
  .addEventListener("change", function handleSelectChange(event) {
    if (event.target.value === "other") {
      let formContainer = document.createElement("div");
      formContainer.classList.add("form__group", "form__other-input");
      let input = document.createElement("input");
      input.placeholder = "Введите ваш вариант";
      input.type = "text";
      formContainer.appendChild(input);
      let teg = document.querySelector("form");
      let form__submit = document.querySelector(".form__submit");
      teg.insertBefore(formContainer, form__submit);
    }
    let otherInput = document.querySelector(".form__other-input");
    if (event.target.value !== "other") {
      if (event.target.value !== "other" && Boolean(otherInput));
      let tegForm = document.querySelector("form");
      tegForm.removeChild(otherInput);
    }
  });

function updateScroll() {
  const header = document.querySelector("header");

  if (window.scrollY > 0) {
    header.classList.add("header__scrolled");
  } else {
    header.classList.remove("header__scrolled");
  }
  let windowBottomPosition = window.scrollY + window.innerHeight;
  let countElementPosition = document.querySelector(
    ".features__clients-count"
  ).offsetTop;

  if (windowBottomPosition >= countElementPosition && !animationInited) {
    animationInited = true;
    initIncreaseNumberAnimation();
  }
}
window.addEventListener("scroll", updateScroll);
