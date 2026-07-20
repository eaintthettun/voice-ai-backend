//authentication middleware
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        //returns the decoded payload if the token is valid, otherwise throws an error
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedPayload;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = authMiddleware;