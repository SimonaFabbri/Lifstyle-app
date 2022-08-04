let getBtn = document.getElementById("button");

let container = document.getElementById("container");
let teleport = document.getElementById("scoreTeleport");

let summary = document.createElement("p");
container.appendChild(summary);

let categoriesNode = document.createElement("ul");
container.appendChild(categoriesNode);

/* GET DATA */
const getData = () => {
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
    .catch((error) => console.error(error));
};

getBtn.addEventListener("click", getData);

/* WRITE HTML */
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
