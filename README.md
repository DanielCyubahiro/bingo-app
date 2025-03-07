# Movie Bingo 📽️🎬🍿

Welcome to **Movie Bingo**! A fun, interactive game to enjoy during virtual movie nights with friends. Mark off the movie phrases as you hear them, and try to get as many **Bingos** as possible by the end of the movie. 

## Game Overview

Movie Bingo is a 5x5 bingo card filled with movie phrases. The goal is to mark off the phrases as you hear them throughout the movie. There are two ways to win:

1. **Movie Bingo**: The first player to mark off all the phrases (a full card) wins.
2. **Most Bingos**: If no one gets a full card by the end of the movie, the player with the most complete rows of 5 cards(horizontal, vertical, or diagonal) wins.

Stay engaged, have fun, and see who can get the most bingos before the movie ends!

## Features

- **Dynamic Bingo Grid**: A shuffled 5x5 grid filled with movie phrases.
- **Mark Cards**: Click on the cards to mark them when you hear a matching phrase during the movie.
- **Bingo**: Get a bingo by marking **five** phrases in a row, column, or diagonal.
- **Movie Bingo**: Win the Movie Bingo by marking off all 25 cards and win.
- **Fireworks Animation**: Celebrate when you get Movie Bingo, with fireworks animation when all cards are marked.
- **Reset Button**: After a round, reset the game and start a new movie night!

## Live Demo

You can view a live demo of the app (if available) [here](https://moviebingo.netlify.app/).

## Installation

To run the Movie Bingo app locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://gitlab.com/DanielPrince/bingoapp
   ```

2. **Navigate into the project folder**:
   ```bash
   cd movie-bingo
   ```

3. **Install dependencies**:
   Make sure you have [Node.js](https://nodejs.org) installed, then run:
   ```bash
   npm install
   ```

4. **Run the app**:
   After installing the dependencies, start the development server:
   ```bash
   npm start
   ```

   The app should now be running at `http://localhost:3000` in your browser.

## Technologies Used

- **React**: The app is built using React to create an interactive UI.
- **Lottie-Web**: Used for animation (fireworks animation on winning).
- **CSS**: Styling and layout for the grid and animations.

## How to Play

1. The game starts with a randomly shuffled grid of movie phrases.
2. The center card is a free space. You can mark other cards by clicking on them when you **hear a phrase** from the movie that matches a trope on your card.
3. The game will check for bingos (horizontal, vertical, or diagonal).
4. **Winning Condition 1 – Movie Bingo**: The first person to mark all their cards wins.
5. **Winning Condition 2 – Most Bingos**: If no one completes the full grid during the movie, the person with the most Bingos, i.e. completed lines (horizontal, vertical, or diagonal) wins.
6. After a win, fireworks will animate on the screen to celebrate, and a reset button will appear to start a new round.

## App Structure

### Components

- **BingoBoard**: The main component that generates the board, handles card marking, win-checking, and animations.
- **Button**: Used as for resetting the game upon winning.
- **Lottie**: Used for the fireworks animation on win.

### Styles

- **CSS**: The app uses a `bingo-board.css` and `button.css` file to style the game grid, cards, animations, and other elements.

## Customizing Movie Sentences

To change the phrases that appear in the game:

1. Modify the `movieTropes` array in the `data/tropes.js` file.
2. The app will automatically shuffle and display them in the bingo grid when the game starts.

## Contributions

Feel free to fork the repository and submit pull requests. Contributions are always welcome!