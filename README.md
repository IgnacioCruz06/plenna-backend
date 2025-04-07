# Plenna Backend

This is the backend for **Plenna**, a medical management system designed to handle data related to patients, doctors, and appointments.

## 🚀 Technologies

- **Node.js** – Server-side runtime
- **Express** – Web application framework
- **MongoDB** – NoSQL database
- **Mongoose** – MongoDB ODM
- **TypeScript** – Typed JavaScript for improved developer experience

## 📦 Project Structure

* ├── **src/**: Contains the source code of the project.
  * ├── **config/**: Environment and configuration settings.
  * ├── **controllers/**: Handles request/response logic (organized by version).
    * │ └── v1/
  * ├── **libraries/**: Reusable modules or wrappers (e.g., external APIs)
  * ├── **logs/**: It contains log files for error amd requests (it is created on your local only)
  * ├── **middlewares/**: Express middlewares for validation, auth, etc. 
  * ├── **models/**: Mongoose schemas for MongoDB collections.
  * ├── **routes/**: Defines the application routes.
  * ├── **services/**: Business logic and app services
  * ├── **utils/**: Utility functions and helpers.
  * ├── **validators/**: Request validation logic (e.g., Joi or express-validator).
* ├── **db.ts**: Database connection logic
* ├── **main.ts**: Entry point for starting the app
* └── **server.ts**: Express server setup

## ⚙️ Setup & Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/IgnacioCruz06/plenna-backend.git
   cd plenna-backend

2. **Install dependencies:**

    ```bash
    npm install

3. **Configure environment variables:**

    Create a .env file based on the provided .env.example:

4. **Run the development server:**

    ```bash
    npm run dev

## 📜 Scripts

| Command | Description |
| --- | --- |
| **npm run dev** | Run in development mode with hot reload |
| **npm run build** | Compile TypeScript to JavaScript |
| **npm start** | Run the compiled app in production mode |

## 🌐 API Structure

The API is versioned under /api/v1 and follows RESTful conventions.
Example Endpoints:

    GET  /api/v1/paciente
    POST /api/v1/doctors

## 🧪 Testing

You can use tools like Postman or Insomnia to manually test your endpoints.