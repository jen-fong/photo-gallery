### Installation

#### Mac/Linux

In the main directory, run
`npm install`
`npm start`
This will install dependencies in both client and api folders and start both servers in one terminal. Feel free to run them in separate terminals if you like.

#### Windows

If you are using windows, you will have to go into both folders separately and install packages there due to the postinstall script creating subshells. You can still run `npm start` in the main directory to run both servers in one terminal.

### Tests

I added some unit tests for both the api and client because I believe testing is an important part of development that is very helpful in finding bugs when refactoring.

To run tests for both client and api, run `npm test`. You can also go directly into the client or api folders to run tests independently.

### Technologies/Architecture

I separated the client and api code into their own respective folders that way they can both be deployed and ran independently of each other. Both folders contain their own package.json files. In the main folder, I added concurrently so we can run both in one tab in the terminal for an easier developer experience.

Frontend

- React and react-router for updating url queries
- redux for state management
- axios for fetching data
- react-infinite-scroll-component for infinite scroll

I organized the client code following the redux pattern of actions, components, reducers, and selectors. In larger apps, I like to follow the feature structure. I wrote my own css since it was fairly simple.

I would have liked to add typing (TypeScript, Flow), immutability, and reselect.

Backend

While I didn't do it in this assignment, it would be a better idea save the image urls to a database and add their height and width as separate columns so that you can filter the images by dimensions using the database instead of manually mapping through the photo urls in the code.

- Node.JS
- Express
- The api is broken up by layers. Express related items are in the router folder while the data access layer is in the services. This allows for easier testing of data accessing without having to pass an Express object to the test

### Features and Design

For the frontend, I chose to model it after instagram's photo grid. I think columns and rows are easier to look at compared to masonry and infinite scrolling over pages makes sense for a gallery since users are usually just leisurely browsing. Due to the size differences of the images, I had to create a square with a background color to make it more even.

1. Images are in a responsive grid done using flexbox and a couple of media queries
2. Gallery is paginated using infinite scroll
3. You can filter images by height, width, or a combination of both
4. You can toggle grayscale using the checkbox
5. Each of these filters are added to the route using react router so you can refresh the page after searching and the refreshed filters will be loaded
6. API is paginated
7. You can filter images by dimensions
8. grayscale toggling
9. Added a very basic RequestError class to express which handles 400 errors. I didn't need to throw this error in the api but you can and it will return the proper status code and message to the client
