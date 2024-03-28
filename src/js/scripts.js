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
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=20";
  const modalElement = document.querySelector(".modal");

  function addListItem(pokemon) {
    let ulElement = document.querySelector(".list-group");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn");
    button.classList.add("btn-outline-secondary");
    button.classList.add("btn-lg");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#staticBackdrop");
    listItem.appendChild(button);
    ulElement.appendChild(listItem);

    button.addEventListener("click", () => {
      showDetails(pokemon);
    });
  }

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    if (typeof pokemon === "object") {
      if (
        Object.keys(pokemon).includes("name") &&
        Object.keys(pokemon).includes("detailsUrl")
      ) {
        pokemonList.push(pokemon);
      } else {
        return "Must have properties 'name' and 'detailsUrl";
      }
    } else {
      return "Must be an object";
    }
  }

  function showLoadingMessage() {
    let message = document.createElement("p");
    message.innerText = "Loading...";
    let ulElement = document.querySelector(".list-group");
    ulElement.appendChild(message);
    message.classList.add("loading");
  }

  function hideLoadingMessage() {
    let element = document.querySelector(".loading");
    element.remove();
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });

        hideLoadingMessage();
      })
      .catch(function () {
        console.error(e);
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;

        hideLoadingMessage();
      })

      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal(item.name, item.height, item.imageUrl);
      console.log(item);

      modalElement.addEventListener("hidden.bs.modal", handleModalClose);
    });
  }

  function handleModalClose(event) {
    const modalTitleElement = document.querySelector(".modal-title");
    modalTitleElement.innerText = "";

    const modalBodyElement = document.querySelector(".modal-body");
    Array.from(modalBodyElement.children).forEach((element) => {
      element.remove();
    });
  }

  function showModal(name, height, imageUrl) {
    const modalTitleElement = document.querySelector(".modal-title");
    modalTitleElement.innerText = name;

    const modalBodyElement = document.querySelector(".modal-body");
    const pokemonImageElement = document.createElement("img");
    pokemonImageElement.src = imageUrl;
    modalBodyElement.appendChild(pokemonImageElement);

    const pokemonHeightElement = document.createElement("p");
    pokemonHeightElement.innerText = `Height: ${height}`;
    modalBodyElement.appendChild(pokemonHeightElement);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
