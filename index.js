const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080
const userRouter = require('./src/router/Userauth')
const vendorRouter = require('./src/router/VendorAuth')
require('./src/db/conn')

app.use(express.json())

app.use("/api/user",userRouter)
app.use("/api/vendor",vendorRouter)
app.listen(PORT,()=>{
    console.log(`App is running on PORT ${PORT}`)
})