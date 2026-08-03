const diaryEntryRepo=require('../repositories/diaryEntryRepository.js');

const getDiaryEntriesByUserID = async (userId) => {
    if(!userId){
        throw new Error("User ID is required");
    }
    return await diaryEntryRepo.getByUserId(userId);
};

module.exports = {
    getDiaryEntriesByUserID
};