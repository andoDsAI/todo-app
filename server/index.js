const express = require('express');
const mongoose = require('mongoose');
// De dung duoc file env
require('dotenv/config')

const authRouter = require("./routes/auth")
const postRouter = require("./routes/post")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log("MongoDB connected")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express()
// de app co the doc dc json
app.use(express.json())

app.get('/', (req,res) => {
    res.send("Hello world")
})

// get url of auth.js
app.use('/api/auth',authRouter)
// get url of book.js
app.use('/api/posts',postRouter)


// start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => 
    console.log("Server started on port", PORT)
)