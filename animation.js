const INCREASE_NUMBER_ANIMATION_SPEED = 50;

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
initIncreaseNumberAnimation();

document
  .querySelector("#budget")
  .addEventListener("change", function handleSelectChange(event) {
    if (event.target.value === "other") {
      // Должны добавить еще одно текстовое поле
    }
    if (event.target.value !== "other") {
      // Удаляем ранее добавленное текстовое поле, если оно есть в DOM
    }
  });
