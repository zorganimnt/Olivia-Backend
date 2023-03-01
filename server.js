import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import appRoutes from './routes/index.js';
import db from './utils/config/db.js';
import { errorHandler } from './middleware/error.js';

// Load environment variables from the .env file
dotenv.config();

//database using mongoose
db();

// Create an Express application
const app = express();

// Enable middlewares
// Parse incoming request bodies as JSON
app.use(express.json());
// Parse incoming cookies
app.use(cookieParser());
// Parse incoming request bodies as URL-encoded data
app.use(express.urlencoded({ extended: true }));
// Enable Cross-Origin Resource Sharing (CORS)
app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
    credentials: true,
  })
);

// Use Morgan for HTTP request logging in development mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//routes
app.use('/api', appRoutes);

//custom middlewares
app.use(errorHandler);

// const __dirname = path.resolve();

// Set the port for the Express app to listen on
const PORT = process.env.PORT || 5000;

// Start the Express app
app.listen(PORT, () =>
  console.log(
    `🟢 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
