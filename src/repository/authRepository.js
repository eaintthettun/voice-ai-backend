const prisma=require('../config/prisma.js');

const findUserByEmail = async (email) => {
    const user = await prisma.user.findUnique({
        where: { email },
    });
    return user;
}

const createUser = async (userData) => {
    const user = await prisma.user.create({
        data: userData,
    });
    return user;
}

module.exports = {
    findUserByEmail,
    createUser,
};