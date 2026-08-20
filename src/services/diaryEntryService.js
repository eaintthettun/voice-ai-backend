import diaryEntryRepository from '../repository/diaryEntryRepository.js';

const getDiaryEntries = async (userId) => {
    if(!userId){
        throw new Error("User ID is required");
    }
    return await diaryEntryRepository.getDiaryEntries(userId);
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

export default {
    getDiaryEntries,
    createDiaryEntry
};