import { directCausesArr } from "../data/directCausesArr.js";
import { rootCausesArr } from "../data/rootCausesArr.js";
import { disableOrEnableBtn, item } from "../helper.js";

export class DirectCauses {
  constructor() {
    this.directElem = document.querySelector(".direct");
    this.rootElem = document.querySelector(".root");

    this.btnGetRootCauses = document.querySelector(".btn-root-causes");

    this.rootPersonalElem = document.querySelector(".personal-factors");
    this.rootSystemElem = document.querySelector(".system-factors");

    // frequency array
    this.freq = new Array(16).fill(0);

    // Array of HTML code
    this.subRootCauses = [];
    this.personalMarkup = [];
    this.systemMarkup = [];
  }

  clickDirectCauseHandler = (e) => {
    if (!e.target.dataset.choice) return;

    if (e.target.checked) {
      directCausesArr[Number(e.target.dataset.choice)].rcs.forEach(
        (rc_index) => {
          this.freq[rc_index - 1]++;
        }
      );
    } else {
      directCausesArr[Number(e.target.dataset.choice)].rcs.forEach(
        (rc_index) => {
          this.freq[rc_index - 1]--;
        }
      );
    }

    this.subRootCauses = this.freq.map((value, index) => {
      if (value > 0) {
        return index;
      }
    });

    // To get rid of undefined values
    this.subRootCauses = this.subRootCauses.filter(
      (value) => value !== undefined
    );
    // To get the root causes objects by its indexes
    this.subRootCauses = this.subRootCauses.map(
      (rc_index) => rootCausesArr[rc_index]
    );

    console.log(this.subRootCauses);

    // Filter the root causes to two categories
    this.personalMarkup = this.subRootCauses.filter(
      (rc) => rc.category === "personal factors"
    );
    this.systemMarkup = this.subRootCauses.filter(
      (rc) => rc.category === "system factors"
    );

    // Generating markup HTML
    this.personalMarkup = this.personalMarkup.map((rc) => item(rc));
    this.systemMarkup = this.systemMarkup.map((rc) => item(rc));

    // Disable or unable get direct causes button
    const length = this.personalMarkup.length + this.systemMarkup.length;
    disableOrEnableBtn(this.btnGetRootCauses, length);
  };

  renderRootCauses = () => {
    const length = this.personalMarkup.length + this.systemMarkup.length;
    if (length === 0) return;

    this.rootElem.classList.remove("hidden");

    this.rootPersonalElem.textContent = "";
    this.rootSystemElem.textContent = "";

    this.rootPersonalElem.insertAdjacentHTML(
      "afterbegin",
      this.personalMarkup.join("")
    );
    this.rootSystemElem.insertAdjacentHTML(
      "afterbegin",
      this.systemMarkup.join("")
    );
  };

  start = () => {
    this.directElem.addEventListener("click", this.clickDirectCauseHandler);
    this.btnGetRootCauses.addEventListener("click", this.renderRootCauses);
  };
}
