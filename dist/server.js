import express from 'express'; // Import the express package
import routes from './routes/index.js'; // Import the routes folder
import db from './config/connection.js'; // Import the connection file
// Call the db function
await db();
// Set the port
const PORT = process.env.PORT || 3001;
const app = express(); // Create an instance of the express server
// Add middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // Parse incoming JSON data
// Add the routes
app.use(routes);
// Start the server
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});
