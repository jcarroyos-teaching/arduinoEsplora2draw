# arduinoEsplora2draw

![Vite-React-TS](https://github.com/user-attachments/assets/5a6a0714-d76d-468c-af55-76c7d9a376e0)


## Instructions

Before running the scripts, make sure they are executable. You can do this by running:

```sh
chmod +x play.sh stop.sh
```

To run the project, use the `play.sh` script. This script will start all necessary services.

```sh
./play.sh
```

To stop the project, use the `stop.sh` script. This script will stop all services.

```sh
./stop.sh
```

## Project Structure

### Frontend

The frontend of this project is built with modern web technologies and is located in the `frontend/` directory. It includes:

- **React**: The main framework used for building the user interface. The entry point is [`main.tsx`](frontend/src/main.tsx).
- **Tailwind CSS**: A utility-first CSS framework for styling, configured in [`tailwind.config.js`](frontend/tailwind.config.js).
- **Vite**: A build tool that provides a fast development environment, configured in [`vite.config.ts`](frontend/vite.config.ts).
- **PostCSS**: A tool for transforming CSS with JavaScript plugins, configured in [`postcss.config.js`](frontend/postcss.config.js).
- **ESLint**: A tool for identifying and fixing problems in JavaScript code, configured in [`eslint.config.js`](frontend/eslint.config.js).

The main components and assets are located in the `src/` directory, including:

- [`App.tsx`](frontend/src/App.tsx): The main application component.
- [`CanvasComponent.tsx`](frontend/src/CanvasComponent.tsx): A component for rendering a canvas.
- [`DataFetcher.tsx`](frontend/src/DataFetcher.tsx): A component for fetching and displaying data.
- [`Footer.tsx`](frontend/src/Footer.tsx): The footer component.

### Backend

The backend of this project is located in the `backend/` directory and is structured as follows:

- **Encore**: A backend framework for building scalable and maintainable cloud services. The main configuration is in [`encore.app`](backend/encore.app).
- **Authentication**: Located in the `auth/` directory, it handles user authentication and authorization.
- **Clients**: Located in the `clients/` directory, it contains client-specific logic and API integrations.
- **Internal**: Located in the `internal/` directory, it contains internal packages and utilities used by the backend services.

The backend also includes a `manifest.json` file in the `build/` directory, which contains metadata about the build process.

### Additional Configuration

- **TypeScript**: The project uses TypeScript for type safety and better developer experience. The configuration files are [`tsconfig.json`](tsconfig.json) and [`tsconfig.app.json`](frontend/tsconfig.app.json).
- **Package Management**: The project uses npm for package management, with dependencies listed in [`package.json`](package.json) files in both the root and `frontend/` directories.
