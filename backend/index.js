import dotenv from 'dotenv'
import express from 'express'
dotenv.config()
import { app } from './src/app.js'
import { connectDB } from './src/db/mongodnConnection.js'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'

import auth from './src/routes/auth.routes.js'
import Post from './src/routes/post.route.js'

const PORT = process.env.PORT || 7000;

// Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

// Connect to Database
connectDB();

// Routes
app.use('/api/auth', auth)
app.use('/api/post', Post)


// Start server
app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
}).on('error', (err) => {
    console.error('Server error:', err);
});