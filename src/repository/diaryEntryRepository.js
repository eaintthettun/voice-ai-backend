import prisma from '../config/prisma.js';

const getDiaryEntries = async (userId) => {
    const diaryEntries = await prisma.diaryEntry.findMany({
        where: { userId },
        orderBy: {
            createdAt: 'desc'
        },
    });
    return diaryEntries;
}

const getRecentDiaryEntries = async (userId) => {
    const diaryEntries = await prisma.diaryEntry.findMany({
        where: { userId },
        orderBy: {
            createdAt: 'desc'
        },
        take: 5
    });
    return diaryEntries;
}

const createDiaryEntry = async (diaryData) => {
    return await prisma.diaryEntry.create({data:diaryData})
}

const deleteDiaryEntry = async (id) => {
    return await prisma.diaryEntry.delete({ where: {id} })
}

export default {
    getDiaryEntries,
    getRecentDiaryEntries,
    createDiaryEntry,
    deleteDiaryEntry
};