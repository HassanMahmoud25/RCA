import { correctiveActionsArr } from "../Data/correctiveActionsArr.js";
import { rootCausesArr } from "../data/rootCausesArr.js";
import { disableOrEnableBtn, subCategories } from "../helper.js";

export class RootCauses {
  constructor() {
    this.rootElem = document.querySelector(".root");
    this.btnGetCorrectiveActions = document.querySelector(
      ".btn-corrective-actions"
    );
    this.correctiveElem = document.querySelector(".corrective");
    this.correctiveActionsElem = document.querySelector(
        ".corrective-actions-list"
      );
    // frequency array
    this.freq2 = new Array(22).fill(0);
    this.subCorrectiveActions = [];
    this.correctiveActionsListMarkup = [];
  }

  clickRootCauseHandler = (e) => {
    if (!e.target.dataset.choice) return;

    if (e.target.checked) {
      rootCausesArr[Number(e.target.dataset.choice)].cas.forEach((ca_index) => {
        this.freq2[ca_index - 1]++;
      });
    } else {
      rootCausesArr[Number(e.target.dataset.choice)].cas.forEach((ca_index) => {
        this.freq2[ca_index - 1]--;
      });
    }

    this.subCorrectiveActions = this.freq2.map((value, index) => {
      if (value > 0) {
        return index;
      }
    });

    // To get rid of undefined values
    this.subCorrectiveActions = this.subCorrectiveActions.filter(
      (value) => value !== undefined
    );
    // To get the corrective actions by its indexes
    this.subCorrectiveActions = this.subCorrectiveActions.map(
      (ca_index) => correctiveActionsArr[ca_index]
    );

    console.log(this.subCorrectiveActions);

    // Generating markup HTML
    this.correctiveActionsListMarkup = this.subCorrectiveActions.map((ca) => {
      return `
            <li class="item">
                <input class="check" type="checkbox" data-choice="${ca.id}">
                <label class="corrective-action-title">${ca.title}</label>
                <ul class="corrective-list">
                  ${subCategories(ca.sub_categories)}
                </ul>
            </li>
        `;
    });

    // Disable or unable get direct causes button
    disableOrEnableBtn(
      this.btnGetCorrectiveActions,
      this.correctiveActionsListMarkup.length
    );
  };

  renderCorrectiveActions = () => {
    if (this.correctiveActionsListMarkup.length === 0) return;

    this.correctiveElem.classList.remove("hidden");
    this.correctiveActionsElem.textContent = "";
    this.correctiveActionsElem.insertAdjacentHTML(
      "afterbegin",
      this.correctiveActionsListMarkup.join("")
    );
  };

  start = () => {
    this.rootElem.addEventListener("click", this.clickRootCauseHandler);
    this.btnGetCorrectiveActions.addEventListener(
      "click",
      this.renderCorrectiveActions
    );
  };
}
