# Task 2: Form Validation Application

This project is a simple web application that demonstrates server-side form validation using Node.js, Express, and EJS.

## Features

- A user-friendly registration form.
- Server-side validation for the following fields:
  - **Name**: Must be at least 2 characters long.
  - **Email**: Must be a valid email format.
  - **Age**: Must be a positive number.
  - **Gender**: A gender must be selected.
  - **Terms**: The user must agree to the terms.
- Displays clear error messages next to invalid fields.
- Stores valid submissions in a `submissions.json` file.
- A separate page (`/submissions`) to view all successful submissions.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **EJS**: Embedded JavaScript templating for generating HTML.
- **Nodemon**: Utility to monitor for changes and automatically restart the server during development.

## Setup and Installation

1.  **Clone the repository** or download the project files.

2.  **Navigate to the project directory**:
    ```bash
    cd task2-validation
    ```

3.  **Install dependencies**:
    ```bash
    npm install
    ```

## How to Run the Application

1.  **Start the server in development mode (with auto-restarting)**:
    ```bash
    npm run dev
    ```
    **OR**

    **Start the server in production mode**:
    ```bash
    npm start
    ```

2.  Open your web browser and go to:
    [http://localhost:3000](http://localhost:3000)

## Endpoints

- `GET /`: Displays the registration form.
- `POST /submit`: Handles form submission, performs validation, and saves the data if valid.
- `GET /submissions`: Displays a list of all valid submissions.
