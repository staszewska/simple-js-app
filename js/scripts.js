let pokemonList = [
  { name: "Bulbasaur", height: 8, types: ["grass", "poison"] },
  { name: "Pikachu", height: 0.4, types: ["electric", "psychic"] },
  { name: "Seadra", height: 1.2, types: ["dragon", "ice"] },
  { name: "Lapras", height: 2.5, types: ["ghost", "water"] },
  { name: "Caterpie", height: 0.8, types: ["electric", "normal"] },
];

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

pokemonList.forEach(function (pokemon) {
  const standardMessage = `${pokemon.name} (height ${pokemon.height})`;
  document.write(`<div>${standardMessage}</div>`);
});
