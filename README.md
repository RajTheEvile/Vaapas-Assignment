# Vaapas Assignment Reference Document

You are tasked with creating a React application that allows users to search for movies. The search functionality will use the Open Library Search API, and the results will display as cards, each with a random dog image from another API.

### Steps to Complete the Assignment

1. **Environment Setup:**
    - **Node.js**: Make sure you have Node.js installed on your machine.
    - **React**: Create a new React project using the Create React App.
2. **Creating the Search Bar:**
    - Design and implement a search bar where users can enter a movie name.
    - When a user submits a query, construct a URL for the Open Library Search API to fetch data about the movie.
3. **Fetching Data from the Open Library API:**
    - Use the endpoint `https://openlibrary.org/search.json` to search for movies.
    - Example URL format:
        - `https://openlibrary.org/search.json?q=the+lord+of+the+rings`
        - You will append the movie name entered in the search bar to this URL to fetch the relevant data.
4. **Handling API Response:**
    - Process the API response to retrieve relevant information such as the title, author, publication date, etc.
    - If the API returns multiple books, handle it to manage or filter the results as needed.
5. **Creating Cards for Display:**
    - For each movie retrieved, create a card component.
    - Each card should have an image and relevant movie data.
    - Fetch a random dog image from `https://dog.ceo/api/breeds/image/random` for each card.
6. **Displaying the Cards:**
    - Display the cards dynamically based on the search results.
    - Ensure each card shows at least the title and a random dog image.
7. **Making Components Generic:**
    - Design your React components in a reusable manner. This means crafting components that can easily be adapted for different data rather than hardcoding specifics.

### Additional Features:

- Implement basic form validation to check if the search input is empty.
- Handle loading states and display a message or indicator while data is being fetched.
- Implement error handling to manage any possible issues with API requests.

### Summary of Deliverables:

- A functional React app with a search bar.
- API integration to fetch and display movie data.
- Dynamic cards with random images and movie details.

### Expected Outcomes:

By the end of this assignment, you should have a React movie search application that:

- Allows users to search movies using a search bar.
- Fetches relevant movie data from the Open Library API.
- Displays the data in an elegant and user-friendly manner with cards and images.
