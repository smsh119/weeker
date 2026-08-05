# Weeker - A week planner made with simplicity in mind

## Description

The name Weeker says it all. This web tool allows us to keep track of our weekly activities, which helps us plan our days more effectively and make the most of the time we have available. Indeed, there are a lot of calendar and to-do apps on the market, but they frequently have sophisticated functionality and intricate user interfaces that go above and beyond what we require. This is a really easy substitute for just setting up an hourly system for weekly work. Feel free to use it. Please drop down your review or suggestions for how to make this straightforward software even better. Many thanks!

## Installation

To run and setup this web application on local machine, one must need to have node.js installed in their system.

- First, clone this repository or download the zip file for this repository.
- Go to the cloned repository directory and open terminal. (cmd, powershell, vscode terminal, or any terminal you prefer)
- Run `npm install` (`yarn`, if you use yarn) at the repository root to install the backend dependencies.(node.js must be installed)
- Run `npm install` (`yarn`, if you use yarn) inside the `Front-end` directory to install the frontend dependencies.
- Create a `.env` file at the root with `MONGO_CONNECTION_STRING`, `JWT_SECRET`, and `SALT_ROUNDS`.
- Create a `.env` file inside the `Front-end` directory with `VITE_API_BASE_URL`.
- Run `npm run dev` (`yarn dev`, if you use yarn) in the root to start the backend server.
- Run `npm run dev` (`yarn dev`, if you use yarn) in the `Front-end` directory to start the frontend dev server.

## Build with

- Front-End

  - ReactJS
  - CSS
  - Non-mobile-first workflow

- Back-End

  - ExpressJS
  - MongoDB (Mongoose)
  - JWT for authentication
  - bcrypt for password hashing

## Links

- Node.js: [Visit node.js site](https://nodejs.org/en/download/package-manager)
- Live Site URL: [Currently unavailable]()
