const pokemonRepository = (function () {
  let t = [],
    n = document.querySelector(".modal");
  function o() {
    return t;
  }
  function i(n) {
    return "object" != typeof n
      ? "Must be an object"
      : Object.keys(n).includes("name") && Object.keys(n).includes("detailsUrl")
      ? void t.push(n)
      : "Must have properties 'name' and 'detailsUrl";
  }
  function r() {
    let t = document.createElement("p");
    t.innerText = "Loading...";
    document.querySelector(".list-group").appendChild(t),
      t.classList.add("loading");
  }
  function l() {
    document.querySelector(".loading").remove();
  }
  function a(t) {
    pokemonRepository.loadDetails(t).then(function () {
      (function t(n, o, i) {
        let r = document.querySelector(".modal-title");
        r.innerText = n;
        let l = document.querySelector(".modal-body"),
          a = document.createElement("img");
        (a.src = i), l.appendChild(a);
        let s = document.createElement("p");
        (s.innerText = `Height: ${o}`), l.appendChild(s);
      })(t.name, t.height, t.imageUrl),
        console.log(t),
        n.addEventListener("hidden.bs.modal", s);
    });
  }
  function s(t) {
    let n = document.querySelector(".modal-title");
    n.innerText = "";
    let o = document.querySelector(".modal-body");
    Array.from(o.children).forEach((t) => {
      t.remove();
    });
  }
  return {
    getAll: o,
    add: i,
    addListItem: function t(n) {
      let o = document.querySelector(".list-group"),
        i = document.createElement("li");
      i.classList.add("list-group-item");
      let r = document.createElement("button");
      (r.innerText = n.name),
        r.classList.add("btn"),
        r.classList.add("btn-outline-secondary"),
        r.classList.add("btn-lg"),
        r.setAttribute("data-bs-toggle", "modal"),
        r.setAttribute("data-bs-target", "#staticBackdrop"),
        i.appendChild(r),
        o.appendChild(i),
        r.addEventListener("click", () => {
          a(n);
        });
    },
    loadList: function t() {
      return (
        r(),
        fetch("https://pokeapi.co/api/v2/pokemon/?limit=20")
          .then(function (t) {
            return t.json();
          })
          .then(function (t) {
            t.results.forEach(function (t) {
              i({ name: t.name, detailsUrl: t.url });
            }),
              l();
          })
          .catch(function () {
            console.error(e);
          })
      );
    },
    loadDetails: function t(n) {
      return (
        r(),
        fetch(n.detailsUrl)
          .then(function (t) {
            return t.json();
          })
          .then(function (t) {
            (n.imageUrl = t.sprites.front_default),
              (n.height = t.height),
              (n.types = t.types),
              l();
          })
          .catch(function (t) {
            console.error(t);
          })
      );
    },
    showDetails: a,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
