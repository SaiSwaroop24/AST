

# Rule Engine Application

**Description:**
The Rule Engine Application is a 3-tier web application designed to evaluate user eligibility based on attributes like age, department, salary, and experience. Utilizing an Abstract Syntax Tree (AST), it allows for the dynamic creation, combination, and evaluation of rules. This application features a user-friendly interface for creating and evaluating rules against user data.

**Features:**
- Create conditional rules dynamically using a simple UI.
- Evaluate user attributes against defined rules.
- Dynamic construction and combination of rules using AST.
- Supports JSON data input for user attributes.

**Project Structure:**
The project is structured as follows:
```
zepto1/
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── RuleEngine.js
│   └── package.json
├── server/
│   ├── models/
│   │   └── Rule.js
│   ├── routes/
│   │   └── ruleRoutes.js
│   ├── server.js
│   └── package.json
└── README.md
```

**Installation:**
To set up the application, follow these steps:

**For the Server:**
1. Navigate to the server directory:
   - Run `cd server`
2. Install server dependencies:
   - Run `npm install express mongoose body-parser cors`

**For the Client:**
1. Open a new terminal and navigate to the client directory:
   - Run `cd client`
2. Install client dependencies:
   - Run `npx create-react-app .` (if you haven't created the React app yet)
   - Then run `npm install axios`

**Setting Up ESLint:**
1. **Install ESLint** in both your server and client directories.
   - Navigate to the server directory and install ESLint:
     ```bash
     cd server
     npm install eslint --save-dev
     ```

   - Navigate to the client directory and install ESLint:
     ```bash
     cd client
     npm install eslint --save-dev
     ```

2. **Initialize ESLint** by creating a configuration file in each directory.
   - In the server directory, run:
     ```bash
     npx eslint --init
     ```
   - Follow the prompts to configure ESLint according to your preferences.

   - Repeat the above steps in the client directory to set up ESLint there as well.

3. **Create an ESLint Configuration File**: This file can include your preferred linting rules. Here’s an example configuration for both server and client:
   ```json
   {
       "env": {
           "browser": true,
           "es2021": true,
           "node": true
       },
       "extends": [
           "eslint:recommended",
           "plugin:react/recommended"
       ],
       "parserOptions": {
           "ecmaFeatures": {
               "jsx": true
           },
           "ecmaVersion": 12,
           "sourceType": "module"
       },
       "plugins": [
           "react"
       ],
       "rules": {
           "indent": ["error", 2],
           "linebreak-style": ["error", "unix"],
           "quotes": ["error", "single"],
           "semi": ["error", "always"]
       }
   }
   ```

4. **Add Linting Scripts**: You can add scripts to run ESLint in your `package.json` file for both server and client directories:
   ```json
   "scripts": {
       "lint": "eslint ."
   }
   ```

5. **Run ESLint**: You can now lint your code by executing the following command in each directory:
   ```bash
   npm run lint
   ```

**Running the Application:**
To run the application, follow these steps:

1. Start the MongoDB server (make sure it is running).
2. Start the backend server:
   - Run `cd server`
   - Run `node server.js`
3. Start the frontend application:
   - Open a new terminal, navigate to the client directory, and run `npm start`.

The application will be available at `http://localhost:3000`.

**Usage:**
- Open your browser and navigate to `http://localhost:3000` to access the Rule Engine interface.
- Use the input fields to create and evaluate rules.

**API Endpoints:**
1. **Create Rule**
   - **Endpoint:** `POST /api/rules/create_rule`
   - **Request Body:**
     ```json
     {
         "ruleString": "<your_rule_string>"
     }
     ```
   - **Response:**
     ```json
     {
         "message": "Rule created successfully",
         "rule": { ... }
     }
     ```

2. **Evaluate Rule**
   - **Endpoint:** `POST /api/rules/evaluate`
   - **Request Body:**
     ```json
     {
         "ast": <AST representation>,
         "data": {
             "age": 35,
             "department": "Sales",
             "salary": 60000,
             "experience": 3
         }
     }
     ```
   - **Response:**
     ```json
     {
         "eligible": true/false
     }
     ```

**Sample Inputs and Outputs:**
- To create a rule, you might use:
  ```json
  {
      "ruleString": "((age > 30 AND department = 'Sales'))"
  }
  ```
- Example JSON data for evaluation:
  ```json
  {
      "age": 35,
      "department": "Sales",
      "salary": 60000,
      "experience": 4
  }
  ```
- The response will indicate whether the user is eligible based on the provided rule and data.

**Design Choices:**
- The application is designed with a 3-tier architecture, separating the client, server, and database layers for improved maintainability and scalability.
- MongoDB is chosen for its flexibility in storing rule definitions and user data.

**Dependencies:**
- The application requires Node.js, Express, Mongoose, Body-parser, CORS for the server, and Axios for making HTTP requests from the client.
- ESLint for maintaining code quality and ensuring consistent coding standards.



