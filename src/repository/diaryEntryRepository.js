import prisma from '../config/prisma.js';

const getDiaryEntries = async (userId) => {
    const diaryEntries = await prisma.diaryEntry.findMany({
        where: { userId },
    });
    return diaryEntries;
}

const createDiaryEntry = async (diaryData) => {
    return await prisma.diaryEntry.create({data:diaryData})
}

export default {
    getDiaryEntries
};