# React Gallery

## Requirements
1. Use Redux + Redux Persist
2. Fetch the photo feed from URL: https://jsonplaceholder.typicode.com/photos
3. Visualize an album selector (1, 2, 3, 4, ...) - you can improvise with the design
4. When choosing an album - visualize "cards" with the image and title from the JSON 
5. Add a "Favorites" functionality to each photo card. When the user marks a photo as favourite save that information in the redux state. Display these images in a separate "Favorites" albums
6. After page refresh restore the "Favorites" album state from local storage using redux-persist


## Tech Stack:
- `TypeScript`
- `React`
- `Redux Persist`
- `Redux Toolkit` to save up on boilerplate code
- `React Router DOM` for routing
- `Material UI` for components
- `Axios` for fetching data
- `React Window` for album virtualization
- `Fuse.js` for fuzzy search of album names
- `ESlint` + `Prettier`
- `Vite` for dev server
- `SWC` for bundling

## How to run
1. Clone the repo
2. Run `yarn` to install dependencies
3. Run `yarn dev` to start the dev server
4. Open `http://127.0.0.1:5173/` in your browser
