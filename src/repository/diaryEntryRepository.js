const prisma=require('../config/prisma.js');

const getByUserId = async (userId) => {
    const diaryEntries = await prisma.diaryEntry.findMany({
        where: { user_id:userId },
    });
    return diaryEntries;
}

module.exports = {
    getByUserId
};