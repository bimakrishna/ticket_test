require('dotenv').config();

const express = require('express')
const app = express()
const port = process.env.PORT
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.get("/", (req, res) => res.status(200).json({
    msg: "halo dunia"
}))
app.use(router)
app.use(errorHandler)

app.listen(port, ()=> {
    console.log(`app running at http://localhost:${port}`)
})