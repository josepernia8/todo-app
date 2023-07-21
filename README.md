# Todo App

## Tech Stack

`Vite, React, TypeScript, Tailwind, Node, Express, Postgres`

## Installation

Run `make install` to install all dependencies

## Running the project

- Prerequisite: [Installation](#installation) section

- Run `make init` to spin up the environment

- This starts your app in development mode, rebuilding assets on file changes. By default, the app will be running on `http://localhost:4000/` and the API on: `http://localhost:8000/`

- If you don't want to use the `Makefile` or run the project in another way: [see alternatives below](#alternatives)

## Usage
- Run `make help` to list all commands available
- I am leaving some notes on: [Extra](#extra)

## Folder structure

```
│  api/
|    └─── src
|       └─── routes/
|           └─── index.ts
|           └─── todo.ts (all the routes live here)
|       └─── services/
|           └─── index.ts
|           └─── todo.test.ts
|           └─── todo.ts (DB related operations)
|       └─── types/
|       └─── index.ts (entrypoint for the API)
│  ui/
|    └─── src
|       └─── components/
|           └─── __tests__
|           └─── AddTodo.tsx
|           └─── Modal.tsx
|           └─── SearchTodo.tsx
|           └─── Todo.tsx
|           └─── TodoList.tsx
|       └─── hooks/
|           └─── useTodo.tsx (most frontend logic lives here)
|       └─── reducers/
|           └─── todoReducer.ts (reducer used in above hook)
|       └─── services/
|       └─── types/
|       └─── App.tsx (main file for UI app)
|    └─── ...
│  docker-compose.yml
│  Makefile
│  README.md (this file)
│  TODO Api.postman_collection.json
│  ...
```

## Alternatives
- You could also spin up the environments with the following steps:
1. On a terminal do: `cd api/`
2. Run `npm install`
3. Run `npm run dev`
4. On another terminal do: `cd ui/`
5. Repeat steps `2` and `3`

## Extra
Leaving some notes here about what part of the though process that went on during the test (notes in none specific order).

- I made a monorepo so is easier to share and that's why I also made a React app with Vite on the `ui` folder
- Added some simple tests in both applications so you can run them with their respective `test` commands (didn't include coverage)
- Added a `docker-compose.yml` with out a Dockerfile to simple spin up of the whole environment
- Added a `Makefile` so is easier to get things running and use commands
- This is made in just some hours, don't expect real production error handling and the best code splitting and modularization
- If you have any question feel free to ask!
