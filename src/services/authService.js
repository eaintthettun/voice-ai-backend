const authRepository = require('../repository/authRepository');
const bcrypt = require('bcrypt');

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

module.exports = {
    registerUser,
};
