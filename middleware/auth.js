const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
    // Get token from header
    const token = req.header("x-auth-token");

    // Check if not token
    if (!token) {
        return res.status(401).json({msg: "No token, authorization denied"});
    }

    try {
        // Use environment variable if available, otherwise fall back to config
        const jwtSecret = process.env.JWT_SECRET || config.get("jwtSecret");
        const decoded = jwt.verify(token, jwtSecret);

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({msg: "Token is not valid"});
    }
}
