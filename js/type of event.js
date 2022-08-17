import { eventsArr } from "../data/eventsArr.js";
import { directCausesArr } from "../data/directCausesArr.js";
import { disableOrEnableBtn, item } from "../helper.js";

export class TypeOfEvent {
  constructor() {
    this.eventsElem = document.querySelector(".events-list");

    this.directElem = document.querySelector(".direct");

    this.btnGetDirectCauses = document.querySelector(".btn-direct-causes");

    this.directActsElem = document.querySelector(".substandard-acts");

    this.directConditionsElem = document.querySelector(
      ".substandard-conditions"
    );

    this.subDirectCauses = [];
    this.actsMarkup = [];
    this.conditionsMarkup = [];
  }

  eventsListMarkup = () => {
    const markup = eventsArr.map((event) => {
      return `
          <li class="item">
            <input class="check" type="radio" name="type_of_event" value="${event.problem}" data-choice="${event.id}">
            <label>${event.problem}</label>
          </li>
        `;
    });

    return markup.join("");
  };

  clickEventHandler = (e) => {
    if (!e.target.dataset.choice) return;

    this.subDirectCauses = eventsArr[Number(e.target.dataset.choice)].dcs.map(
      (dc_index) => {
        return directCausesArr[dc_index - 1];
      }
    );

    // Filter to two categories
    this.actsMarkup = this.subDirectCauses.filter(
      (dc) => dc.category === "substandard acts"
    );

    this.conditionsMarkup = this.subDirectCauses.filter(
      (dc) => dc.category === "substandard conditions"
    );

    this.actsMarkup = this.actsMarkup.map((dc) => item(dc));
    this.conditionsMarkup = this.conditionsMarkup.map((dc) => item(dc));

    // Disable or enable get direct causes button.
    const length = this.actsMarkup.length + this.conditionsMarkup.length;

    disableOrEnableBtn(this.btnGetDirectCauses, length);
  };

  renderDirectCauses = () => {
    if (this.actsMarkup.length + this.conditionsMarkup.length === 0) return;

    this.directElem.classList.remove("hidden");

    this.directActsElem.textContent = "";
    this.directConditionsElem.textContent = "";

    this.directActsElem.insertAdjacentHTML(
      "afterbegin",
      this.actsMarkup.join("")
    );

    this.directConditionsElem.insertAdjacentHTML(
      "afterbegin",
      this.conditionsMarkup.join("")
    );
  };

  start = () => {
    this.eventsElem.insertAdjacentHTML("afterbegin", this.eventsListMarkup());
    this.btnGetDirectCauses.addEventListener("click", this.renderDirectCauses);
    this.eventsElem.addEventListener("click", this.clickEventHandler);
  };
}
