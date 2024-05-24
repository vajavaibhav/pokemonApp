const main = document.querySelector(".main");
const form = document.querySelector(".form");
const input = document.querySelector(".search");
const random = document.querySelector(".random");
const error = document.querySelector(".error");
const body = document.querySelector(".body");

const fillData = ({ name, id, height, weight, types, sprites, stats }) => {
  let typeString = "| ";
  types.forEach((type) => (typeString += type.type.name.toUpperCase() + " | "));

  main.innerHTML = `<h5>NAME  ${name.toUpperCase()}</h5>
  <h5>ID  ${id}</h5>
  <h5>HEIGHT  ${height}</h5>
  <h5>WEIGHT  ${weight}</h5>
  <div class="image-container"><img src="${
    sprites.front_default
  }" class="image image1"><img src="${
    sprites.back_default
  }" class="image image2"></div>
  <h4> ${typeString}</h4>

  <p>HP  ${stats[0].base_stat}</p>
  <hr>
  <p>ATTACK  ${stats[1].base_stat}</p>
  <hr>
  <p>DEFENSE  ${stats[2].base_stat}</p>
  <hr>
  <p>SPECIAL-ATTACK  ${stats[3].base_stat}</p>
  <hr>
  <p>SPECIAL-DEFENSE  ${stats[4].base_stat}</p>
  <hr>
  <p>SPEED  ${stats[5].base_stat}</p>`;

  body.classList.remove("hide");
  error.innerHTML = "";
};

const baseUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const fetchPokemon = async (nameOrId) => {
  const response = await fetch(`${baseUrl}/${nameOrId}`);
  const data = await response.json();
  return data;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  displayDataIfValid(input.value);
});

random.addEventListener("click", () => {
  displayDataIfValid(Math.floor(Math.random() * 1024) + 1);
});

const displayDataIfValid = (value) => {
  if (value) {
    fetchPokemon(value)
      .then((data) => fillData(data))
      .catch((err) => {
        triggerError();
        body.classList.add("hide");
      });
  } else {
    triggerError();
    body.classList.add("hide");
  }
  input.value = "";
};

const triggerError = () => {
  main.innerHTML = "";
  error.innerHTML = `<pre>Sorry!! Cannot find a Pokemon with given a given name!!!!
Not sure about the name ???? Don't worry!
You can also search by Id from 1 to 1024<pre>`;
};
