const User = require('../Models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET = (process.env.JWT_SECRET || "This_is_the_secret@auth_key");

//1. route for creating the ministry users : POST => api/auth/registerMroot (do not require login!!)

exports.registeruser = async (req, res) => {

    try {
        let usertocreate = req.body.usertocreate;
        console.log(req.user.id)
        let user = await User.findById(req.user.id)
        

        //registering ministry head
        //checking if reqesting user is admin or not.
        if (user?.userType != "rootAdmin") {
            return res.status(401).json({ error: "unauthorized user" })
        }

        if (await User.findOne({ email: req.body.usertocreate.email })) {
            return res.status(400).json({ error: "User already exists" })
        }

        let password = usertocreate.password;
        let salt = await bcrypt.genSalt(10);
        let secpassword = await bcrypt.hash(password, salt);

        usertocreate.password = secpassword;
        usertocreate.userType = "Ministry"

        let created = await User.create(usertocreate)

        console.log("user created")
        return res.status(200).json({ success: "user created", created })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal error" })
    }
}


//2. route for login of any three users POST : api/auth/login (do not require login!!)
exports.login = async (req, res) => {
    try {

        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            console.log("no user")
            return res.status(401).json({ error: "Invalid Credentials" })
        }

        if (user.isblocked) {
            return res.status(401).json({ error: "You are blocked" })
        }

        let vaildpass = await bcrypt.compare(req.body.password, user.password)

        console.log(await vaildpass)

        if (!vaildpass) {
            console.log("invalid pass")
            return res.status(401).json({ error: "Invalid Credentials" })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(payload, JWT_SECRET);
        console.log("logged in")
        return res.status(200).json({ success: "logged in", authtoken })


    } catch (error) {
        console.log(error)

        return res.status(500).json({ error: "Internal error" })
    }
}

exports.deleteuser = async (req, res) => {

    try {
        let user = await User.findById(req.user.id)

        if (!user) {
            return res.status(401).json({ error: "unauthorized" })
        }

        User.findByIdAndDelete(req.user.id)

        console.log("user Deleted")
        return res.status(200).json({ success: "user Deleted" })


    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal error" })
    }
}