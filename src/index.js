import axios from "axios";

let form = document.getElementById("form");
let container = document.getElementById("container");
let teleport = document.getElementById("scoreTeleport");

let summary = document.createElement("p");
container.appendChild(summary);

let categoriesNode = document.createElement("ul");
container.appendChild(categoriesNode);

let errorMessage = document.createElement("p");
container.appendChild(errorMessage);

let loadingMessage = document.createElement("p");
loadingMessage.innerHTML = "loading... ...";

function resetUI() {
  summary.innerHTML = "";
  teleport.innerHTML = "";
  categoriesNode.innerHTML = "";
  errorMessage.innerHTML = "";
}

/* GET DATA */
const getData = (e) => {
  e.preventDefault();
  resetUI();
  attachLoading();
  let city = document
    .getElementById("cityInput")
    .value.toLowerCase()
    .split(" ")
    .join("-");

  axios
    .get(`https://api.teleport.org/api/urban_areas/slug:${city}/scores/`)
    .then((res) => {
      writeHTML(res);
    })
    .catch((error) => {
      console.log(error);
      writeError(error);
    })
    .finally(() => {
      removeLoading();
    });
};

form.addEventListener("submit", getData);
/* WRITE HTML */
const attachLoading = () => {
  container.appendChild(loadingMessage);
};

const removeLoading = () => {
  container.removeChild(loadingMessage);
};

const writeError = (errorObject) => {
  let error = errorObject.message;
  if (errorObject.code === "ERR_BAD_REQUEST") {
    error = "Error: City not found ";
  }
  errorMessage.innerHTML = error;
};
const writeHTML = (resObject) => {
  summary.innerHTML = resObject.data.summary;

  teleport.innerHTML =
    "Teleport city score" +
    " : " +
    resObject.data.teleport_city_score.toFixed(2);

  let categories = resObject.data.categories;

  let categoriesContent = "";

  for (let i = 0; i < categories.length; i++) {
    let color = categories[i].color;
    let name = categories[i].name;
    let score = categories[i].score_out_of_10.toFixed(2);

    categoriesContent += `<li style="color:${color}"> <p style="color:white">${name} - ${score}</p></li>`;
  }
  categoriesNode.innerHTML = categoriesContent;
};
