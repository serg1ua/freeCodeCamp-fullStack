const FORM = "form";
const FULL_NAME = "full-name";
const EMAIL = "email";
const ORDER_NO = "order-no";
const PRODUCT_CODE = "product-code";
const QUANTITY = "quantity";
const OTHER = "other";
const CLEAR = "clear-btn";
const MESSAGE_BOX = "message-box";

const DISPLAY_BLOCK = "block";
const DISPLAY_NONE = "none";
const COLOR_RED = "red";
const COLOR_GREEN = "green";

const COMPLAINT = "complaint";
const COMPLAINTS = 'input[name="complaint"]';
const COMPLAINTS_GROUP = "complaints-group";
const COMPLAINT_DESCRIPTION = "complaint-description";
const COMPLAINT_DESCRIPTION_CONTAINER = "complaint-description-container";

const SOLUTIONS = 'input[name="solutions"]';
const SOLUTIONS_GROUP = "solutions-group";
const SOLUTION_DESCRIPTION = "solution-description";
const SOLUTION_DESCRIPTION_CONTAINER = "solution-description-container";

const fullNameEl = document.getElementById(FULL_NAME);
const emailEl = document.getElementById(EMAIL);
const orderNoEl = document.getElementById(ORDER_NO);
const productCodeEl = document.getElementById(PRODUCT_CODE);
const quantityEl = document.getElementById(QUANTITY);

const complaintsEl = document.querySelectorAll(COMPLAINTS);
const complaintsGroupEl = document.getElementById(COMPLAINTS_GROUP);
const complaintDescriptionEl = document.getElementById(COMPLAINT_DESCRIPTION);
const complaintDescriptionContainerEl = document.getElementById(COMPLAINT_DESCRIPTION_CONTAINER);

const solutionsEl = document.querySelectorAll(SOLUTIONS);
const solutionsGroupEl = document.getElementById(SOLUTIONS_GROUP);
const solutionDescriptionEl = document.getElementById(SOLUTION_DESCRIPTION);
const solutionDescriptionContainerEl = document.getElementById(SOLUTION_DESCRIPTION_CONTAINER);

const formEl = document.getElementById(FORM);
const clearBtn = document.getElementById(CLEAR);
const messageBoxEl = document.getElementById(MESSAGE_BOX);

complaintDescriptionContainerEl.style.display = DISPLAY_NONE;
solutionDescriptionContainerEl.style.display = DISPLAY_NONE;

const formMap = {
  [FULL_NAME]: {
    el: fullNameEl,
    validator: fullNameValidator,
  },
  [EMAIL]: {
    el: emailEl,
    validator: emailValidator,
  },
  [ORDER_NO]: {
    el: orderNoEl,
    validator: validateOrderNo,
  },
  [PRODUCT_CODE]: {
    el: productCodeEl,
    validator: validateProductCode,
  },
  [QUANTITY]: {
    el: quantityEl,
    validator: validateQuantity,
  },
  [COMPLAINTS]: {
    el: complaintsGroupEl,
    targetEl: complaintsEl,
    validator: validateComplaintsAndSolutions,
    textArea: complaintDescriptionContainerEl,
  },
  [SOLUTIONS]: {
    el: solutionsGroupEl,
    targetEl: solutionsEl,
    validator: validateComplaintsAndSolutions,
    textArea: solutionDescriptionContainerEl,
  },
  [COMPLAINT_DESCRIPTION]: {
    el: complaintDescriptionEl,
    validator: validateDescription,
  },
  [SOLUTION_DESCRIPTION]: {
    el: solutionDescriptionEl,
    validator: validateDescription,
  },
};

function setStyles(el, isValid) {
  el.style.borderColor = isValid ? COLOR_GREEN : COLOR_RED;
}

function fullNameValidator(value) {
  return !!value.trim();
}

function emailValidator(value) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim());
}

function validateOrderNo(value) {
  return /^2024\d{6}$/.test(value.trim());
}

function validateProductCode(value) {
  return /^[a-zA-Z]{2}\d{2}-[a-zA-Z]\d{3}-[a-zA-Z]{2}\d$/.test(value.trim());
}

