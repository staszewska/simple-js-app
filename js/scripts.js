// let pokemonList = [
//   { name: "Bulbasaur", height: 8, types: ["grass", "poison"] },
//   { name: "Pikachu", height: 0.4, types: ["electric", "psychic"] },
//   { name: "Seadra", height: 1.2, types: ["dragon", "ice"] },
//   { name: "Lapras", height: 2.5, types: ["ghost", "water"] },
//   { name: "Caterpie", height: 0.8, types: ["electric", "normal"] },
// ];

// "for" loop itarates over the elements of the "pokemonList" array
// for (let i = 0; i < pokemonList.length; i++) {
// contant variable with Pokemon's name and height
// const standardMessage = `${pokemonList[i].name} (height ${pokemonList[i].height})`;

// if condition is true, display following
// if (pokemonList[i].height > 5) {
//   document.write(`<div>${standardMessage} - Wow, that's big! </div>`);

// otherwise, display following
// } else {
//   document.write(
// displays Pokemon's name and height
// pokemonList[i].name + " " + "(height: " + pokemonList[i].height + ")" + " " // displays Pokemon's name and heigth in a div tag using template literal
//       `<div>${standardMessage}</div>`
//     );
//   }
// }

const pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 8, types: ["grass", "poison"] },
    { name: "Pikachu", height: 0.4, types: ["electric", "psychic"] },
    { name: "Seadra", height: 1.2, types: ["dragon", "ice"] },
    { name: "Lapras", height: 2.5, types: ["ghost", "water"] },
    { name: "Caterpie", height: 0.8, types: ["electric", "normal"] },
  ];

  function addListItem(pokemon) {
    let ulElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");
    listItem.appendChild(button);
    ulElement.appendChild(listItem);

    // button.addEventListener("click", () => {
    //   showDetails(pokemon)
    // })

    addEventListener(button, pokemon);
  }

  function addEventListener(button, pokemon) {
    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    console.log(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === "object") {
      if (
        Object.keys(pokemon).includes("name") &&
        Object.keys(pokemon).includes("height") &&
        Object.keys(pokemon).includes("types")
      ) {
        pokemonList.push(pokemon);
      } else {
        return "Must have properties 'name' 'height' and 'types'";
      }
    } else {
      return "Must be an object";
    }
  }

  function findPokemonByName(name) {
    return pokemonList.filter(function (pokemon) {
      return pokemon.name === name;
    });
  }

  // console.log(findPokemonByName("Pikachu"));

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
