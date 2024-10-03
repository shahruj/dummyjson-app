# My React App - Product and User Management

This project is a simple React app for managing and viewing **Users** and **Products**. The app allows you to:

- Filter, search, and paginate through a list of users and products.
- Dynamically switch between viewing **Users** and **Products** data.
- Interact with a UI that includes dropdown filters, search functionality, and responsive data tables.

This app uses the [DummyJSON API](https://dummyjson.com/) for product and user data.

## Features

### **1. Product and User Pages**
- **Reusable Component**: Both the **Users** and **Products** pages share a single component (`DataPage.js`), with different data types controlled by passing a prop (`type`).
- **Dynamic Filtering**: The app has dynamic filters that let you filter products by category or brand, and users by name or email. For the column based filtering I have disabled it for porducts as the document of dummyjson app does not seem to make the filtering available for porduct.
- **Client-Side Search**: It includes a search bar that filters data based on input, searching across all fields.
- **Pagination**: You can set how many results per page to display (5, 10, 20, or 50) and navigate through multiple pages of results.

### **2. Axios for Data Fetching**
- The app uses **Axios** to make API requests to the DummyJSON API.
- It handles pagination and filters dynamically, making requests with query parameters like `limit`, `skip`, and specific filters for products and users.

### **3. Context API for State Management**
- The app uses React's **Context API** to manage global state, including current page, page size, search terms, and filters. This allows different components (like filters, pagination, and data tables) to share state.

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
It opens [http://localhost:3000](http://localhost:3000) to view it in your browser. The page reloads automatically when changes are made to the code, and you can see any lint errors in the console.

### `npm test`

Launches the test runner in interactive watch mode. You can write tests for components to ensure they function correctly. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more details.

### `npm run build`

Builds the app for production to the `build` folder. This command optimizes the build for better performance and prepares it to be deployed. The build is minified, meaning the app will take up less space and load faster.

### `npm run eject`

This is a one-way operation that exposes all the configuration files and dependencies used by **Create React App** (like Webpack, Babel, etc.). Once you eject, you have full control over the configuration, but you cannot go back to the simple setup.

---

## Project Structure

```bash
my-react-app/
├── public/
├── src/
│   ├── components/           # Reusable UI components like Filters, Pagination, and DataTable
│   │   ├── Filters/
│   │   │   └── Filters.js    # Dropdown filters for products and users
│   │   ├── Pagination/
│   │   │   └── Pagination.js # Pagination component to navigate pages
│   │   ├── Table/
│   │   │   └── DataTable.js  # DataTable component that displays users/products in a table
│   │   └── Shared/
│   │       ├── Navbar.js     # Navigation bar for switching between pages
│   │       └── Search.js     # Search input for filtering data client-side
│   ├── context/
│   │   └── AppContext.js     # Context API to manage global state (e.g., filters, page size)
│   ├── pages/
│   │   └── DataPage.js       # Main reusable component for both Users and Products pages
│   ├── App.js                # Root component that sets up routing
│   ├── index.js              # Entry point for the React app
│   └── App.css               # Global CSS styles for the app
├── package.json
└── README.md