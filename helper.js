export const disableOrEnableBtn = (btn, length) => {
  if (length === 0) btn.classList.add("disable");
  else btn.classList.remove("disable");
};

export const subCategories = (param) => {
  const res = param.map((sc) => `<li>${sc}</li>`);
  return res.join("");
};

export const item = (param) => {
  return `
      <li class="item">
          <input class="check" type="checkbox" data-choice="${param.id}">
          <label>${param.cause}</label>
      </li>
    `;
};
