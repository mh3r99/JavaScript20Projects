const resultsNav = document.querySelector("#resultsNav"),
  favoritesNav = document.querySelector("#favoritesNav"),
  imagesContainer = document.querySelector(".images-container"),
  saveConfirmed = document.querySelector(".save-confirmed"),
  loader = document.querySelector(".loader");

// NASA API
const count = 10;
const apiKey = "DEMO_KEY";
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

function showContent(page) {
  window.scrollTo({ top: 0, behavior: "instant" });
  if (page === "results") {
    resultsNav.classList.remove("hidden");
    favoritesNav.classList.add("hidden");
  } else {
    resultsNav.classList.add("hidden");
    favoritesNav.classList.remove("hidden");
  }
  loader.classList.add("hidden");
}

// Create DOM Nodes
function createDOMNodes(page) {
  const currentArray =
    page === "results" ? resultsArray : Object.values(favorites);

  currentArray.forEach((result) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
     <a href="${result.hdurl}" title="View Full Image" target="_blank">
     <img src="${
       result.url
     }" alt="NASA Picture of the Day" class="card-img-top" loading="lazy" />
     </a>
   <div class="card-body">
     <h5 class="card-title">${result.title}</h5>
     <p class="clickable" onclick=${
       page === "results"
         ? `saveFavorite('${result.url}')`
         : `removeFavorite('${result.url}')`
     }> ${page === "results" ? "Add To Favorites" : "Remove Favorite"} </p>
     <p class="card-text">${result.explanation}</p>
     <small class="text-muted">
       <strong>${result.date}</strong>
       <span>${result.copyright ? result.copyright : ""}</span>
     </small>
   </div>
     `;
    imagesContainer.appendChild(card);
  });
}

// Update DOM
function updateDOM(page) {
  // Get Favorites from localStorage
  favorites =
    localStorage.getItem("nasaFavorites") === null
      ? {}
      : JSON.parse(localStorage.getItem("nasaFavorites"));
  imagesContainer.textContent = "";
  createDOMNodes(page);
  showContent(page);
}

// Get 10 Images from NASA API
async function getNasaPictures() {
  // Show loader
  loader.classList.remove("hidden");
  try {
    const res = await fetch(apiUrl);
    resultsArray = await res.json();
    updateDOM("results");
  } catch (error) {
    console.log(error);
  }
}

// Add result to Favorites
function saveFavorite(itemUrl) {
  //  Loop through Results Array to select Favorite
  resultsArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorites[itemUrl]) {
      favorites[itemUrl] = item;
      // Show Save Confirmation for 2 Seconds
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
      // Set Favorites in localStorage
      localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    }
  });
}

// Remove item from Favorites
function removeFavorite(itemUrl) {
  if (favorites[itemUrl]) {
    delete favorites[itemUrl];
    // Set Favorites in localStorage
    localStorage.setItem("nasaFavorites", JSON.stringify(favorites));
    updateDOM("favorites");
  }
}

// Onload
getNasaPictures();
