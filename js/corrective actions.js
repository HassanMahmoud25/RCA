import { disableOrEnableBtn } from "../helper.js";

export class CorrectiveActions {
  constructor() {
    this.actionsToApply = new Set();
    this.correctiveElem = document.querySelector(".corrective");
    this.btnGetAsWord = document.querySelector('.download-word');
  }

  clickCorrectiveActionHandler = (e) => {
    if (!e.target.dataset.choice) return;

    if (e.target.checked) {
      this.actionsToApply.add(e.target.dataset.choice);
    } else {
      this.actionsToApply.delete(e.target.dataset.choice);
    }

    console.log(this.actionsToApply);

    disableOrEnableBtn(this.btnGetAsWord, Array.from(this.actionsToApply).length);
  };

  start = () => {
    this.correctiveElem.addEventListener("click", this.clickCorrectiveActionHandler);
  };
}
