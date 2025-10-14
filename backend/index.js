import dotenv from 'dotenv'
import express from 'express'
dotenv.config()
import { app } from './src/app.js'
import { connectDB } from './src/db/mongodnConnection.js'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import auth from './src/routes/auth.routes.js'
import Post from './src/routes/post.route.js'
import User from './src/routes/user.routes.js'
import Like from './src/routes/like.routes.js'

const PORT = process.env.PORT || 7000;

// Middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


// Connect to Database
connectDB();

// Routes
app.use('/api/auth', auth)
app.use('/api/post', Post)
app.use('/api/user', User)
app.use('/api/like', Like)


// Start server
app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
}).on('error', (err) => {
    console.error('Server error:', err);
});