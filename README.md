# weekly-assignment-L2-3

1. Define variables for DOM elements:
    - menu, menuItems, hamburger, closeIcon, menuIcon
    - searchForm, searchResult
    - slideWrapper, favSlideWrapper

2. Add event listeners for toggling the menu visibility (toggleMenu) and form submission (onSearchFormSubmit)

3. Implement toggleMenu function to toggle the menu visibility when hamburger icon is clicked

4. Implement onSearchFormSubmit function to handle form submission:
    - Prevent default form submission behavior
    - Get the search query from the form
    - Construct the API URL with the search query
    - Fetch images from the API using fetchImages function
    - Display the results using displayResults function

5. Implement displayResults function to render the search results:
    - Handle no results case and clear previous results
    - Render the first image in the search results with details and an "Explore More" button
    - Create slides for all images in the slider
    - Add event listeners to "Add to Wishlist" buttons to call addToWishList function

6. Implement addToWishList function to add an image to the wishlist:
    - Extract image source and alt text from the clicked button's parent element
    - Check if the item is already in the wishlist using localStorage
    - If not in the wishlist, add the item ID to localStorage and remove it from the similar section
    - Add the item to the wishlist section

7. Implement fetchImages function to fetch images from the Pexels API:
    - Construct the API URL with the provided API key
    - Fetch images using the fetch API
    - Handle errors and return the JSON response

8. Initialize the page by setting up listeners and rendering the wishlist on DOMContentLoaded event:
    - Call setupListeners to initialize event listeners
    - Render wishlist items by calling renderWishlist function on page load
    - Define renderWishlist function to render wishlist items stored in localStorage
    - Parse the wishlist items from localStorage
    - Render each wishlist item in the wishlist section

9. Initialize Splide sliders for both the similar section and the wishlist section
