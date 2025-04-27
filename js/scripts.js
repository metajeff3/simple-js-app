// Pokemon Array with Each Object
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsURL" in pokemon
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
    let pokemonList = document.querySelector(".pokemon-list");
    let listPokemon = document.createElement("li");
    let button = document.createElement("button");

    // Content and Styling
    button.innerText = pokemon.name;
    button.classList.add("btn-md", "btn-primary");
    button.style.backgroundImage = "url('images/leather-background.jpg')";

    // Pokemon Detail
    button.addEventListener("click", function () {
      pokemonRepository.showDetials(pokemon);
    });

    // Build the list item and add to the page
    listPokemon.appendChild(button);
    pokemonList.appendChild(listPokemon);
    button.addEventListener("click", function (event) {
      pokemondRepository.showDetails(pokemon)
    })
  }

function showModal(title,height, img, weight, types) {
  let modalTitle = document.querySelector('.modal-title');
  let pokemonHeight = document.querySelectro("#pokemonHeight");
  let pokemonImage= document.querySelector("#pokemonImage");
  let pokemonWeight = document.querySelector("#pokemonWeight");
  let pokemonTypes = document.querySelector("#pokemonTypes");

  modalTitle.innerText = title;
  pokemonHeight.innerText = "Height: " + height + "ft";
  pokemonWeight.innerText = "Weight: " + weight + "lbs";
  pokemonImage.setAttribute('src', img);
  pokemonTypes.innerText = "Type(s): " + types.join(',');


}

  
    function loadList() {
      return fetch(apiUrl).then(function(response) {
        return response.json();
      }).then(function(json) {
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function(e) {
        console.error(e);
      })
    }
  
    function loadDetails(item) {
      let url = item.detailsUrl;
      return fetch(url).then(function(response) {
        return response.json();
      }).then(function(details) {
        // Details we want to add
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.types = details.types;
        item.height = details.height;
        item.weight = details.weight;
        item.abilities = details.abilities;
      }).catch(function(e) {
        console.error(e);
      });
    }
  
    let modal = document.querySelector('.modal');
  
    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function() {
        showModal(item)
      })
    }
  
    function showModal(pokemon) {
      let modalBody = document.querySelector('.modal-body');
      let modalHeader = document.querySelector('.modal-header');
      modalBody.innerHTML = '';
  
      

  
      let closeButtonElement = document.querySelector('.close');
  
      let imageFront = document.createElement('img');
      imageFront.classList.add('modal-img');
      imageFront.src = pokemon.imageUrlFront;
      imageFront.alt = 'Front image of ' + pokemon.name;
  
      let imageBack = document.createElement('img');
      imageBack.classList.add('modal-img');
      imageBack.src = pokemon.imageUrlBack;
      imageBack.alt = 'Back image of ' + pokemon.name;
  
      let typesElement = document.createElement('p');
      let types = [pokemon.types[0].type.name];
      for (let i = 1; i < pokemon.types.length; i++) {
        types.push(', ' + pokemon.types[i].type.name);
      }
      typesElement.innerHTML = 'Types: ' + types.join('');
  
      
  
      let weigthElement = document.createElement('p');
      weigthElement.innerHTML = 'Weigth: ' + pokemon.weight;
  
      let abilities = document.createElement('p');
      let abilitiesList = [pokemon.abilities[0].ability.name];
      for (let i = 1; i < pokemon.abilities.length; i++) {
        abilitiesList.push(', ' + pokemon.abilities[i].ability.name);
      }
      abilities.innerHTML = 'Abilities: ' + abilitiesList.join('');
  
      modalHeader.appendChild(modalTitle);
      modalHeader.appendChild(closeButtonElement);
      modalBody.appendChild(imageFront);
      modalBody.appendChild(imageBack);
      modalBody.appendChild(typesElement);
      modalBody.appendChild(heightElement);
      modalBody.appendChild(weigthElement);
      modalBody.appendChild(abilities);
    }
  
    function hideModal() {
      modal.classList.remove('is-visible');
    }
  
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-visible')) {
        hideModal();
      }
    });
    modal.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modal) {
        hideModal();
      }
    });
  
    return {
      getAll: getAll,
      add: add,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails
    };

    */
})();

/*
  pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon)
    });
  })
    */
