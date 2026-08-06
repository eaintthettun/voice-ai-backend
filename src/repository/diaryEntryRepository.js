const prisma=require('../config/prisma.js');

const getDiaryEntries = async (userId) => {
    const diaryEntries = await prisma.diaryEntry.findMany({
        where: { userId },
    });
    return diaryEntries;
}

module.exports = {
    getDiaryEntries
};