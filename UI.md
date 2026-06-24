# Aircraft Maintenance System - UI & API

This document describes how to start and stop the web interface and API of the Aircraft Maintenance System.

## 🚀 Starting the System

### 1. Full Stack (Recommended)
To start the entire system including the PostgreSQL database, database migrations (Flyway), and the Web UI/API in Docker, run the following command from the project root:

```cmd
build.bat
```

The system will run in the background. You can access the API/UI at:
**[http://localhost:3000](http://localhost:3000)**

### 2. Development Mode (UI/API only)
If you already have the database and migrations running in Docker and want to work on the code with hot-reloading:

1. Ensure the database is running:
   ```cmd
   docker compose up -d db flyway
   ```
2. Start the application in development mode:
   ```cmd
   npm run dev
   ```

The application will be available at:
**[http://localhost:3000](http://localhost:3000)**

---

## 🛑 Stopping the System

### 1. Stop Everything
To stop all containers and remove all volumes (this will delete all data in the database):

```cmd
destroy.bat
```

### 2. Stop only the UI/API
If you started the system with `build.bat`, you can stop the UI container specifically with:

```cmd
docker stop aircraft-ui
```

---

## 🛠 Useful Commands

| Command | Description |
| :--- | :--- |
| `npm run build` | Compiles TypeScript to JavaScript in the `dist/` folder. |
| `npm run start` | Starts the compiled application (production mode). |
| `npm run dev` | Starts the application with `nodemon` (development mode). |
| `docker compose logs -f ui` | View real-time logs for the UI/API container. |
| `docker compose logs -f db` | View real-time logs for the database. |
