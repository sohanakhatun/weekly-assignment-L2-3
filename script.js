const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger = document.querySelector(".hamburger");
const closeIcon = document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

// Initially hide the close icon
closeIcon.style.display = "none";

// Navbar-Hamburger menu
function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}
hamburger.addEventListener("click", toggleMenu);
menuItems.forEach(function (menuItem) {
  menuItem.addEventListener("click", toggleMenu);
});

// Fetching Data
const apiKey = "8L72Jii3WwGi3d0BaPnzPxnzLSlvwpgEzqbap7AS1Do4OTR3S5knUqNq";

const searchForm = document.getElementById("search-form");
const searchResult = document.getElementById("result");

const setupListeners = () => {
  searchForm.addEventListener("submit", onSearchFormSubmit);
};

const onSearchFormSubmit = (e) => {
  e.preventDefault();

  const query = searchForm.query.value.trim();
  const apiURL = `https://api.pexels.com/v1/search?query=${query}&orientation=landscape`;
  fetchImages(apiURL).then((data) => displayResults(data));
};

const displayResults = (data) => {
  console.log(data);

  const headers = document.getElementById("similar-header");
  console.log(headers);
  headers.classList.add("active");
  // if there are no results, display no image found
  if (data.total_results === 0) {
    searchResult.innerHTML = `
        <div class="no-result">No images found.</div>
      `;
    return;
  }

  // clear the results for every new search query
  if (data.page === 1) {
    searchResult.innerHTML = "";
  }

  const images = data.photos;

  // Display the first photo
  const photo = images[0];
  searchResult.innerHTML += `
      <div class="grid-item">
        <a href="${photo.url}" target="_blank">
          <img src="${photo.src.medium}" alt="${photo.alt}" />
          <div class="image-content">
            <p class="alt">${photo.alt}</p>
            <h3 class="photographer">${photo.photographer}</h3>
            <a href="${photo.photographer_url}" target="_blank" class="search-div-btn">Explore More</a>
          </div>
        </a>
      </div>
    `;

  // Create slides for all images in the slider
  const slideWrapper = document.getElementById("slideWrapper");
  images.forEach((image) => {
    const slide = document.createElement("li");
    slide.className = "splide__slide";
    slide.innerHTML = `
      <div class="slider-images">
        <img src="${image.src.medium}" alt="${image.alt}" class="slider-img">
        <button class="fav-btn">🤍</button>
      </div>`;
    slideWrapper.appendChild(slide);
  });

  // Add event listeners for "Add to Wishlist" buttons
  const similarButtons = slideWrapper.querySelectorAll(
    " .splide__slide .slider-images .fav-btn"
  );
  similarButtons.forEach((button) => {
    button.addEventListener("click", addToWishList);
  });

 function addToWishList(event) {
    const clickedButton = event.target;
      const parentDiv = clickedButton.parentElement;
      const imageSrc = parentDiv.querySelector(".slider-img").src;
      const imageAlt = parentDiv.querySelector(".slider-img").alt;
  
      // Check if the item is already in the wishlist
      const itemId = imageSrc + "|" + imageAlt;
      const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (wishlistItems.includes(itemId)) {
          console.log("Item already in wishlist");
          return;
      }
  
      // Add the item ID to the wishlist
      wishlistItems.push(itemId);
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  
      // Remove the clicked item from the similar section
      const similarSlide = parentDiv.closest(".splide__slide");
      similarSlide.remove();
  
      // Render the updated wishlist immediately
      renderWishlist();
  
}
  // Initialize Splide for the slider-for similar section
  new Splide("#splide", {
    type: "carousel",
    perPage: 2,
    breakpoints: {
      600: {
        perPage: 1,
      },
    },
    speed: 600,
    pagination: false,
  }).mount();

  // Initialize Splide for the slider-for wishlist section
  new Splide("#splide2", {
    type: "carousel",
    perPage: 2,
    breakpoints: {
      600: {
        perPage: 1,
      },
    },
    speed: 600,
    pagination: false,
  }).mount();
};

const fetchImages = async (apiURL) => {
  try {
    const response = await fetch(apiURL, {
      headers: { Authorization: apiKey },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! status=${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error", error);
  }
};

//* initialize

setupListeners();

document.addEventListener("DOMContentLoaded", function () {
  // Render wishlist on page load
  renderWishlist();
});

function renderWishlist() {
  const favSlideWrapper = document.getElementById("slideWrapper2");
  favSlideWrapper.innerHTML = "";

  const wishlistItems = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlistItems.forEach((itemId) => {
    const [imageSrc, imageAlt] = itemId.split("|");

    const slide = document.createElement("li");
    slide.className = "splide__slide";

    slide.innerHTML = `
  
          <div class="wish-div">
          
              <img src="${imageSrc}" alt="${imageAlt}" class="wishlist-img">
          </div>`;
    favSlideWrapper.appendChild(slide);
  });

  new Splide("#splide2", {
    type: "carousel",
    perPage: 2,
    breakpoints: {
      600: {
        perPage: 1,
      },
    },
    speed: 1200,
    pagination: false,
  }).mount();
}
