const authRepository = require('../repository/authRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (userData) => {
    const { username, email, password } = userData;

    if (!email || !password || !username) {
        throw new Error("All fields are required");
    }

    // Check if user already exists
    const existingUser = await authRepository.findUserByEmail(email);
    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await authRepository.createUser({ username, email, password: hashedPassword });

    return result;
};

const loginUser = async (userData) => {
    const { email, password } = userData;
    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const user = await authRepository.findUserByEmail(email);
    if (!user) {
        throw new Error("User is not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Incorrect password");
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    return {user, token};
};

module.exports = {
    registerUser,
    loginUser
};
