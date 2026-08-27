import diaryEntryRepository from '../repository/diaryEntryRepository.js';

const getDiaryEntries = async (userId) => {
    if(!userId){
        throw new Error("User ID is required");
    }
    return await diaryEntryRepository.getDiaryEntries(userId);
};

const getRecentDiaryEntries = async (userId) => {
    if(!userId){
        throw new Error("User ID is required");
    }
    return await diaryEntryRepository.getRecentDiaryEntries(userId);
};

const createDiaryEntry = async (diaryData) => {
    if(!diaryData.userId){
        throw new Error("User ID is required");
    }

    if(!diaryData.title || !diaryData.transcript || !diaryData.category){
        throw new Error("Form fields are required")
    }

    return await diaryEntryRepository.createDiaryEntry(diaryData)
}

const deleteDiaryEntry = async (id) => {
    if(!id){
        throw new Error("ID is required")
    }

    return await diaryEntryRepository.deleteDiaryEntry(id)
}

export default {
    getDiaryEntries,
    getRecentDiaryEntries,
    createDiaryEntry,
    deleteDiaryEntry
};