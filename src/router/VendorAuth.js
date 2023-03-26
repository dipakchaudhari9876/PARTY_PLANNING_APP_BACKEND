const router = require('express').Router()
const bcrypt = require('bcrypt')
const Vendor = require('./../model/VendorSchema')

const pattern = {
    email: /^[a-z0-9\.]{1,}@[a-z]{1,}\.com$/g,
    phone: /^[0-9]{10}$/
}

router.post('/register', async (req, res) => {
    const { name, email, phone, password, Cpassword } = req.body
    if (!name || !email || !phone || !password || !Cpassword) {
        return res.status(401).json({ error: "Please fill all data" })
    }
    try {
        const validateEmail = await Vendor.findOne({ email })
        if (validateEmail) {
            return res.status(401).json({ error: "User Already Exist" })
        }

        const securePass = await bcrypt.hash(password, 12)
        const upload = new Vendor({
            name, email, phone, password: securePass, Cpassword: securePass
        })

        const saveData = await upload.save()
        if (saveData) {
            return res.status(201).send(saveData)
        }
    } catch (err) {
        return res.status(401).send({ error: "Invalid Credentials" })
    }
})

router.post('/login', async (req, res) => {
    const { data, password } = req.body
    let email = ""
    let phone = ""
    if ((pattern.email).test(data)) {
        email = data
    } else if ((pattern.phone).test(data)) {
        phone = data
    } else {
        return res.status(401).json({ error: "Invalid credentials" })
    }
    try {
        const Check = await Vendor.findOne(email ? { email } : { phone })
        if (!Check) {
            return res.status(401).json({ error: "User not registered" })
        }
        const verifyPass = await bcrypt.compare(password,Check.password)
        if(verifyPass){
            const {password,Cpassword,...data} = Check._doc 
            return res.status(201).send({data})
        }else{
            return res.status(401).json({error:"password/userId is incorrect"})
        }   
    } catch (err) {
        return res.status(401).json({error:"Invalid credentials why"})
    }
})

module.exports = router