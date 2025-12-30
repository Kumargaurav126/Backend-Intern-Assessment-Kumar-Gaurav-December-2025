# User Management System

## Project Overview
This is a comprehensive full-stack User Management System designed to handle Authentication, Role-Based Access Control (RBAC), and Profile Management.

The application supports two distinct user roles:
1.  **Standard Users**: Capabilities include secure signup/login, viewing personal profile, and updating details (Name, Email, Password).
2.  **Administrators**: Capabilities include access to a protected dashboard, viewing all registered users in a paginated table, and toggling user status (Active/Inactive).

The system prioritizes security using JWT (JSON Web Tokens) for stateless authentication and bcrypt for password hashing.

---

## Tech Stack

### Backend
* **Runtime Environment**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB Atlas
* **ODM**: Mongoose
* **Authentication**: JSON Web Tokens (JWT) & bcryptjs
* **Validation**: Express-Validator
* **Security**: Helmet, CORS
* **Testing**: Jest, Supertest

### Frontend
* **Library**: React.js
* **Routing**: React Router DOM (v6)
* **State Management**: React Context API
* **HTTP Client**: Axios
* **Notifications**: React Toastify
* **Styling**: CSS Modules / Standard CSS

---

## Setup Instructions

### Prerequisites
* Node.js (v14+)
* npm or yarn
* MongoDB Connection URI

### 1. Clone the Repository

`git clone <repository_url>`

`cd <project_folder>`


### 2. Backend Setup
Navigate to the backend directory and install dependencies:

`cd backend`

`npm install`

Create a .env file in the backend root and configure the following:
**Code snippet**

* PORT=5000
* MONGO_URI=your_mongodb_connection_string
* JWT_SECRET=your_secure_jwt_secret
* NODE_ENV=development
* Start the backend server:

`npm start`

The server will run on http://localhost:5000

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:

`cd ../frontend`

`npm install`

Start the React application:

`npm start`

The application will launch on http://localhost:3000

### 4. Running Tests
To run the backend unit tests:

`cd backend`

`npm test`

