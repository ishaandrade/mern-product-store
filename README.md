# Online Product Store using MERN Stack

View Live Project: https://mern-product-store-wx68.onrender.com

A full-stack MERN (MongoDB, Express, React, Node.js) application that serves as a simple product management store. It allows users to perform CRUD (Create, Read, Update, Delete) operations on products. The frontend is built with React and Vite, styled with Chakra UI, and uses Zustand for state management. The backend is an Express server connected to a MongoDB database.

## Features
- **View Products**: Displays a list of all products in a clean, responsive grid.
- **Create Products**: Add new products with a name, price, and image URL via a dedicated form.
- **Update Products**: Edit the details of an existing product through an inline dialog.
- **Delete Products**: Remove products from the store.
- **Light/Dark Mode**: Toggle between light and dark themes for better user experience.
- **Real-time UI Updates**: State is managed globally with Zustand, ensuring the UI reflects changes instantly without page reloads.
- **User Notifications**: Provides feedback for CRUD operations using toast notifications.

## Tech Stack
- **Frontend**:
    - [React](https://reactjs.org/)
    - [Vite](https://vitejs.dev/)
    - [Chakra UI](https://chakra-ui.com/)
    - [Zustand](https://github.com/pmndrs/zustand) for state management
    - [React Router](https://reactrouter.com/) for navigation
- **Backend**:
    - [Node.js](https://nodejs.org/)
    - [Express.js](https://expressjs.com/)
    - [Mongoose](https://mongoosejs.com/)
- **Database**:
    - [MongoDB](https://www.mongodb.com/)

## Project Structure
The repository is a monorepo with two main directories:
- `backend/`: Contains the Express.js server, API routes, controllers for handling business logic, Mongoose models for database schemas, and database configuration.
- `frontend/`: Contains the React client application bootstrapped with Vite. It includes pages, reusable components, and the Zustand store for managing application state.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm
- MongoDB URI (from a local instance or a service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ishaandrade/mern-product-store.git
    cd mern-product-store
    ```

2.  **Create an environment file:**
    Create a `.env` file in the root of the project and add your MongoDB connection string and a port number.
    ```env
    MONGO_URI=your_mongodb_connection_string
    PORT=5000
    ```

### Development Mode

1.  **Install backend dependencies:**
    From the root directory, run:
    ```bash
    npm install
    ```

2.  **Install frontend dependencies:**
    ```bash
    cd frontend
    npm install
    ```

3.  **Run servers:**
    You'll need two separate terminals.
    - In the first terminal, start the backend server from the root directory:
      ```bash
      cd .. 
      npm run dev
      ```
      The backend will run on `http://localhost:5000`.

    - In the second terminal, start the frontend development server from the `frontend` directory:
      ```bash
      cd frontend
      npm run dev
      ```
      The React app will be available at the URL provided by Vite (e.g., `http://localhost:5173`). The app is configured to proxy API requests to the backend.

### Production Mode

1.  **Build the application:**
    From the root directory, run the build script. This will install all dependencies for both frontend and backend, and create a production build of the React app.
    ```bash
    npm run build
    ```

2.  **Start the production server:**
    ```bash
    npm start
    ```
    This command starts the Express server, which will serve the static frontend files from `frontend/dist` and handle API requests. The application will be available at `http://localhost:5000`.

## API Endpoints

The backend exposes the following RESTful API endpoints:

| Method | Endpoint             | Description                |
| :----- | :------------------- | :------------------------- |
| `GET`  | `/api/products`      | Get all products           |
| `POST` | `/api/products`      | Create a new product       |
| `PUT`  | `/api/products/:id`  | Update a product by its ID |
| `DELETE`| `/api/products/:id`  | Delete a product by its ID |

## Credits 
This project was built with guidance from Codesistency’s YouTube tutorial “[FREE Coding Bootcamp – Build 4 Full Stack Projects in 23 Hours](https://www.youtube.com/watch?v=MDZC8VDZnV8&t=7761s)”.

