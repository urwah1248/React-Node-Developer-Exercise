## Started Project

### Estimated Finish - 17-6-2023 6:00pm

# React/Node Developer Exercise - Bulk Orders App

## Project Description
Bulk Orders app is a React/Node Application that is used to enter Bulk amounts of orders using a CSV file to speed up the process of adding orders.

## Frontend
Frontend is a simple UI featuring a Form to submit CSV along with the Date and Vendor name, with an error message at the top. It also has another route where it shows the table of all the orders.

### Technology Used
- React: Frontend is built entirely on react using the create-react-app CLI in JavaScript. React allows for using its tools such as useState for state variables and useEffect for fetching the data.
- React Router Dom: React router is used for adding another route for the orders table rather than displaying it on the ‘/’ route.
- CSS: Styling on the frontend is done using plain css.

## Backend
Backend is a Node.JS application created using a starter template from awesome-compose. It is used for CRUD operations and CSV parsing.

### Technology Used
- Express: Express is used to build the RESTful API endpoints and handle HTTP requests/responses in the backend. It provides routing, middleware, and other functionalities to facilitate the development of web applications.
- Mongoose: Mongoose is a library for handling mongoDB databases on the Node JS Backend more easily. Mongoose is used for handling Database operations such as updating orders table and viewing it.
- CSV-Parser: CSV-Parser is used to read the provided CSV file to validate and update the database.
- Multer: Multer is used to handle file uploads in the backend to receive CSV files from client requests, save them to the server, and perform necessary processing or validation.
- fs (File System): The fs module is used to read and write files on the server. It is used to read the uploaded CSV file, remove temporary files, and perform other file-related operations.
- Dotenv: Dotenv is used to store environment variables for Port and MongoDB URI.
- Other Technologies: Following technologies are used by the starter node js template: bcryptjs, body-parser, cookie-parser, cors, lodash, simple-node-logger and validator.

## Database
This application uses MongoDB as its Database to store the orders information that is scanned from the CSV files by the backend.

### Details
- Database Name: Bulkorders
- Collections:
  - Orders

#### Model:
```javascript
{
    ID: ObjectId,
    Date: Date,
    Vendor: String,
    Model Number: String,
    Unit Price: Float,
    Quantity: Integer
}
```

## Design Pattern
The frontend of the application follows the React Functional Components with Hooks design pattern. This pattern emphasizes the use of functional components as the building blocks of the user interface, promoting modularity, reusability, and easier testing. React hooks, such as useState and useEffect, are employed to manage component-level state, handle side effects, and incorporate lifecycle events.

The backend of the Bulk Orders application follows the Model-View-Controller (MVC) pattern. Mongoose is used as the modeling tool for the Order Model. Build of the frontend is the View and all the route handling done by the Express is the Controller.

## State Management
State Management of this application is straightforward by using the useState Hook, and they are all used within their own components. We didn't need to use React Context Hook or an external State Management tool because of the low complexity of this application. This application relies more on the Backend for validation and extracting entries of the CSV file that is provided by the User.

## Form Validation Algorithm
The form is validated on multiple occasions, both on the client-side and server-side.

### Client Side
- Input tags validate that the input is provided and is within the correct format.
- Form Submit handler makes sure that the provided input is within the correct format in case someone bypasses HTML’s tags.

### Server Side
- The Upload route receives the form data and the file where it validates the CSV file that it is in the correct format.
- The Upload Route makes sure that the entries in the CSV file are according to the required format.
- Mongoose validates that the data is according to the defined Order Model.

## Logic
Here’s the logic for the Form Validation Algorithm:
1. Users select a CSV file through the frontend form and submit it along with the date and vendor name.
2. The backend uses the CSV-Parser library to parse the uploaded CSV file, extracting the order data row by row.
3. For each row of the CSV data, Model Number, Unit Price, and Quantity are validated.
4. After processing all the rows, the application checks if any error messages have been generated during the field validations. If there are error messages, the backend returns a response to the frontend, indicating the validation errors.
5. If there are no validation errors, the application proceeds to create an Order model instance for each valid row of data. The date and vendor information provided in the frontend form are associated with each order. The validated order data is then saved to the MongoDB database using Mongoose's data model.
6. After successful storage, the backend sends a response to the frontend, indicating the successful upload and processed data.
By implementing this form validation algorithm, the Bulk Orders application ensures that the CSV data is thoroughly validated before storing it in the database, maintaining data integrity and accuracy. Any invalid or missing data is properly identified and associated with specific rows, allowing users to rectify and resubmit the data if necessary.

## Additional Features
### Orders Table
Orders table was added as a necessary addition to the project requirement that enables users to see that the database is updated according to the CSV file. Orders table shows the necessary information in the form of a table that includes all the necessary information of each order such as Id, Model Number, Unit Price, Vendor, date, and Quantity.
Orders table can be accessed from the Link below the Submit button of the form or just go to its route that is /orders.

## Deployment
This application is deployed on the Railway.app, which is similar to Heroku. The deployment process includes the following steps:
1. In Railway, add a new project from a git repository and select the repository of this project.
2. Add a MongoDB database service and note its URI.
3. Use that URI in the environment variables of the application and also add the PORT env.
4. Railway will start deploying the application, and eventually, the application will be deployed and the link to it will be provided to view it.
5. Frontend and Backend are deployed together using the MVC, while the database is a deployed Railway service that is connected to the application using the environment variables.
