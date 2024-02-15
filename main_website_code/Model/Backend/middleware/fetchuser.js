const jwt = require('jsonwebtoken')
const JWT_SECRET = (process.env.JWT_SECRET || "This_is_the_secret@auth_key");

const fetchuser = async(req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.send(401).json({ error: "Unauthorized" })
    }
    try {
        const data = await jwt.verify(token, JWT_SECRET);
        req.user = await data.user;
        next();
    } catch (error) {
        res.status(401).send("Please authenticate using a valid token");
    }
}

module.exports = fetchuser