function validateQuantity(value) {
  const val = Number(value);
  return Number.isInteger(val) && val > 0;
}

function validateDescription(el) {
  const otherEl = Array.from(
    formMap[el.name.includes(COMPLAINT) ? COMPLAINTS : SOLUTIONS].targetEl
  ).find((el) => el.value === OTHER);
  return !Boolean(otherEl.checked && el.value.length < 20);
}

function validateComplaintsAndSolutions(elements) {
  const elList = Array.from(elements);
  const otherEl = elList.find((el) => el.value === OTHER);
  if (otherEl.checked) {
    formMap[otherEl.name.includes(COMPLAINT) ? COMPLAINTS : SOLUTIONS].textArea.style.display =
      DISPLAY_BLOCK;
  } else {
    formMap[otherEl.name.includes(COMPLAINT) ? COMPLAINTS : SOLUTIONS].textArea.style.display =
      DISPLAY_NONE;
  }
  return elList.some((el) => el.checked);
}

function isValid(formData) {
  return !Object.values(formData).some((val) => !val);
}

function validateForm() {
  return {
    [FULL_NAME]: formMap[FULL_NAME].validator(formMap[FULL_NAME].el.value),
    [EMAIL]: formMap[EMAIL].validator(formMap[EMAIL].el.value),
    [ORDER_NO]: formMap[ORDER_NO].validator(formMap[ORDER_NO].el.value),
    [PRODUCT_CODE]: formMap[PRODUCT_CODE].validator(formMap[PRODUCT_CODE].el.value),
    [QUANTITY]: formMap[QUANTITY].validator(formMap[QUANTITY].el.value),
    [COMPLAINTS_GROUP]: formMap[COMPLAINTS].validator(formMap[COMPLAINTS].targetEl),
    [SOLUTIONS_GROUP]: formMap[SOLUTIONS].validator(formMap[SOLUTIONS].targetEl),
    [COMPLAINT_DESCRIPTION]: formMap[COMPLAINT_DESCRIPTION].validator(
      formMap[COMPLAINT_DESCRIPTION].el
    ),
    [SOLUTION_DESCRIPTION]: formMap[SOLUTION_DESCRIPTION].validator(
      formMap[SOLUTION_DESCRIPTION].el
    ),
  };
}

Object.values(formMap).forEach(({ el }) => {
  switch (el) {
    case fullNameEl:
    case emailEl:
    case orderNoEl:
    case productCodeEl:
    case quantityEl:
      el.addEventListener("change", (e) => {
        const { el, validator } = formMap[e.target.id];
        const isValid = validator(e.target.value);
        setStyles(el, isValid);
      });
      break;
    case complaintsGroupEl:
    case solutionsGroupEl:
      el.addEventListener("change", (e) => {
        const key = el.id.includes(COMPLAINT) ? COMPLAINTS : SOLUTIONS;
        const { validator } = formMap[key];
        const isValid = validator(formMap[key].targetEl);
        setStyles(el, isValid);
      });
      break;
    case complaintDescriptionEl:
    case solutionDescriptionEl:
      el.addEventListener("change", (e) => {
        const key = el.name.includes(COMPLAINT) ? COMPLAINT_DESCRIPTION : SOLUTION_DESCRIPTION;
        const { validator } = formMap[key];
        const isValid = validator(formMap[key].el);
        setStyles(el, isValid);
      });
      break;
    default:
      break;
  }
});

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = validateForm();
  Object.entries(formData).forEach(([key, isValid]) => {
    switch (key) {
      case COMPLAINTS_GROUP:
        setStyles(complaintsGroupEl, isValid);
        break;
      case SOLUTIONS_GROUP:
        setStyles(solutionsGroupEl, isValid);
        break;
      default:
        setStyles(formMap[key].el, isValid);
    }
  });
  const isFormValid = isValid(formData);
  if (isFormValid) {
    messageBoxEl.innerText = "";
  } else {
    messageBoxEl.innerText = "Please, fill out the required fields correctly before submitting.";
  }
});

clearBtn.addEventListener("click", () => location.reload());
