# Games-Site

A responsive web application for browsing and discovering free-to-play games. This project was developed as a task to practice and demonstrate the principles of Object-Oriented Programming (OOP) and API integration using modern JavaScript.

## Features

* **Dynamic Game Cards:** Displays a catalog of games fetched from a remote API.
* **Search Functionality:** Allows users to search for games by title.
* **Detailed View:** Clicking on a game card opens a detailed view with a description and screenshots.
* **Image Slider:** The detailed view includes a functional image slider for game screenshots.
* **Category Filtering:** Users can filter games by category (e.g., `MMORPG`, `shooter`, `strategy`).

## Technical Explanation (OOP)

The core of this project's logic is built around a `Game` class, which showcases an understanding of Object-Oriented Programming principles.

### The `Game` Class

Instead of managing game data with simple objects or arrays, each game is an instance of the `Game` class. This approach encapsulates all the data and behavior related to a single game in one organized unit, making the code more readable, maintainable, and scalable.

#### Class Structure

* **`constructor`**: Initializes a new `Game` object with essential properties like `id`, `title`, `genre`, and `thumbnail`.
* **`displayNewCardGame()`**: A method responsible for creating a new HTML element (a game card) from a template and populating it with the instance's data. This separates the logic for data handling from the presentation.
* **`setSpecData()`**: This method updates the `Game` object with additional, more detailed information fetched from a second API call, such as a long description and screenshots.
* **`updateLayerData()`**: Handles the dynamic population of the detailed view overlay with all the game's information, including the long description and screenshots.
* **`leftSlide()` & `rightSlide()`**: Methods for controlling the image slider, which manage the state (`this.img_idx`) and update the displayed images.

This class-based structure provides a clean separation of concerns and a clear, logical flow for managing the application's state and UI updates.

## API Integration

The application relies on two separate asynchronous API calls to a free-to-play games database:

* **`getAllGamesOfCatg()`**: Fetches a list of games for a specific category to populate the main page.
* **`getGameDetails()`**: Fetches a detailed data for a single game when a user clicks on a card. This data is then used to update the `Game` object and display the detailed view.

## Live Demo

You can view the live version of the project here: [https://abdelrhman-mosad.github.io/Games-site/](https://abdelrhman-mosad.github.io/Games-site/)

## Technologies Used

* **HTML & CSS:** For structuring and styling the user interface.
* **JavaScript (ES6+):** For all application logic, including API calls, DOM manipulation, event handling, and implementing the `Game` class.
* **Free-to-Play Games Database API:** The data source for all game information.
