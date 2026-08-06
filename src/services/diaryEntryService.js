const diaryEntryRepo=require('../repository/diaryEntryRepository.js');

const getDiaryEntries = async (userId) => {
    if(!userId){
        throw new Error("User ID is required");
    }
    return await diaryEntryRepo.getDiaryEntries(userId);
};

module.exports = {
    getDiaryEntries
};