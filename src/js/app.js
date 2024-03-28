const options = {
  valueNames: ["name", "heigth", "types"],
  item: '<li><h3 class="name"></h3><p class="heigth"></p><p class="types"></p></li>',
};

const pokemonList = [
  { name: "Bulbasaur", height: 8, types: ["grass", "poison"] },
  { name: "Pikachu", height: 0.4, types: ["electric", "psychic"] },
  { name: "Seadra", height: 1.2, types: ["dragon", "ice"] },
  { name: "Lapras", height: 2.5, types: ["ghost", "water"] },
  { name: "Caterpie", height: 0.8, types: ["electric", "normal"] },
];

var userList = new List("users", options, pokemonList);
