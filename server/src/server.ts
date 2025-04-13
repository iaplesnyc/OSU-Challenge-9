import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import routes from './routes/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the client/dist folder
app.use(express.static(path.join(__dirname, '../../../client/dist')));

// Use defined routes
app.use(routes);

// Wildcard route to serve index.html (if using history mode in frontend routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

// Start server
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
