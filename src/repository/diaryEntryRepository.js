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

const editDiaryEntry = async (id,diaryData) => {
    return await prisma.diaryEntry.update(
        { 
            where: {id},
            data: diaryData
        }
    )
}

const getDiaryEntryDetail = async (id) => {
    return await prisma.diaryEntry.findFirst(
        { 
            where: {id},
        }
    )
}

const getDiaryEntriesByCategory = async ({ userId, category }) => {
    const diaryEntries = await prisma.diaryEntry.findMany({
        where: { userId, category },
        orderBy: {
            createdAt: 'desc'
        },
    });
    return diaryEntries;
}

const searchDiaryEntries = async ({ userId, searchKeyword }) => {
    const diaryEntries = await prisma.diaryEntry.findMany({
        where: {
            userId,
            OR: [
                { title: { contains: searchKeyword } },
                { transcript: { contains: searchKeyword } }
            ]
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return diaryEntries;
}

export default {
    getDiaryEntries,
    getRecentDiaryEntries,
    createDiaryEntry,
    deleteDiaryEntry,
    editDiaryEntry,
    getDiaryEntryDetail,
    getDiaryEntriesByCategory,
    searchDiaryEntries
};