// Pokemon Array with Each Object
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");

    // Content and Styling
    button.innerText = capitalizeFirstLetter(pokemon.name);
    button.classList.add("btn-md", "btn-primary");
    button.style.backgroundImage = "url('images/leather-background.jpg')";

    // Build the list item and add to the page
    listPokemon.appendChild(button);
    pokemonListElement.appendChild(listPokemon);

    // Pokemon Detail
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function loadList() {
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
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Details we want to add
        pokemon.imageUrlFront = details.sprites.front_default;
        pokemon.imageUrlBack = details.sprites.back_default;
        pokemon.types = details.types.map((type) => type.type.name);
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.abilities = details.abilities.map((ability) => ability.ability.name);
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

// Modal functions
function showModal(pokemon) {
  let modalContainer = document.getElementById("modal-container");
  let modalName = document.getElementById("modal-name");
  let modalImage = document.getElementById("modal-image");
  let modalHeight = document.getElementById("modal-height");
  let modalTypes = document.getElementById("modal-types");

  modalName.innerText = capitalizeFirstLetter(pokemon.name);
  modalImage.src = pokemon.imageUrlFront;
  modalHeight.innerText = `Height: ${pokemon.height} ft`;
  modalTypes.innerText = `Types: ${pokemon.types.join(', ')}`;

  modalContainer.classList.remove("hidden");
}

// Close modal when clicking the close button
document.getElementById("modal-close").addEventListener("click", function () {
  document.getElementById("modal-container").classList.add("hidden");
});

// Capitalize function (global)
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Load Pokémon list and add buttons
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// Hide modal when clicking outside or Escape
let modalContainer = document.getElementById("modal-container");
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modalContainer.classList.contains("hidden")) {
    modalContainer.classList.add("hidden");
  }
});
modalContainer.addEventListener("click", (e) => {
  if (e.target === modalContainer) {
    modalContainer.classList.add("hidden");
  }
});
