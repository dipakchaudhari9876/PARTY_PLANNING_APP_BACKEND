const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const userRouter = require('./src/router/Userauth')
require('./src/db/conn')

app.use(express.json())

app.use("/api/user",userRouter)

app.listen(PORT,()=>{
    console.log(`App is running on PORT ${PORT}`)
})