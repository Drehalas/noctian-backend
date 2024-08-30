
# Noctian Universe Backend

The backend server for the Noctian Universe game, built with Node.js, Express, and MongoDB. This server handles game logic, user management, and communication with the frontend and Telegram bot.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Server](#running-the-server)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Noctian Universe is a Telegram-based game with a React frontend and a MongoDB-powered backend. This backend manages game state, user data, and interaction with the Telegram bot to provide a seamless gaming experience.

## Features

- User management (registration, login, etc.)
- Game state management
- Integration with Telegram bot for real-time game interaction
- RESTful API to handle game logic
- MongoDB as the database to store user and game data

## Tech Stack

- **Node.js**: JavaScript runtime environment
- **Express**: Fast, unopinionated, minimalist web framework for Node.js
- **MongoDB**: NoSQL database for storing game and user data
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js
- **dotenv**: Environment variable management
- **body-parser**: Middleware to parse incoming request bodies
- **nodemon**: Utility to automatically restart the server on file changes during development

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v12.x or higher)
- npm (Node Package Manager)
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/noctian-universe-backend.git
   cd noctian-universe-backend
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   Create a `.env` file in the root directory and add the following:

   ```env
   MONGODB_URI=mongodb://localhost:27017/noctian-universe-db
   PORT=5000
   TELEGRAM_BOT_TOKEN=your-telegram-bot-token
   ```

   Replace `your-telegram-bot-token` with your actual Telegram bot token.

### Running the Server

To run the server in development mode:

```bash
npm run dev
```

This command will start the server using `nodemon`, which watches for file changes and automatically restarts the server.

## Project Structure

```plaintext
/noctian-universe-backend
├── /config
│   ├── db.js                   # Database configuration and connection
│   ├── dotenv.config.js        # Environment variables configuration
│   └── telegram.config.js      # Telegram bot configuration
├── /controllers
│   ├── userController.js       # User-related logic
│   ├── gameController.js       # Game-related logic
│   ├── factionController.js    # Faction and skills logic
├── /models
│   ├── userModel.js            # Mongoose schema and model for users
│   ├── gameModel.js            # Mongoose schema and model for game state
│   ├── factionModel.js         # Mongoose schema and model for factions and skills
├── /routes
│   ├── userRoutes.js           # Routes for user-related API endpoints
│   ├── gameRoutes.js           # Routes for game-related API endpoints
│   ├── factionRoutes.js        # Routes for faction and skill-related API endpoints
├── /services
│   ├── telegramService.js      # Service to handle Telegram bot interactions
│   ├── gameLogic.js            # Core game logic and mechanics
├── /middlewares
│   ├── authMiddleware.js       # Middleware for authentication and authorization
│   ├── errorHandler.js         # Global error handling middleware
├── /utils
│   ├── helperFunctions.js      # Helper functions for various tasks
│   ├── constants.js            # Application constants and enums
│   └── logger.js               # Logger configuration and utilities
├── .env                        # Environment variables
├── .gitignore                  # Git ignore file
├── package.json                # Node.js dependencies and scripts
├── README.md                   # Documentation for the backend
└── server.js                   # Entry point of the application
```

## API Endpoints

### User Endpoints

- **POST /api/users/create**: Create a new user
  - **Request Body**: `{ "username": "user", "email": "user@example.com", "password": "password123" }`

Additional endpoints can be documented here as they are implemented.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
