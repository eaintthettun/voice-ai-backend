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

const findDiaryEntriesByDateRange = async ({
    userId,
    startDate,
    endDate
}) => {

    // myanmar date + utc 6:30
    const start = new Date(`${startDate}T00:00:00+06:30`);

    const end = new Date(`${endDate}T00:00:00+06:30`);
    end.setUTCDate(end.getUTCDate() + 1);

    const diaryEntries = await prisma.diaryEntry.findMany({
        where: {
            userId,
            createdAt: {
                gte: start,
                lt: end
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return diaryEntries;
};

export default {
    getDiaryEntries,
    getRecentDiaryEntries,
    createDiaryEntry,
    deleteDiaryEntry,
    editDiaryEntry,
    getDiaryEntryDetail,
    getDiaryEntriesByCategory,
    searchDiaryEntries,
    findDiaryEntriesByDateRange
};