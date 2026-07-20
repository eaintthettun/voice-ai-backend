const authService = require('../services/authService');


const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const userData = { username, email, password };

        const result = await authService.registerUser(userData);
        const { password:removedPassword, ...userWithoutPassword } = result;

        res.status(201).json({ message: "User registered successfully", user: userWithoutPassword });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = { email, password };

        const result = await authService.loginUser(userData);
        const {token}=result;
        res.status(200).json({ message: "Login successful", token});
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = {
    register,
    login
};