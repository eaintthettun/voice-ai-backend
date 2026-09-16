import prisma from '../config/prisma.js';
import { getCurrentWeek } from '../utils/getCurrentWeek.js';
import { ObjectId } from "mongodb";

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
    return await prisma.diaryEntry.create({ data: diaryData })
}

const deleteDiaryEntry = async (id) => {
    return await prisma.diaryEntry.delete({ where: { id } })
}

const editDiaryEntry = async (id, diaryData) => {
    return await prisma.diaryEntry.update(
        {
            where: { id },
            data: diaryData
        }
    )
}

const getDiaryEntryDetail = async (id) => {
    return await prisma.diaryEntry.findFirst(
        {
            where: { id },
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

const searchDiaryEntries = async ({ userId, keyword }) => {
    const diaryEntries = await prisma.diaryEntry.findMany({
        where: {
            userId,
            OR: [
                { title: { contains: keyword, mode: "insensitive" } },
                { transcript: { contains: keyword, mode: "insensitive" } }
            ]
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return diaryEntries;
}

const getFavoriteDiaryEntries = async (userId) => {
    const favoriteDiaryEntries = await prisma.diaryEntry.findMany({
        where: {
            userId,
            isFavorite: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    return favoriteDiaryEntries;
};

const toggleFavoriteDiaryEntry = async (id) => {
    const diaryEntry = await prisma.diaryEntry.findUnique({
        where: { id },
    });

    if (!diaryEntry) {
        throw new Error("Diary entry not found");
    }

    return await prisma.diaryEntry.update({
        where: { id },
        data: {
            isFavorite: !diaryEntry.isFavorite
        }
    });
};

const getCurrentWeekTrend = async (userId) => {
    const { monday, nextMonday } = getCurrentWeek();

    //this pipeline will return the count of diary entries created each day of the current week for the given userId
    const result = await prisma.diaryEntry.aggregateRaw({
        pipeline: [
            {
                $match: {
                    userId: {
                        $oid: userId
                    },
                    createdAt: {
                        $gte: { $date: monday },
                        $lt: { $date: nextMonday }
                    }
                }
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt",
                            timezone: "+06:30"
                        }
                    },
                    count: {
                        $sum: 1
                    }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }
        ]
    });

    console.log("Current week trend:", result);

    // Current week trend: [
    //     { _id: '2026-09-14', count: 5 },
    //     { _id: '2026-09-15', count: 2 },
    //     { _id: '2026-09-16', count: 1 }
    // ]

    // Create all 7 days with count = 0
    // to handle the case when there is no diary created on a particular day,
    //  we will create an array of 7 days with count = 0 
    // and then we will update the count for the days which have diary entries
    const weeklyData = [];

    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);

        const dateString = date.toLocaleDateString("en-CA", {
            timeZone: "Asia/Rangoon"
        });

        const existingDay = result.find(
            (item) => item._id === dateString
        );

        weeklyData.push({
            date: dateString,
            count: existingDay ? existingDay.count : 0
        });
    }

    return weeklyData;
};

//this pipeline shows all the entries and entries of each category within a week
const getCurrentWeekSummary = async (userId) => {
    const {monday,nextMonday}=getCurrentWeek();
    const weeklyData = await prisma.diaryEntry.aggregateRaw({
        pipeline: [
            {
                $match:
                {
                    userId: {$oid:userId},
                    createdAt: {
                        $gte: {$date:monday},
                        $lt: {$date:nextMonday}
                    }
                }
            },
            {
                $group: {
                    _id: null, //to put all in one object, we use _id=null
                    total: {
                        $sum: 1
                    },
                    learning: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: ["$category", "LEARNING"]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    meeting: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: ["$category", "MEETING"]
                                },
                                1,
                                0
                            ]
                        }
                    },
                    tasks: {
                        $sum: {
                            $cond: [
                                {
                                    $eq: ["$category", "TASKS"]
                                },
                                1,
                                0
                            ]
                        }
                    }
                }
            }
        ]
    });
    //result={_id,total,learning,meeting,tasks}
    return weeklyData;
}

export default {
    getDiaryEntries,
    getRecentDiaryEntries,
    createDiaryEntry,
    deleteDiaryEntry,
    editDiaryEntry,
    getDiaryEntryDetail,
    getDiaryEntriesByCategory,
    searchDiaryEntries,
    getFavoriteDiaryEntries,
    toggleFavoriteDiaryEntry,
    getCurrentWeekTrend,
    getCurrentWeekSummary
};